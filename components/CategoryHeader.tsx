"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchSlideForCategory, clearCurrentCategorySlide } from "@/lib/redux/categorySlideSlice";
import { fetchSectionForCategory, clearCurrentSection } from "@/lib/redux/categorySectionSlice";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, ImageIcon, Layers, Sparkles, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Carousel = ({ images, title, aspectRatio = "aspect-[4/3]" }: { images: string[]; title: string; aspectRatio?: string }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    if (!images || images.length === 0) return (
        <div className={`w-full ${aspectRatio} bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100`}>
            <ImageIcon className="text-slate-300 w-12 h-12" />
        </div>
    );

    return (
        <div className={`relative group w-full ${aspectRatio} overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm`}>
            <div className="h-full w-full" ref={emblaRef}>
                <div className="flex h-full touch-pan-y cursor-grab active:cursor-grabbing">
                    {images.map((img, index) => (
                        <div className="flex-[0_0_100%] h-full relative" key={index}>
                            <Image
                                src={img}
                                alt={`${title} ${index + 1}`}
                                fill
                                className="object-cover w-full h-full"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {images.length > 1 && (
                <>
                    <button onClick={scrollPrev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-800 hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100 shadow-md z-10">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={scrollNext} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-800 hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100 shadow-md z-10">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10 pointer-events-none px-4">
                        <div className="flex gap-1.5 p-1 rounded-full bg-black/10 backdrop-blur-sm border border-white/10 pointer-events-auto min-w-[24px] justify-center">
                            {(() => {
                                const maxDots = 7;
                                const total = scrollSnaps.length;
                                if (total <= maxDots) {
                                    return scrollSnaps.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => { e.preventDefault(); scrollTo(idx); }}
                                            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === selectedIndex ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"}`}
                                        />
                                    ));
                                }

                                let start = Math.max(0, selectedIndex - Math.floor(maxDots / 2));
                                let end = start + maxDots;
                                if (end > total) {
                                    end = total;
                                    start = end - maxDots;
                                }

                                return Array.from({ length: maxDots }, (_, i) => start + i).map((idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.preventDefault(); scrollTo(idx); }}
                                        className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === selectedIndex ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"}`}
                                    />
                                ));
                            })()}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};



interface CategoryHeaderProps {
    slug: string;
    categoryName: string;
}

export default function CategoryHeader({ slug, categoryName }: CategoryHeaderProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { currentSlide } = useSelector((state: RootState) => state.categorySlides);
    const { currentSection } = useSelector((state: RootState) => state.categorySections);

    useEffect(() => {
        if (slug) {
            dispatch(fetchSlideForCategory(slug));
            dispatch(fetchSectionForCategory(slug));
        }
        return () => {
            dispatch(clearCurrentCategorySlide());
            dispatch(clearCurrentSection());
        };
    }, [dispatch, slug]);

    if (!currentSlide && !currentSection) return null;

    const heroImages = currentSlide?.images || [];
    const infoImages = currentSection?.images?.length ? currentSection.images : [];

    const technicalTitle = currentSection?.technicalTitle || "Technical Overview";
    const technicalDescription = currentSection?.technicalDescription;
    const technicalHighlights = currentSection?.technicalHighlights?.length ? currentSection.technicalHighlights : [];
    const technicalImages = currentSection?.technicalImages?.length ? currentSection.technicalImages : [];



    const heroDescText = typeof currentSlide?.description === 'string' ? currentSlide.description : currentSlide?.description?.mainText;
    const heroHighlights = typeof currentSlide?.description === 'object' ? currentSlide.description.highlights : [];

    const infoDescText = currentSection?.description?.mainText;
    const infoHighlights = currentSection?.description?.highlights || [];
    const infoSpecs = currentSection?.description?.specifications || [];

    return (
        <section className="bg-white border-b border-slate-200 py-8 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col gap-10 lg:hidden">

                    <div className="space-y-6">
                        <Carousel images={heroImages} title="Overview" aspectRatio="aspect-[4/5]" />
                        <div className="space-y-4 px-1">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-600">Featured</span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">{currentSlide?.title || categoryName}</h1>
                            <p className="text-[15px] text-slate-600 leading-relaxed">{heroDescText}</p>

                            {heroHighlights && heroHighlights.length > 0 && (
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100/80 shadow-sm mt-4">
                                    <h4 className="text-sm font-extrabold uppercase text-slate-900 tracking-wider mb-5">Highlights</h4>
                                    <ul className="space-y-4">
                                        {heroHighlights.map((h: string, i: number) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-[15px] font-semibold text-slate-700 leading-relaxed">{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-slate-100">
                        {infoImages.length > 0 && (
                            <Carousel images={infoImages} title="Details" aspectRatio="aspect-square" />
                        )}

                        <div className="space-y-6 px-1">
                            <h2 className="text-2xl font-bold text-slate-900">{currentSection?.title}</h2>
                            <p className="text-[15px] text-slate-600 leading-relaxed">{infoDescText}</p>

                            {infoHighlights && infoHighlights.length > 0 && (
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100/80 shadow-sm">
                                    <h4 className="text-sm font-extrabold uppercase text-slate-900 tracking-wider mb-5">Highlights</h4>
                                    <ul className="space-y-4">
                                        {infoHighlights.map((h: string, i: number) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-[15px] font-semibold text-slate-700 leading-relaxed">{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-slate-100">
                        {technicalImages.length > 0 && (
                            <Carousel images={technicalImages} title="Technical" aspectRatio="aspect-video" />
                        )}

                        <div className="space-y-6 px-1">
                            <h2 className="text-2xl font-bold text-slate-900">{technicalTitle}</h2>
                            {technicalDescription && (
                                <p className="text-[15px] text-slate-600 leading-relaxed">{technicalDescription}</p>
                            )}

                            {technicalHighlights && technicalHighlights.length > 0 && (
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100/80 shadow-sm">
                                    <h4 className="text-sm font-extrabold uppercase text-slate-900 tracking-wider mb-5">Highlights</h4>
                                    <ul className="space-y-4">
                                        {technicalHighlights.map((h: string, i: number) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-[15px] font-semibold text-slate-700 leading-relaxed">{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>



                    {currentSlide?.ctaLink && (
                        <div className="pt-2 pb-4">
                            <Link href={currentSlide.ctaLink} className="flex items-center justify-center w-full bg-slate-900 text-white font-bold py-4 rounded-lg shadow-md active:scale-95 transition-transform">
                                {currentSlide.ctaText || "Explore Collection"} <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    )}
                </div>

                <div className="hidden lg:grid grid-cols-3 gap-10 items-start">

                    <div className="flex flex-col w-full h-full">
                        <div className="w-full shadow-lg rounded-xl overflow-hidden mb-8">
                            <Carousel images={heroImages} title="Hero Gallery" aspectRatio="aspect-[4/3]" />
                        </div>

                        <div className="flex flex-col flex-1">
                            <div className="h-8 flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-slate-400">Featured</span>
                            </div>

                            <div className="h-16 flex items-start mb-4">
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                                    {currentSlide?.title || categoryName}
                                </h1>
                            </div>

                            <div className="mb-6">
                                <p className="text-[15px] leading-7 text-slate-600">
                                    {heroDescText}
                                </p>
                            </div>

                            {heroHighlights && heroHighlights.length > 0 && (
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm mb-6">
                                    <h4 className="text-sm font-extrabold uppercase text-slate-900 tracking-wider mb-5">Highlights</h4>
                                    <ul className="space-y-4">
                                        {heroHighlights.map((h: string, i: number) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-[15px] font-semibold text-slate-700 leading-relaxed">{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {currentSlide?.ctaLink && (
                                <div className="mt-auto pt-2">
                                    <Link href={currentSlide.ctaLink} className="inline-flex items-center justify-center w-full bg-slate-900 text-white px-6 py-4 rounded-lg font-bold text-sm shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all duration-300">
                                        <span>{currentSlide.ctaText || "Explore Parts"}</span>
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col w-full h-full">
                        <div className="w-full shadow-lg rounded-xl overflow-hidden mb-8">
                            <Carousel images={infoImages} title="Detail Gallery" aspectRatio="aspect-[4/3]" />
                        </div>

                        <div className="flex flex-col flex-1">
                            <div className="h-8 flex items-center gap-2 mb-2">
                                <Star className="w-4 h-4 text-blue-500" />
                                <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-slate-400">IN-DEPTH</span>
                            </div>

                            <div className="h-16 flex items-start mb-4">
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-snug line-clamp-2">
                                    {currentSection?.title}
                                </h2>
                            </div>

                            <div className="mb-6">
                                <p className="text-[15px] leading-7 text-slate-600 text-justify">
                                    {infoDescText}
                                </p>
                            </div>

                            {infoHighlights && infoHighlights.length > 0 && (
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm mb-6">
                                    <h4 className="text-sm font-extrabold uppercase text-slate-900 tracking-wider mb-5">Highlights</h4>
                                    <ul className="space-y-4">
                                        {infoHighlights.map((h: string, i: number) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-[15px] font-semibold text-slate-700 leading-relaxed">{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col w-full h-full">
                        <div className="w-full shadow-lg rounded-xl overflow-hidden mb-8">
                            <Carousel images={technicalImages} title="Technical Gallery" aspectRatio="aspect-[4/3]" />
                        </div>

                        <div className="flex flex-col flex-1">
                            <div className="h-8 flex items-center gap-2 mb-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-slate-400">Key Features</span>
                            </div>

                            <div className="h-16 flex items-start mb-4">
                                <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                                    {technicalTitle}
                                </h3>
                            </div>

                            <div className="flex flex-col gap-6">
                                {technicalDescription && (
                                    <p className="text-[15px] leading-7 text-slate-600">
                                        {technicalDescription}
                                    </p>
                                )}
                                <div className="text-[15px] leading-7 text-slate-600">
                                    {technicalHighlights && technicalHighlights.length > 0 && (
                                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm mb-6">
                                            <h4 className="text-sm font-extrabold uppercase text-slate-900 tracking-wider mb-5">Highlights</h4>
                                            <ul className="space-y-4">
                                                {technicalHighlights.map((h: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-4">
                                                        <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-[15px] font-semibold text-slate-700 leading-relaxed">{h}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}