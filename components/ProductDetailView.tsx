"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchPartBySlug } from '@/lib/redux/productSlice';
import { addToCart, toggleWishlist } from '@/lib/redux/cartSlice';
import { fetchReviewsForProduct } from '@/lib/redux/reviewSlice';
import { Heart, ShoppingCart, Plus, Minus, CheckCircle, Loader2, Star, ChevronDown, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const AccordionItem = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-slate-100 last:border-0">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-4 group">
                <span className="font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors">{title}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'group-hover:text-blue-600'}`} />
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="pb-5 text-slate-600 space-y-3 leading-relaxed text-sm">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default function ProductDetailPage() {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const { user } = useSelector((state: RootState) => state.auth);
    const { currentPart: part, status: productStatus } = useSelector((state: RootState) => state.products);
    const { wishlist } = useSelector((state: RootState) => state.cart);
    const { productReviews, status: reviewStatus } = useSelector((state: RootState) => state.reviews);
    
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [zoomStyle, setZoomStyle] = useState({});
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const isInWishlist = user ? wishlist.some((item: any) => item._id === part?._id) : false;

    const faqs = [
        {
            question: "Is this part compatible with my vehicle?",
            answer: "Please check the 'Specifications & Details' section above for specific model compatibility. We recommend verifying with your vehicle's manual or contacting our support team with your VIN number if you are unsure."
        },
        {
            question: "What is the shipping time?",
            answer: "Standard shipping typically takes 2-15 weeks depending on your location and stock availability. Custom-made parts may require additional production time."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship worldwide. Please note that customs duties and import taxes are the responsibility of the buyer."
        },
        {
            question: "What is the return policy for this item?",
            answer: "Refunds are accepted within 48 hours of payment. If the part is defective, an exchange can be requested. Custom-made items are generally non-returnable unless there is a manufacturing defect."
        },
        {
            question: "Is professional installation required?",
            answer: "We highly recommend professional installation for all our parts to ensure safety and optimal performance. Improper installation may void the warranty."
        }
    ];

    useEffect(() => {
        if (slug) { dispatch(fetchPartBySlug(slug)); }
    }, [dispatch, slug]);

    useEffect(() => {
        if (part?._id) {
            dispatch(fetchReviewsForProduct(part._id));
        }

        const processImages = async () => {
            if (part?.images && part.images.length > 0) {
                const processedUrls = await Promise.all(part.images.map(async (img: string) => {
                    if (img.includes('/api/v1/zoho/image/')) {
                        try {
                            const response = await fetch(img);
                            if (!response.ok) return '/images/placeholder.png';
                            const blob = await response.blob();
                            return URL.createObjectURL(blob);
                        } catch (error) {
                            console.error("Failed to fetch proxied image:", error);
                            return '/images/placeholder.png';
                        }
                    }
                    return img;
                }));
                setImageUrls(processedUrls);
                if (processedUrls.length > 0) {
                    setActiveImage(processedUrls[0]);
                }
            }
        };

        processImages();
        
        return () => {
            imageUrls.forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [dispatch, part]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomStyle({ transformOrigin: `${x}% ${y}%` });
    };

    const handleAddToCart = async () => {
        if (!user) {
            toast.error('Please log in to add items to your cart.');
            router.push('/login');
            return;
        }
        if (!part) return;
        
        const result = await dispatch(addToCart({ partId: part._id, quantity }));
        if (addToCart.fulfilled.match(result)) {
            toast.success('Added to cart!');
        } else {
            toast.error(result.payload as string || 'Failed to add to cart.');
        }
    };

    const handleToggleWishlist = async () => {
        if (!user) {
            toast.error('Please log in to manage your wishlist.');
            router.push('/login');
            return;
        }
        if (!part) return;

        const result = await dispatch(toggleWishlist(part._id));
        if (toggleWishlist.fulfilled.match(result)) {
            toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
        } else {
            toast.error(result.payload as string || 'Failed to update wishlist.');
        }
    };
    
    const averageRating = productReviews.length > 0 ? (productReviews.reduce((acc: number, review: any) => acc + review.rating, 0) / productReviews.length) : 0;
    
    const descriptionContent = typeof part?.description === 'string' 
        ? part.description 
        : part?.description?.fullDescription;

    const highlights = (typeof part?.description === 'object' && part.description.highlights) || [];
    const specifications = (typeof part?.description === 'object' && part.description.specifications) || [];

    if (productStatus === 'loading' || !part) {
        return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="w-10 h-10 animate-spin text-slate-400"/></div>;
    }

    return (
        <main className="bg-white lg:mt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    
                    {/* Image Section - Sticky only on large screens to prevent overlap on mobile */}
                    <div className="h-fit lg:sticky lg:top-24">
                        <div className="relative group w-full mb-4">
                            <div 
                                className="aspect-square w-full bg-white rounded-2xl overflow-hidden cursor-zoom-in border border-slate-200 shadow-sm"
                                onMouseMove={handleMouseMove}
                            >
                                {activeImage && (
                                    <Image 
                                        src={activeImage} 
                                        alt={part.name} 
                                        fill 
                                        sizes="(max-width: 1024px) 90vw, 45vw" 
                                        className="w-full h-full object-contain p-2 transition-transform duration-300"
                                        priority
                                    />
                                )}
                            </div>
                            <div className="hidden lg:block absolute top-0 left-full ml-4 w-[450px] h-[450px] bg-white border border-slate-200 rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-xl">
                                {activeImage && <Image src={activeImage} alt={`${part.name} zoomed`} fill sizes="80vw" className="object-contain transform scale-[2]" style={zoomStyle} />}
                            </div>
                        </div>
                        
                        <div 
                            className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                             {(imageUrls ?? []).map((img: string, index: number) => (
                                <button 
                                    key={index} 
                                    onClick={() => setActiveImage(img)} 
                                    className={`relative flex-shrink-0 w-20 h-20 bg-white rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImage === img ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-100 hover:border-slate-300'}`}
                                >
                                    <Image src={img} alt={`${part.name} thumb ${index + 1}`} fill className="object-cover p-1"/>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="flex flex-col pt-2 lg:pt-0">
                        <nav className="flex flex-wrap items-center text-xs font-bold uppercase tracking-wider mb-3 text-slate-500 gap-y-1">
                            <Link href="/shop" className="hover:text-slate-900 transition-colors">Shop</Link> 
                            <span className="mx-2 text-slate-300">/</span> 
                            <span className="text-blue-600">{part.category?.name}</span>
                        </nav>
                        
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-3 tracking-tight break-words">
                            {part.name}
                        </h1>
                        
                        <div className="flex items-center gap-4 mb-6">
                            {productReviews.length > 0 && (
                                <div className="flex items-center gap-1">
                                    <div className="flex text-amber-500">
                                        {[...Array(5)].map((_, i) => (<Star key={i} size={16} className={i < Math.round(averageRating) ? 'fill-current' : 'text-slate-200'}/>))}
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 ml-1">({productReviews.length} reviews)</span>
                                </div>
                            )}
                             {part.stockQuantity > 0 ? (
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">
                                    <CheckCircle className="w-3.5 h-3.5"/> In Stock
                                </span>
                            ) : (
                                <span className="inline-flex items-center text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        <div className="flex items-baseline gap-3 pb-8 border-b border-slate-100">
                            <span className="text-3xl font-bold text-slate-900">${part.price?.toLocaleString('en-US')}</span>
                            {part.discount > 0 && part.mrp && (
                                <>
                                    <span className="text-lg text-slate-400 line-through decoration-slate-300">${part.mrp?.toLocaleString('en-US')}</span>
                                    <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">{part.discount}% OFF</span>
                                </>
                            )}
                        </div>
                        
                        <div className="py-6 space-y-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center border border-slate-200 rounded-full h-12 w-fit">
                                    <button 
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                                        className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center font-semibold text-slate-900">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(q => Math.min(part.stockQuantity, q + 1))} 
                                        className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                
                                <div className="flex flex-1 gap-3">
                                    <button 
                                        onClick={handleAddToCart} 
                                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-bold text-sm h-12 px-6 rounded-full hover:bg-slate-800 shadow-md shadow-slate-900/10 transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed" 
                                        disabled={part.stockQuantity === 0}
                                    >
                                        <ShoppingCart className="w-4 h-4" /> 
                                        {part.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                    
                                    <button 
                                        onClick={handleToggleWishlist} 
                                        className={`h-12 w-12 flex items-center justify-center border rounded-full transition-all ${isInWishlist ? 'bg-red-50 border-red-200 text-red-500' : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600 bg-white'}`}
                                    >
                                        <Heart className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-2">
                           <AccordionItem title="Product Description" defaultOpen={true}>
                               <div className="prose prose-slate prose-sm max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: descriptionContent || '' }}></div>
                               {highlights.length > 0 && (
                                   <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                       <h4 className="font-bold text-slate-800 mb-2.5 text-xs uppercase tracking-wide">Highlights</h4>
                                       <ul className="space-y-2">
                                           {highlights.map((h: string, i: number) => (
                                               <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                                                   <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                   <span>{h}</span>
                                               </li>
                                           ))}
                                       </ul>
                                   </div>
                               )}
                           </AccordionItem>
                           <AccordionItem title="Specifications & Details">
                               <div className="space-y-6">
                                    {specifications.length > 0 && (
                                        <div>
                                            <h4 className='font-bold text-slate-900 mb-3 text-xs uppercase tracking-wide'>Technical Specs</h4>
                                            <div className="border border-slate-100 rounded-lg overflow-hidden">
                                                <table className='w-full text-sm text-left'>
                                                    <tbody>
                                                        {specifications.map((s: {key: string; value: string}, i: number) => (
                                                            <tr key={i} className='border-b border-slate-100 last:border-0'>
                                                                <td className='py-2.5 px-4 font-medium text-slate-500 bg-slate-50/50 w-1/3'>{s.key}</td>
                                                                <td className='py-2.5 px-4 font-semibold text-slate-800'>{s.value}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <h4 className='font-bold text-slate-900 mb-3 text-xs uppercase tracking-wide'>General Info</h4>
                                        <div className="border border-slate-100 rounded-lg overflow-hidden">
                                            <table className='w-full text-sm text-left'>
                                                <tbody>
                                                    <tr className='border-b border-slate-100'><td className='py-2.5 px-4 font-medium text-slate-500 bg-slate-50/50 w-1/3'>Brand</td><td className='py-2.5 px-4 font-semibold text-slate-800'>{part.brand?.name}</td></tr>
                                                    <tr className='border-b border-slate-100'><td className='py-2.5 px-4 font-medium text-slate-500 bg-slate-50/50'>Model</td><td className='py-2.5 px-4 font-semibold text-slate-800'>{part.model?.name} ({part.model?.year})</td></tr>
                                                    <tr className='border-b border-slate-100'><td className='py-2.5 px-4 font-medium text-slate-500 bg-slate-50/50'>Category</td><td className='py-2.5 px-4 font-semibold text-slate-800'>{part.category?.name}</td></tr>
                                                    <tr><td className='py-2.5 px-4 font-medium text-slate-500 bg-slate-50/50'>SKU</td><td className='py-2.5 px-4 font-semibold text-slate-800'>{part.sku}</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                               </div>
                           </AccordionItem>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="py-12 lg:py-4 bg-white border-t border-slate-100">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-slate-500 mt-1 text-sm">Common questions regarding this product.</p>
                    </div>
                    
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-slate-100 last:border-0">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)} 
                                    className="w-full flex justify-between items-center text-left p-5 hover:bg-slate-50 transition-colors group"
                                >
                                    <span className={`font-semibold text-sm sm:text-base transition-colors ${openFaq === index ? 'text-blue-600' : 'text-slate-800 group-hover:text-slate-900'}`}>{faq.question}</span>
                                    <div className={`flex-shrink-0 ml-4 transform transition-transform duration-300 ${openFaq === index ? 'rotate-45 text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                        <Plus className="w-5 h-5" />
                                    </div>
                                </button>
                                <div className={`grid transition-all duration-300 ease-in-out bg-slate-50/50 ${openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                    <div className="overflow-hidden">
                                        <p className="px-5 pb-5 text-slate-600 leading-relaxed text-sm border-t border-dashed border-slate-200 pt-4 mt-0">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>

            <div className="bg-slate-50 py-16 border-t border-slate-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Customer Reviews</h2>
                            <p className="text-slate-500 text-sm mt-1">Feedback from verified purchases</p>
                        </div>
                        
                        {productReviews.length > 0 && (
                             <div className="flex items-center gap-3 mt-4 sm:mt-0 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                                <div className="flex text-amber-500">
                                    {[...Array(5)].map((_, i) => (<Star key={i} size={18} className={i < Math.round(averageRating) ? 'fill-current' : 'text-slate-200'}/>))}
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="font-bold text-xl text-slate-900">{averageRating.toFixed(1)}</span>
                                </div>
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide border-l border-slate-200 pl-3 ml-1">{productReviews.length} Reviews</span>
                            </div>
                        )}
                    </div>

                    {reviewStatus === 'loading' ? (
                        <div className="flex justify-center py-12"><Loader2 className='w-8 h-8 animate-spin text-slate-400'/></div>
                    ) : productReviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {productReviews.map((review: any) => (
                                <div key={review._id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 bg-slate-100">
                                                <Image src={review.user.avatar || '/images/avatars/default.png'} alt={review.user.fullName} fill sizes="40px" className="object-cover"/>
                                            </div>
                                            <div>
                                                 <p className="font-bold text-slate-900 text-sm">{review.user.fullName}</p>
                                                 <span className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                            </div>
                                        </div>
                                        <div className="flex text-amber-500">
                                            {[...Array(5)].map((_, i) => (<Star key={i} size={12} className={i < review.rating ? 'fill-current' : 'text-slate-200'}/>))}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">"{review.reviewText}"</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center bg-white p-12 rounded-xl border border-dashed border-slate-300">
                             <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                <MessageSquare className="w-6 h-6 text-slate-400" />
                             </div>
                            <h3 className="font-bold text-slate-900">No reviews yet</h3>
                            <p className="text-slate-500 text-sm mt-1">Be the first to share your experience.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}