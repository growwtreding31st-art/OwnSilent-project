"use client"

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchSlideForCategory, clearCurrentCategorySlide } from '@/lib/redux/categorySlideSlice';
import Link from 'next/link';
import { ArrowRight, Check, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const DescriptionRenderer = ({ description }: { description: any }) => {
    if (!description) return null;
    if (typeof description === 'string') {
        return <p className="mt-6 text-md text-slate-600 max-w-2xl">{description}</p>;
    }

    return (
        <div className="mt-6 space-y-4 max-w-2xl">
            {description?.mainText && <p className="text-sm text-slate-600 leading-relaxed">{description.mainText}</p>}
            
            {description?.highlights && description.highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-4 border-t">
                    {description.highlights.map((highlight: string, index: number) => (
                        <span key={index} className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" /> {highlight}
                        </span>
                    ))}
                </div>
            )}

            {description?.specifications && description.specifications.length > 0 && (
                <div className="text-sm border-t pt-3 mt-3">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                        {description.specifications.map((spec: {key: string; value: string}, index: number) => (
                           <div key={index} className="flex justify-between items-center border-b border-slate-200 py-1">
                               <dt className="text-slate-500 font-medium">{spec.key}</dt>
                               <dd className="font-bold text-slate-800 text-right">{spec.value}</dd>
                           </div>
                        ))}
                    </dl>
                </div>
            )}
        </div>
    );
};

interface CategoryHeroProps {
    slug: string;
    categoryName: string;
}

export default function CategoryHero({ slug, categoryName }: CategoryHeroProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { currentSlide } = useSelector((state: RootState) => state.categorySlides);
    
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [count, setCount] = useState(0);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCount(emblaApi.scrollSnapList().length);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    useEffect(() => {
        if (slug) {
            dispatch(fetchSlideForCategory(slug));
        }
        return () => {
            dispatch(clearCurrentCategorySlide());
        }
    }, [dispatch, slug]);

    const slide = currentSlide;

    if (!slide || !slide.images || slide.images.length === 0) {
        return (
            <section className="relative bg-slate-50 overflow-hidden border-b">
                 <div className="absolute inset-0 bg-[url('/images/misc/grid.svg')] opacity-50 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                 <div className="relative container mx-auto px-6 lg:px-8 py-24 sm:py-32">
                    <div className='max-w-3xl'>
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-5">
                          {categoryName || "Premium Parts"}
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                          Discover our premium selection of {categoryName ? categoryName.toLowerCase() : 'parts'}. Engineered for performance, designed for perfection.
                        </p>
                    </div>
                 </div>
            </section>
        );
    }

    return (
        <section className="relative bg-slate-50 text-slate-900 overflow-hidden border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pt-12 sm:pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 items-center">
                    
                    <div className="order-2 lg:order-1">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                            {slide.title}
                        </h1>
                        
                        <DescriptionRenderer description={slide.description} />
                        
                        {slide.ctaText && slide.ctaLink && (
                            <div className="mt-8 sm:mt-10">
                                <Link href={slide.ctaLink} className="group inline-flex items-center justify-center gap-x-2.5 rounded-sm bg-slate-900 px-7 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-slate-700 w-full sm:w-auto">
                                    <span>{slide.ctaText}</span>
                                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    <div className="order-1 lg:order-2 w-full">
                        <div className="relative group aspect-square w-full overflow-hidden rounded-sm shadow-2xl shadow-slate-200 border border-slate-100 bg-white">
                            <div className="h-full w-full overflow-hidden" ref={emblaRef}>
                                <div className="flex h-full touch-pan-y cursor-grab active:cursor-grabbing">
                                    {slide.images.map((img: string, index: number) => (
                                        <div className="flex-[0_0_100%] h-full relative min-w-0" key={index}>
                                            <Image 
                                                src={img} 
                                                alt={`${slide.title} view ${index + 1}`}
                                                fill
                                                sizes="(max-width: 1023px) 100vw, 50vw"
                                                className="object-cover transition-transform duration-700 hover:scale-105"
                                                priority={index === 0}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <button 
                                onClick={scrollPrev}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all z-10 border border-slate-100 opacity-0 group-hover:opacity-100 sm:opacity-100 active:opacity-100 active:scale-95"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            
                            <button 
                                onClick={scrollNext}
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all z-10 border border-slate-100 opacity-0 group-hover:opacity-100 sm:opacity-100 active:opacity-100 active:scale-95"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            <div className="absolute bottom-4 right-4 z-10">
                                <div className="flex items-center gap-1.5 bg-slate-900/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-sm select-none pointer-events-none">
                                    <ImageIcon className="w-3.5 h-3.5 opacity-80" />
                                    <span className="text-xs font-bold tracking-wider">
                                        {selectedIndex + 1} / {count}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}