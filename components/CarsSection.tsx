"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchPublicCategories } from "@/lib/redux/productSlice";
import { fetchPublicCategorySlides } from "@/lib/redux/categorySlideSlice";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const CategoryHeroCard = ({
  slide,
  isSingleView = false,
}: {
  slide: any;
  isSingleView?: boolean;
}) => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
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

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (emblaApi) emblaApi.scrollPrev();
    },
    [emblaApi],
  );

  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (emblaApi) emblaApi.scrollNext();
    },
    [emblaApi],
  );

  if (!slide) return null;

  const categoryLink = slide.category?.slug
    ? `/category/${slide.category.slug}`
    : "/shop";

  if (isSingleView) {
    return (
      <div className="group relative bg-white rounded-sm overflow-hidden h-full lg:grid lg:grid-cols-2 transition-all duration-500 shadow-sm border border-slate-100">
        <div className="relative h-[400px] lg:h-full w-full overflow-hidden group/slider">
          <div className="h-full w-full" ref={emblaRef}>
            <div className="flex h-full">
              {slide.images && slide.images.length > 0
                ? slide.images.map((img: string, index: number) => (
                    <div
                      className="flex-[0_0_100%] relative h-full w-full"
                      key={index}
                    >
                      <Image
                        src={img}
                        alt={`${slide.title} - view ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/5 to-transparent pointer-events-none" />
                    </div>
                  ))
                : null}
            </div>
          </div>

          {slide.images && slide.images.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all z-10 opacity-0 group-hover/slider:opacity-100 translate-x-[-10px] group-hover/slider:translate-x-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all z-10 opacity-0 group-hover/slider:opacity-100 translate-x-[10px] group-hover/slider:translate-x-0"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10 px-4">
                <div className="flex gap-1.5 p-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden min-w-[32px] justify-center">
                  {(() => {
                    const maxDots = 7;
                    const total = scrollSnaps.length;
                    if (total <= maxDots) {
                      return scrollSnaps.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollTo(idx);
                          }}
                          className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                            idx === selectedIndex
                              ? "w-6 bg-white"
                              : "w-1.5 bg-white/60 hover:bg-white/80"
                          }`}
                        />
                      ));
                    }

                    let start = Math.max(
                      0,
                      selectedIndex - Math.floor(maxDots / 2),
                    );
                    let end = start + maxDots;
                    if (end > total) {
                      end = total;
                      start = end - maxDots;
                    }

                    return Array.from(
                      { length: maxDots },
                      (_, i) => start + i,
                    ).map((idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(idx);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                          idx === selectedIndex
                            ? "w-6 bg-white"
                            : "w-1.5 bg-white/60 hover:bg-white/80"
                        }`}
                      />
                    ));
                  })()}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative p-8 md:p-12 lg:p-16 flex flex-col h-full bg-white justify-center">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none transition-opacity group-hover:opacity-[0.08]">
            <Layers className="w-64 h-64 text-slate-900" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#176FC0]/10 border border-[#176FC0]/20 text-[#0F4C85] text-xs font-bold uppercase tracking-wider mb-8">
              <Sparkles className="w-3 h-3" />
              {slide.category?.name || "Premium Collection"}
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              {slide.title}
            </h3>

            <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              {slide.subtitle || slide.description?.mainText}
            </p>

            {slide.description?.highlights && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {slide.description.highlights
                  .slice(0, 4)
                  .map((highlight: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-sm bg-green-50 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {highlight}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="mt-auto relative z-10">
            <Link
              href={categoryLink}
              className="inline-flex items-center justify-center gap-3 text-white px-10 py-4 rounded-sm font-bold text-sm md:text-base bg-gradient-to-r from-[#176FC0] to-[#1461A8] hover:to-[#0F4C85] shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
            >
              <span>{t("common.viewMore")}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const MobileCategoryCard = ({ slide }: { slide: any }) => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
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

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (emblaApi) emblaApi.scrollPrev();
    },
    [emblaApi],
  );

  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (emblaApi) emblaApi.scrollNext();
    },
    [emblaApi],
  );

  if (!slide) return null;
  const categoryLink = slide.category?.slug
    ? `/category/${slide.category.slug}`
    : "/shop";

  return (
    <div className="mb-8 last:mb-0 px-2">
      <div className="group relative block bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden transition-all duration-300">
        <div className="relative w-full aspect-[4/5] bg-slate-50 overflow-hidden">
          <div className="h-full w-full" ref={emblaRef}>
            <div className="flex h-full">
              {slide.images &&
                slide.images.map((img: string, index: number) => (
                  <div
                    className="flex-[0_0_100%] relative h-full w-full"
                    key={index}
                  >
                    <Image
                      src={img}
                      alt={`${slide.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent" />
                  </div>
                ))}
            </div>
          </div>

          {slide.images && slide.images.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-800 p-1.5 rounded-full shadow-md backdrop-blur-sm transition-all z-10 border border-slate-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-800 p-1.5 rounded-full shadow-md backdrop-blur-sm transition-all z-10 border border-slate-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 pointer-events-none">
                <div className="flex gap-1 p-1 rounded-full bg-black/10 backdrop-blur-sm border border-white/10 pointer-events-auto min-w-[24px] justify-center">
                  {(() => {
                    const maxDots = 7;
                    const total = scrollSnaps.length;
                    if (total <= maxDots) {
                      return scrollSnaps.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollTo(idx);
                          }}
                          className={`h-1 rounded-full transition-all duration-300 shadow-sm ${
                            idx === selectedIndex
                              ? "w-4 bg-white"
                              : "w-1 bg-white/50"
                          }`}
                        />
                      ));
                    }

                    let start = Math.max(
                      0,
                      selectedIndex - Math.floor(maxDots / 2),
                    );
                    let end = start + maxDots;
                    if (end > total) {
                      end = total;
                      start = end - maxDots;
                    }

                    return Array.from(
                      { length: maxDots },
                      (_, i) => start + i,
                    ).map((idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(idx);
                        }}
                        className={`h-1 rounded-full transition-all duration-300 shadow-sm ${
                          idx === selectedIndex
                            ? "w-4 bg-white"
                            : "w-1 bg-white/50"
                        }`}
                      />
                    ));
                  })()}
                </div>
              </div>
            </>
          )}
        </div>

        <Link href={categoryLink} className="block p-5 bg-white relative">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              <span className="inline-block text-[10px] font-bold tracking-widest text-[#176FC0] uppercase mb-1.5">
                {slide.category?.name || "Collection"}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                {slide.title}
              </h3>
            </div>

            <div className="w-full mt-2">
              <div className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3.5 rounded-sm shadow-lg shadow-slate-900/10 transition-colors group-hover:bg-[#176FC0] text-sm">
                <span>{t("common.viewMore")}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
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
      setCanScrollRight(
        isScrollable && el.scrollLeft < el.scrollWidth - el.clientWidth - 5,
      );
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount =
        el.clientWidth * 0.75 * (direction === "left" ? -1 : 1);
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScrollability();
      el.addEventListener("scroll", checkScrollability, { passive: true });
      window.addEventListener("resize", checkScrollability);
      const observer = new MutationObserver(checkScrollability);
      observer.observe(el, { childList: true, subtree: true });
      return () => {
        el.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
        observer.disconnect();
      };
    }
  }, [checkScrollability]);

  return { scrollRef, canScrollLeft, canScrollRight, handleScroll };
};

const DesktopSkeletonLoader = () => (
  <div className="h-[600px] bg-slate-200 rounded-[2.5rem] animate-pulse"></div>
);

const MobileSkeletonLoader = () => (
  <div className="grid grid-cols-1 gap-6 px-2">
    {[1, 2].map((i) => (
      <div
        key={i}
        className="bg-slate-200 rounded-[2rem] h-[450px] animate-pulse shadow-sm"
      ></div>
    ))}
  </div>
);

export default function CategoryShowcaseSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.products);
  const { slides: categorySlides, status } = useSelector(
    (state: RootState) => state.categorySlides,
  );
  const { t } = useLanguage();

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const {
    scrollRef: tabsScrollRef,
    canScrollLeft: canTabsScrollLeft,
    canScrollRight: canTabsScrollRight,
    handleScroll: handleTabsScroll,
  } = useSlider();

  useEffect(() => {
    dispatch(fetchPublicCategories());
    dispatch(fetchPublicCategorySlides());
  }, [dispatch]);

  const validCategorySlides = useMemo(() => {
    return Array.isArray(categorySlides) ? categorySlides : [];
  }, [categorySlides]);

  const categoriesWithContent = useMemo(() => {
    if (!categories || !validCategorySlides.length) return [];
    return categories.filter((cat) =>
      validCategorySlides.some((slide) => slide.category?._id === cat._id),
    );
  }, [categories, validCategorySlides]);

  useEffect(() => {
    if (categoriesWithContent.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categoriesWithContent[0]._id);
    }
  }, [categoriesWithContent, activeCategoryId]);

  const filteredSlides = activeCategoryId
    ? validCategorySlides.filter(
        (slide) => slide.category?._id === activeCategoryId,
      )
    : [];

  if (status !== "loading" && categoriesWithContent.length === 0) return null;

  return (
    <section className="py-10 sm:py-12 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-5 hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-[#176FC0] opacity-75"></span>
              <span className="relative inline-flex rounded-sm h-2 w-2 bg-[#176FC0]"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-600">
              {t("cat.explore")}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 sm:mb-6">
            {t("cat.featured")}
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-500 leading-relaxed px-4">
            {t("cat.subtitle")}
          </p>
        </div>

        <div className="block lg:hidden">
          {status === "loading" ? (
            <MobileSkeletonLoader />
          ) : (
            <>
              {/* Mobile Category Slides */}
              <div className="max-w-md mx-auto space-y-8">
                {filteredSlides.map((slide) => (
                  <MobileCategoryCard key={slide._id} slide={slide} />
                ))}
              </div>

              {/* Mobile Category Navigation */}
              {categoriesWithContent.length > 1 && (
                <div className="flex items-center justify-center gap-3 mt-8 px-4">
                  <button
                    onClick={() => {
                      const currentIndex = categoriesWithContent.findIndex(
                        (cat) => cat._id === activeCategoryId,
                      );
                      const prevIndex =
                        currentIndex > 0
                          ? currentIndex - 1
                          : categoriesWithContent.length - 1;
                      setActiveCategoryId(categoriesWithContent[prevIndex]._id);
                    }}
                    className="flex-shrink-0 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all text-slate-700 hover:text-[#176FC0] border border-slate-200 active:scale-95"
                    aria-label="Previous category"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="flex-1 text-center px-2">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                      <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                        {categoriesWithContent.find(
                          (cat) => cat._id === activeCategoryId,
                        )?.name || ""}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {categoriesWithContent.findIndex(
                          (cat) => cat._id === activeCategoryId,
                        ) + 1}
                        /{categoriesWithContent.length}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const currentIndex = categoriesWithContent.findIndex(
                        (cat) => cat._id === activeCategoryId,
                      );
                      const nextIndex =
                        currentIndex < categoriesWithContent.length - 1
                          ? currentIndex + 1
                          : 0;
                      setActiveCategoryId(categoriesWithContent[nextIndex]._id);
                    }}
                    className="flex-shrink-0 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all text-slate-700 hover:text-[#176FC0] border border-slate-200 active:scale-95"
                    aria-label="Next category"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="hidden lg:block">
          <div className="flex relative mb-14 items-center justify-center">
            {canTabsScrollLeft && (
              <button
                onClick={() => handleTabsScroll("left")}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 h-14 w-14 bg-white rounded-sm flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:scale-110 transition-all text-slate-700 hover:text-[#176FC0] border border-slate-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <div className="w-full max-w-5xl mx-auto px-4">
              <div
                ref={tabsScrollRef}
                className="flex items-center space-x-3 overflow-x-auto p-2.5 rounded-full bg-white shadow-sm border border-slate-100 no-scrollbar"
                style={{ scrollbarWidth: "none" }}
              >
                {categoriesWithContent.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setActiveCategoryId(category._id)}
                    className={`flex-shrink-0 whitespace-nowrap rounded-sm py-3.5 px-8 text-sm font-bold transition-all duration-300 ${
                      activeCategoryId === category._id
                        ? "bg-slate-900 text-white shadow-lg transform scale-100 ring-4 ring-slate-100"
                        : "bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {canTabsScrollRight && (
              <button
                onClick={() => handleTabsScroll("right")}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 h-14 w-14 bg-white rounded-sm flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:scale-110 transition-all text-slate-700 hover:text-[#176FC0] border border-slate-100"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          <div className="px-0 md:px-4 lg:px-8 min-h-[600px]">
            {status === "loading" ? (
              <DesktopSkeletonLoader />
            ) : filteredSlides.length > 0 ? (
              <CategoryHeroCard slide={filteredSlides[0]} isSingleView={true} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
