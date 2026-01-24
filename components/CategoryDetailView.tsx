"use client"
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchPartsForCategory, fetchCategoryBySlug, clearCurrentCategory, clearCategoryParts } from '@/lib/redux/productSlice';
import { Plus, Search, ArrowRight, ChevronDown } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import InstagramFeedSection from '@/components/InstagramFeedSection';
import CategoryHeader from '@/components/CategoryHeader';

interface Part {
    _id: string;
    slug: string;
    name: string;
    price: number;
    images: string[];
    description?: string | { fullDescription?: string };
}

interface ProductCardProps {
    part: Part;
}

interface FilterType {
    category: string;
    brand?: string;
    model?: string;
}

interface FaqItem {
    question: string;
    answer: string;
}


function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => { func(...args); }, delay);
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ part }) => {
    const descriptionText = (typeof part.description === 'string'
        ? part.description
        : part.description?.fullDescription) || '';

    return (
        <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-transparent transition-all duration-300 ease-in-out hover:shadow-lg hover:border-slate-200/80 h-full">
            <Link href={`/product/${part.slug}`} className="block p-2">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-100">
                    <Image
                        src={part.images[0]}
                        alt={part.name}
                        fill
                        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 20vw"
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                </div>
            </Link>
            <div className="px-3 pb-3 flex flex-col flex-grow">
                <h4 className="font-semibold text-slate-800 text-sm leading-tight" title={part.name}>
                    <Link href={`/product/${part.slug}`} className="hover:text-amber-600 transition-colors line-clamp-2">
                        {part.name}
                    </Link>
                </h4>
                {descriptionText && (
                    <div
                        className="mt-1 text-xs text-slate-500 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: descriptionText }}
                    />
                )}
                <div className="mt-auto pt-2 flex justify-between items-center">
                    <p className="text-slate-900 font-bold text-md">
                        ${part.price.toLocaleString('en-IN')}
                    </p>
                    <Link href={`/product/${part.slug}`} className="flex items-center justify-center h-8 w-8 bg-slate-100 text-slate-600 rounded-full transition-all duration-300 ease-in-out group-hover:bg-slate-900 group-hover:text-white">
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function DynamicCategoryPage() {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();

    const slugParam = params?.slug;
    const categorySlug = (Array.isArray(slugParam) ? slugParam[0] : slugParam) || '';

    const [showFaqSection, setShowFaqSection] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const { categoryParts, currentCategory, categoryPageStatus } = useSelector((state: RootState) => state.products);

    const [filters, setFilters] = useState({ brand: '', model: '' });

    const debouncedFetch = useCallback(debounce((appliedFilters: FilterType) => { dispatch(fetchPartsForCategory(appliedFilters)); }, 300), [dispatch]);

    useEffect(() => {
        dispatch(clearCategoryParts());
        if (categorySlug) {
            dispatch(fetchCategoryBySlug(categorySlug));
        }
        return () => {
            dispatch(clearCurrentCategory());
        }
    }, [dispatch, categorySlug]);

    useEffect(() => {
        if (currentCategory?._id) {
            const appliedFilters: FilterType = { category: currentCategory._id, ...filters };
            debouncedFetch(appliedFilters);
        }
    }, [currentCategory, filters, debouncedFetch, dispatch]);

    useEffect(() => {
        if (categoryPageStatus === 'failed' && !currentCategory) {
            const timer = setTimeout(() => {
                notFound();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [categoryPageStatus, currentCategory]);

    const faqs: FaqItem[] = [
        {
            question: "What does Own Silent International Limited specialize in?",
            answer: "We specialize in high-performance automotive parts and customizations, including carbon fiber components, carbon-ceramic brakes, forged & carbon wheels, luxury VIP interiors, exterior conversion kits, electronic retrofits, ECU tuning, and more. We are both a manufacturer and a trading company serving clients worldwide."
        },
        {
            question: "Where is your company located?",
            answer: "Our office is based in Hong Kong: Own Silent International Limited, 2/F, Tower 1, Tern Centre, 237 Queen’s Road Central, Sheung Wan, Hong Kong"
        },
        {
            question: "Do you ship worldwide?",
            answer: "Yes, we ship worldwide. Custom clearance and import duties are the responsibility of the buyer. Shipping insurance can be arranged upon request for large or high-value orders."
        },
        {
            question: "Are your products compatible with my vehicle?",
            answer: "Please verify the compatibility of each part before purchasing. Product specifications and supported models are provided on the product pages. Our team can assist with compatibility inquiries if needed."
        },
        {
            question: "Are your products OEM?",
            answer: "Most of our products are aftermarket or custom-made, and while some replicate OEM designs for fit and aesthetics, they are not original manufacturer parts."
        },
        {
            question: "Can I customize a product to my specifications?",
            answer: "Yes, we offer bespoke solutions for many categories including interiors, wheels, carbon fiber parts, and electronics retrofits. Customization may affect lead times."
        },
        {
            question: "How long will it take for my order to arrive?",
            answer: "Lead times vary depending on the product and customization level. Standard delivery ranges from 2 to 15 weeks. High-demand or custom orders may take longer."
        },
        {
            question: "Who handles shipping?",
            answer: "We work with reliable shipping partners worldwide. While we ensure safe dispatch, Own Silent is not responsible for theft or damage during transit."
        },
        {
            question: "Are customs and import duties included?",
            answer: "No, custom clearance and import charges are the responsibility of the buyer."
        },
        {
            question: "What is your return policy?",
            answer: "Refunds are accepted within 48 hours of payment. After funds are transferred to our manufacturing partners, they are non-refundable. If a part is defective or not installed properly, customers can request an exchange. Shipping costs for returns/exchanges are paid by the customer."
        },
        {
            question: "Can I return custom-made products?",
            answer: "Most products are made-to-order or customized, so returns are generally not accepted. Dealers must arrange their own shipping and warehouse logistics."
        },
        {
            question: "What if my product is damaged during shipping?",
            answer: "Record a high-quality unboxing and installation video and send it to us. If the product is verified as damaged, we will replace it. Insurance can be arranged for high-value shipments."
        },
        {
            question: "Do your products come with a warranty?",
            answer: "Yes, all products are covered for manufacturer defects. Warranty terms may vary by category. Please check the product page or contact support for details."
        },
        {
            question: "Do you provide installation support?",
            answer: "Yes, for most products we provide technical guidance, instructions, and remote support. Dealers and end-users can contact our team for assistance."
        },
        {
            question: "Do you offer ECU tuning and remote coding?",
            answer: "Yes, we provide professional remote ECU coding worldwide while ensuring compatibility with your vehicle."
        },
        {
            question: "Can I become a dealer?",
            answer: "Yes! Own Silent International Limited partners with dealers and distributors worldwide. Visit our “Become a Dealer” page to apply and learn about benefits."
        },
        {
            question: "Do you provide bulk or wholesale orders?",
            answer: "Yes, we cater to both bulk and wholesale orders. Lead times, shipping, and customization details can be discussed directly with our sales team."
        }
    ];

    return (
        <main className="bg-white text-slate-800 mt-16">
            <CategoryHeader slug={categorySlug} categoryName={currentCategory?.name || ''} />

            <section id="collection" className="py-12 bg-slate-50 scroll-mt-16 border-t border-slate-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Find Your Perfect {currentCategory?.name}</h2>
                        <p className="text-slate-500 mt-2">Select your vehicle to discover parts designed for maximum performance and compatibility.</p>
                    </div>

                    {categoryPageStatus === 'loading' ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-xl border border-slate-200/70 animate-pulse">
                                    <div className="p-2"><div className="aspect-square bg-slate-200 rounded-lg"></div></div>
                                    <div className="px-3 pb-3"><div className="h-4 w-full bg-slate-200 rounded mb-2"></div><div className="h-3 w-full bg-slate-200 rounded mb-1"></div><div className="h-3 w-3/4 bg-slate-200 rounded mb-2"></div><div className="h-6 w-1/3 bg-slate-200 rounded"></div></div>
                                </div>
                            ))}
                        </div>
                    ) : categoryParts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{categoryParts.map((part: Part) => <ProductCard key={part._id} part={part} />)}</div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80">
                            <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-800">No Matching Products</h3>
                            <p className="text-slate-500 mt-2">Your selection did not match any products in this category. Please try a different filter.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-8 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                        <button
                            onClick={() => setShowFaqSection(!showFaqSection)}
                            className="w-full flex items-center justify-between p-6 sm:p-8 bg-white hover:bg-slate-50 transition-colors duration-300"
                        >
                            <div className="text-left">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Your Questions, Answered</h2>
                                <p className="text-sm text-slate-500 mt-1">Frequently asked questions about our products and services</p>
                            </div>
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center transition-all duration-300 ${showFaqSection ? 'bg-slate-900 text-white rotate-180' : 'text-slate-600'}`}>
                                <ChevronDown className="w-5 h-5" />
                            </div>
                        </button>

                        <div className={`grid transition-all duration-500 ease-in-out border-t border-slate-100 ${showFaqSection ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 border-t-0'}`}>
                            <div className="overflow-hidden bg-slate-50/50">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border-b border-slate-200/80 last:border-0">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                            className="w-full flex justify-between items-center text-left p-6 group hover:bg-white transition-colors duration-200"
                                        >
                                            <span className={`font-semibold text-base sm:text-lg pr-4 transition-colors ${openFaq === index ? 'text-amber-600' : 'text-slate-800 group-hover:text-slate-900'}`}>
                                                {faq.question}
                                            </span>
                                            <div className={`flex-shrink-0 transform transition-transform duration-300 ${openFaq === index ? 'rotate-45 text-amber-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                                <Plus className="w-6 h-6" />
                                            </div>
                                        </button>
                                        <div className={`grid transition-all duration-300 ease-in-out bg-white ${openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                            <div className="overflow-hidden">
                                                <p className="px-6 pb-6 text-slate-600 leading-relaxed text-sm sm:text-base border-t border-dashed border-slate-100 pt-4 mt-0">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <InstagramFeedSection />
        </main>
    );
}