"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPartsForCategory,
  fetchCategoryBySlug,
  clearCurrentCategory,
  clearCategoryParts,
} from "@/lib/redux/productSlice";
import { Plus, Search, ArrowRight, ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import InstagramFeedSection from "@/components/InstagramFeedSection";
import CategoryHeader from "@/components/CategoryHeader";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";
import { AppDispatch, RootState } from "@/lib/redux/store";

// --- Types ---
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

// --- Product Card Component ---
const ProductCard: React.FC<ProductCardProps> = ({ part }) => {
  const { symbol, rate } = useCurrency();

  const descriptionText =
    typeof part.description === "string"
      ? part.description
      : part.description?.fullDescription || "";

  const convertedPrice = part.price * rate;

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
        <h4
          className="font-semibold text-slate-800 text-sm leading-tight"
          title={part.name}
        >
          <Link
            href={`/product/${part.slug}`}
            className="hover:text-blue-700 transition-colors line-clamp-2"
          >
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
            {symbol}
            {convertedPrice.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <Link
            href={`/product/${part.slug}`}
            className="flex items-center justify-center h-8 w-8 bg-slate-100 text-slate-600 rounded-full transition-all duration-300 ease-in-out group-hover:bg-slate-900 group-hover:text-white"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Helper Functions ---
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// --- Main Page Component ---
export default function CarbonCeramicRotorsPage() {
  const { t } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  
  // Specific Slug for this page
  const categorySlug = "carbon-ceramic-rotors";
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { categoryParts, currentCategory, categoryPageStatus } = useSelector(
    (state: RootState) => state.products
  );
  
  const [filters, setFilters] = useState({ brand: "", model: "" });

  const debouncedFetch = useCallback(
    debounce((appliedFilters: any) => {
      dispatch(fetchPartsForCategory(appliedFilters));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    dispatch(clearCategoryParts());
    dispatch(fetchCategoryBySlug(categorySlug));
    return () => {
      dispatch(clearCurrentCategory());
    };
  }, [dispatch, categorySlug]);

  useEffect(() => {
    if (currentCategory?._id) {
      const appliedFilters = {
        category: currentCategory._id,
        ...filters,
      };
      debouncedFetch(appliedFilters);
    }
  }, [currentCategory, filters, debouncedFetch, dispatch]);

  useEffect(() => {
    if (categoryPageStatus === "failed" && !currentCategory) {
      const timer = setTimeout(() => {
        notFound();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [categoryPageStatus, currentCategory]);

  const faqs = [
    { question: t("ccr.faq1.q"), answer: t("ccr.faq1.a") },
    { question: t("ccr.faq2.q"), answer: t("ccr.faq2.a") },
    { question: t("ccr.faq3.q"), answer: t("ccr.faq3.a") },
  ];

  return (
    <main className="bg-white text-slate-800 mt-16">
      
      <CategoryHeader
        slug={categorySlug}
        categoryName={currentCategory?.name || ""}
      />

      <section
        id="collection"
        className="py-12 bg-slate-50 scroll-mt-16 border-t border-slate-200"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
              {t("ccr.find.title") || "Precision Engineering"}
            </h2>
            <p className="text-slate-500 mt-2">
              {t("ccr.find.sub") || "Select your vehicle to discover compatible parts."}
            </p>
          </div>
          
          {categoryPageStatus === "loading" ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-200/70 animate-pulse"
                >
                  <div className="p-2">
                    <div className="aspect-square bg-slate-200 rounded-lg"></div>
                  </div>
                  <div className="px-3 pb-3">
                    <div className="h-4 w-full bg-slate-200 rounded mb-2"></div>
                    <div className="h-3 w-3/4 bg-slate-200 rounded mb-2"></div>
                    <div className="h-6 w-1/3 bg-slate-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : categoryParts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categoryParts.map((part) => (
                <ProductCard key={part._id} part={part} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80">
              <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800">
                {t("ccr.noProducts.title") || "No Matching Products"}
              </h3>
              <p className="text-slate-500 mt-2">
                {t("ccr.noProducts.sub") || "Your selection did not match any products."}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-8 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <button 
                    onClick={() => setOpenFaq(openFaq === -1 ? null : -1)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 bg-white hover:bg-slate-50 transition-colors duration-300"
                >
                    <div className="text-left">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                           {t("ccr.faq.title") || "Frequently Asked Questions"}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">Common questions about Carbon Ceramic Rotors</p>
                    </div>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center transition-all duration-300 ${openFaq === -1 ? 'bg-slate-900 text-white rotate-180' : 'text-slate-600'}`}>
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </button>

                <div className={`grid transition-all duration-500 ease-in-out border-t border-slate-100 ${openFaq === -1 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 border-t-0'}`}>
                    <div className="overflow-hidden bg-slate-50/50">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-slate-200/80 last:border-0">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex justify-between items-center text-left p-6 group hover:bg-white transition-colors duration-200"
                                >
                                    <span className={`font-semibold text-base sm:text-lg pr-4 transition-colors ${
                                      openFaq === index ? "text-amber-600" : "text-slate-800 group-hover:text-slate-900"
                                    }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`flex-shrink-0 transform transition-transform duration-300 ${
                                      openFaq === index ? "rotate-45 text-amber-600" : "text-slate-400 group-hover:text-slate-600"
                                    }`}>
                                        <Plus className="w-6 h-6" />
                                    </div>
                                </button>
                                <div className={`grid transition-all duration-300 ease-in-out bg-white ${
                                  openFaq === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}>
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