"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchSectionForCategory,
  clearCurrentSection,
} from "@/lib/redux/categorySectionSlice";
import Image from "next/image";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Layers,
  Sparkles,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function CategoryInfoSection({ slug }: { slug: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentSection, status } = useSelector(
    (state: RootState) => state.categorySections
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (slug) {
      dispatch(fetchSectionForCategory(slug));
    }
    return () => {
      dispatch(clearCurrentSection());
    };
  }, [dispatch, slug]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!currentSection && status !== "loading") return null;
  if (!currentSection) return null;

  const displayImages: string[] =
    currentSection.images && currentSection.images.length > 0
      ? currentSection.images
      : currentSection.image
      ? [currentSection.image]
      : [];

  const hasMultipleImages = displayImages.length > 1;

  return (
    <section className="relative bg-white py-12 sm:py-16 border-b border-slate-100 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-blue-50/50 rounded-full blur-[80px]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
          <div className="w-full lg:flex-1 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 shadow-sm">
                <Sparkles
                  size={10}
                  className="text-[#176FC0]"
                  fill="currentColor"
                />
                <span className="text-[10px] font-bold tracking-widest text-[#0F4C85] uppercase">
                  {currentSection.subtitle || "Product Insight"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {currentSection.title}
              </h2>
            </div>

            <div className="prose prose-sm prose-slate text-slate-600 max-w-none">
              <p className="whitespace-pre-line text-sm leading-relaxed">
                {currentSection.description?.mainText}
              </p>
            </div>

            {currentSection.description?.highlights?.length > 0 && (
              <div className="pt-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 gap-3 w-full">
                  {currentSection.description.highlights.map(
                    (highlight: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 w-full group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 group-hover:bg-[#176FC0] group-hover:text-white text-[#176FC0] flex items-center justify-center transition-all duration-300 mt-0.5">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-sm font-medium text-slate-700 leading-snug group-hover:text-slate-900">
                          {highlight}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[380px] flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="relative group w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 bg-white">
              <div className="h-full w-full" ref={emblaRef}>
                <div className="flex h-full touch-pan-y cursor-grab active:cursor-grabbing">
                  {displayImages.length > 0 ? (
                    displayImages.map((img: string, index: number) => (
                      <div
                        className="flex-[0_0_100%] h-full relative min-w-0 bg-white"
                        key={index}
                      >
                        <Image
                          src={img}
                          alt={`${currentSection.title} - View ${index + 1}`}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain w-full h-full p-1"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex-[0_0_100%] h-full flex flex-col items-center justify-center bg-slate-50 text-slate-300">
                      <ImageIcon size={32} strokeWidth={1.5} />
                      <p className="mt-2 text-[10px] font-medium text-slate-400">
                        No images available
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {hasMultipleImages && (
                <>
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0F4C85]/20 to-transparent pointer-events-none"></div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 p-1 rounded-full bg-slate-900/10 backdrop-blur-md border border-white/20">
                    {displayImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === selectedIndex
                            ? "w-4 bg-[#176FC0]"
                            : "w-1.5 bg-slate-400/50 hover:bg-[#176FC0]/70"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={scrollPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white text-[#176FC0] border border-slate-100 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 active:scale-95"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={scrollNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white text-[#176FC0] border border-slate-100 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 active:scale-95"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {currentSection.description?.specifications?.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm">
                <div className="px-5 py-3 bg-slate-50/80 border-b border-slate-200/60 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#176FC0]" />
                  <h4 className="font-bold text-[#0F4C85] text-[10px] uppercase tracking-wider">
                    Specifications
                  </h4>
                </div>
                <div className="p-5">
                  <div className="space-y-3">
                    {currentSection.description.specifications.map(
                      (spec: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-xs border-b border-dashed border-slate-200 last:border-0 last:pb-0 pb-2"
                        >
                          <dt className="text-slate-500 font-medium">
                            {spec.key}
                          </dt>
                          <dd className="text-[#0F4C85] font-bold text-right pl-4">
                            {spec.value}
                          </dd>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}