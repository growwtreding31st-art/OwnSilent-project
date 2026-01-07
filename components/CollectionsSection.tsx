"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchPublicCollections, fetchPublicCollectionBySlug } from '@/lib/redux/collectionSlice';
import { Wrench, ChevronRight, ChevronLeft, ArrowRight, Layers } from 'lucide-react';

const ProductCard = ({ part }: { part: any }) => {
    const stripHtml = (html: string | undefined): string => {
        if (!html) return '';
        if (typeof window !== 'undefined') {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
        }
        return html.replace(/<[^>]*>?/gm, '');
    };

    const descriptionText = typeof part.description === 'string'
        ? stripHtml(part.description)
        : stripHtml(part.description?.fullDescription);

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
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                        {descriptionText}
                    </p>
                )}
                <div className="mt-auto pt-2 flex justify-between items-center">
                    <p className="text-slate-900 font-bold text-md">
                        ${part.price ? part.price.toLocaleString('en-IN') : 'N/A'}
                    </p>
                    <Link href={`/product/${part.slug}`} className="flex items-center justify-center h-8 w-8 bg-slate-100 text-slate-600 rounded-full transition-all duration-300 ease-in-out group-hover:bg-slate-900 group-hover:text-white">
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const useSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      const isScrollable = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(isScrollable && el.scrollLeft > 5);
      setCanScrollRight(isScrollable && el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = (el.clientWidth * 0.75) * (direction === 'left' ? -1 : 1);
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScrollability();
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);
      const observer = new MutationObserver(checkScrollability);
      observer.observe(el, { childList: true, subtree: true });
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
        observer.disconnect();
      };
    }
  }, [checkScrollability]);

  return { scrollRef, canScrollLeft, canScrollRight, handleScroll };
};

const ProductSlider = ({ parts }: { parts: any[] }) => {
    const { scrollRef, canScrollLeft, canScrollRight, handleScroll } = useSlider();

    return (
        <div className="relative">
            <button onClick={() => handleScroll('left')} disabled={!canScrollLeft} className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 h-11 w-11 bg-white rounded-full flex items-center justify-center shadow-lg ring-1 ring-slate-200 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hover:bg-slate-50" aria-label="Scroll left">
                <ChevronLeft className="h-6 w-6 text-slate-800"/>
            </button>
            
            <div ref={scrollRef} className="flex space-x-4 overflow-x-auto snap-x snap-mandatory py-4 -mx-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {parts.map(part => (
                    <div key={part._id} className="flex-shrink-0 w-[calc(70%)] sm:w-[calc(40%)] md:w-[calc(28%)] lg:w-[calc(22%)] xl:w-[calc(18%)] snap-start">
                        <ProductCard part={part} />
                    </div>
                ))}
            </div>

            <button onClick={() => handleScroll('right')} disabled={!canScrollRight} className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-11 w-11 bg-white rounded-full flex items-center justify-center shadow-lg ring-1 ring-slate-200 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hover:bg-slate-50" aria-label="Scroll right">
                <ChevronRight className="h-6 w-6 text-slate-800"/>
            </button>
        </div>
    );
};

const SkeletonLoader = () => (
    <div className="flex space-x-4 -mx-4 px-4 animate-pulse">
        {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-[calc(70%)] sm:w-[calc(40%)] md:w-[calc(28%)] lg:w-[calc(22%)] xl:w-[calc(18%)]">
                <div className="bg-white rounded-xl border border-slate-200/70">
                    <div className="p-2"><div className="aspect-square bg-slate-200 rounded-lg"></div></div>
                    <div className="px-3 pb-3"><div className="h-4 w-full bg-slate-200 rounded mb-2"></div><div className="h-3 w-3/4 bg-slate-200 rounded mb-2"></div><div className="h-6 w-1/3 bg-slate-200 rounded"></div></div>
                </div>
            </div>
        ))}
    </div>
);

const EmptyState = ({ collectionName }: { collectionName: string }) => (
    <div className="text-center py-20 px-6 bg-white rounded-2xl border border-dashed border-slate-200">
        <Wrench className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-4 text-xl font-semibold text-slate-800">Products Coming Soon</h3>
        <p className="text-slate-500 mt-2 max-w-md mx-auto">We're updating our inventory for the {collectionName} collection. Please check back soon!</p>
    </div>
);

export default function CollectionsSection() {
    const dispatch = useDispatch<AppDispatch>();
    const { publicCollections, collectionProducts, collectionProductsStatus } = useSelector((state: RootState) => state.collections);
    const [activeCollection, setActiveCollection] = useState<any>(null);
    const { scrollRef: tabsScrollRef, canScrollLeft: canTabsScrollLeft, canScrollRight: canTabsScrollRight, handleScroll: handleTabsScroll } = useSlider();

    useEffect(() => {
        dispatch(fetchPublicCollections());
    }, [dispatch]);

    useEffect(() => {
        if (publicCollections.length > 0 && !activeCollection) {
            setActiveCollection(publicCollections[0]);
        }
    }, [publicCollections, activeCollection]);

    useEffect(() => {
        if (activeCollection) {
            dispatch(fetchPublicCollectionBySlug(activeCollection.slug));
        }
    }, [dispatch, activeCollection]);

    const renderContent = () => {
        if (collectionProductsStatus === 'loading') return <SkeletonLoader />;
        if (collectionProducts.length > 0) return <ProductSlider parts={collectionProducts} />;
        if (collectionProductsStatus === 'succeeded' && collectionProducts.length === 0) {
            return <EmptyState collectionName={activeCollection?.name} />;
        }
        return <SkeletonLoader />;
    };

    if (publicCollections.length === 0 && collectionProductsStatus !== 'loading') return null;

    return (
        <section className="bg-slate-50 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                        Shop by <span className="text-amber-600">Collection</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Discover curated selections of our best-selling and top-rated parts.
                    </p>
                </div>

                <div className="relative mb-12 flex items-center justify-center">
                    <button onClick={() => handleTabsScroll('left')} disabled={!canTabsScrollLeft} className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow ring-1 ring-slate-200 transition-opacity duration-300 disabled:opacity-0 disabled:pointer-events-none hover:bg-slate-50" aria-label="Scroll left">
                        <ChevronLeft className="h-5 w-5 text-slate-700"/>
                    </button>
                    
                    <div className="w-full max-w-4xl mx-auto">
                      <div ref={tabsScrollRef} className="flex items-center space-x-2 overflow-x-auto p-1.5 rounded-full bg-slate-200/75 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {publicCollections.map((collection) => (
                          <button key={collection._id} onClick={() => setActiveCollection(collection)} className={`flex-shrink-0 whitespace-nowrap rounded-full py-2 px-5 text-sm font-semibold transition-all duration-300 ease-in-out ${activeCollection?._id === collection._id ? 'bg-white text-slate-900 shadow' : 'bg-transparent text-slate-600 hover:text-slate-900'}`}>
                            {collection.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => handleTabsScroll('right')} disabled={!canTabsScrollRight} className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow ring-1 ring-slate-200 transition-opacity duration-300 disabled:opacity-0 disabled:pointer-events-none hover:bg-slate-50" aria-label="Scroll right">
                        <ChevronRight className="h-5 w-5 text-slate-700"/>
                    </button>
                </div>
                
                <div className="px-8">
                    {renderContent()}
                </div>
            </div>
        </section>
    );
}