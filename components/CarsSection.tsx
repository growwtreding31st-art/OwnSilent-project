"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const CategoryHeroCard = ({
  slide,
  isActive,
}: {
  slide: any;
  isActive: boolean;
}) => {
  const { t } = useLanguage();
  if (!slide) return null;

  const categoryLink = slide.category?.slug
    ? `/category/${slide.category.slug}`
    : "/shop";

  return (
    <Link href={categoryLink} className="block w-full h-full cursor-pointer">
      <div className="group relative bg-white rounded-sm overflow-hidden h-full lg:grid lg:grid-cols-2 transition-all duration-700 shadow-sm border border-slate-100">
        <div className="relative h-[400px] lg:h-full w-full overflow-hidden">
          {slide.images && slide.images.length > 0 && (
            <motion.div
              className="relative h-full w-full"
              initial={{ scale: 1.1 }}
              animate={{ scale: isActive ? 1 : 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src={slide.images[0]}
                alt={slide.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 to-transparent pointer-events-none" />
            </motion.div>
          )}
        </div>

        <div className="relative p-6 md:p-10 lg:p-16 flex flex-col h-full bg-white justify-center overflow-hidden">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#176FC0]/10 border border-[#176FC0]/20 text-[#0F4C85] text-xs font-bold uppercase tracking-wider mb-8"
            >
              <Sparkles className="w-3 h-3" />
              {slide.category?.name || "Premium Collection"}
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4 line-clamp-2 w-full"
            >
              {slide.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base md:text-lg text-slate-500 mb-6 leading-relaxed max-w-lg font-medium line-clamp-2 w-full"
            >
              {slide.subtitle || slide.description?.mainText}
            </motion.p>

            {slide.description?.highlights && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {slide.description.highlights
                  .slice(0, 4)
                  .map((highlight: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-sm bg-blue-50 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-[#176FC0]" />
                      </div>
                      <span className="text-sm font-semibold text-slate-600">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const MobileCategoryCard = ({
  slide,
  isActive,
}: {
  slide: any;
  isActive: boolean;
}) => {
  const { t } = useLanguage();

  if (!slide) return null;
  const categoryLink = slide.category?.slug
    ? `/category/${slide.category.slug}`
    : "/shop";

  return (
    <div className="mb-1 last:mb-0">
      <Link
        href={categoryLink}
        className="group relative block bg-white rounded-sm shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden transition-all duration-300 h-full"
      >
        <div className="relative w-full h-[380px] lg:aspect-[4/5] bg-slate-50 overflow-hidden">
          <motion.div
            className="h-full w-full"
            animate={{ scale: isActive ? 1 : 1.1 }}
            transition={{ duration: 0.8 }}
          >
            {slide.images && slide.images.length > 0 && (
              <div className="relative h-full w-full">
                <Image
                  src={slide.images[0]}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
              </div>
            )}
          </motion.div>
        </div>

        <div className="p-2 bg-white relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
            className="w-full text-center"
          >
            <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight line-clamp-2 w-full px-1">
              {slide.title}
            </h3>
          </motion.div>
        </div>
      </Link>
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

export default function CategoryShowcaseSection({ part }: { part?: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.products);
  const { slides: categorySlides, status } = useSelector(
    (state: RootState) => state.categorySlides,
  );
  const { t } = useLanguage();

  const validCategorySlides = useMemo(() => {
    const slides = Array.isArray(categorySlides) ? categorySlides : [];
    return slides.filter(
      (slide) => slide.category?.slug !== "carplay-and-android-auto-retrofit",
    );
  }, [categorySlides]);

  const categoriesWithContent = useMemo(() => {
    if (!categories || !validCategorySlides.length) return [];
    const filteredCats = categories.filter((cat) =>
      validCategorySlides.some((slide) => {
        const slideCatId =
          slide.category?._id?.toString() || slide.category?.toString();
        const catId = cat._id?.toString() || cat.toString();
        return slideCatId === catId;
      }),
    );

    // Map cats to include the image from the first slide if available
    const catsWithImage = filteredCats.map((cat) => {
      const slide = validCategorySlides.find((s) => {
        const slideCatId =
          s.category?._id?.toString() || s.category?.toString();
        const catId = cat._id?.toString() || cat.toString();
        return slideCatId === catId;
      });
      return {
        ...cat,
        imageUrl: slide?.images?.[0] || "",
      };
    });

    if (part === "1") return catsWithImage.slice(0, 5);
    if (part === "2") return catsWithImage.slice(5, 12);
    return catsWithImage;
  }, [categories, validCategorySlides, part]);

  const slidesToRender = useMemo(() => {
    return categoriesWithContent
      .map((cat) => {
        const slide = validCategorySlides.find((s) => {
          const slideCatId =
            s.category?._id?.toString() || s.category?.toString();
          const catId = cat._id?.toString() || cat.toString();
          return slideCatId === catId;
        });
        return slide;
      })
      .filter(Boolean);
  }, [categoriesWithContent, validCategorySlides]);

  useEffect(() => {
    dispatch(fetchPublicCategories());
    dispatch(fetchPublicCategorySlides());
  }, [dispatch]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  if (status !== "loading" && categoriesWithContent.length === 0) return null;

  return (
    <section
      className={`py-8 sm:py-16 bg-slate-50 overflow-hidden ${part === "1" ? "mt-10" : ""}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-16">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-5 hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-[#176FC0] opacity-75"></span>
              <span className="relative inline-flex rounded-sm h-2 w-2 bg-[#176FC0]"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-600">
              {t("cat.explore")}
            </span>
          </div> */}

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 sm:mb-6 mt-2 sm:mt-8">
            {t("cat.featured")}
          </h2>
        </div>

        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {status === "loading"
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex-[0_0_100%] min-w-0 px-2 lg:px-4"
                    >
                      <DesktopSkeletonLoader />
                    </div>
                  ))
                : slidesToRender.map((slide, idx) => (
                    <div
                      key={idx}
                      className="flex-[0_0_100%] min-w-0 px-2 lg:px-4"
                    >
                      <div className="h-full">
                        <div className="hidden lg:block h-[500px]">
                          <CategoryHeroCard
                            slide={slide}
                            isActive={idx === selectedIndex}
                          />
                        </div>
                        <div className="lg:hidden">
                          <MobileCategoryCard
                            slide={slide}
                            isActive={idx === selectedIndex}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          {/* Navigation Arrows - Desktop only */}
          {slidesToRender.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-900 border border-slate-100 hidden lg:flex hover:bg-slate-50 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-900 border border-slate-100 hidden lg:flex hover:bg-slate-50 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {slidesToRender.length > 1 && (
            <div className="flex justify-center gap-1 mt-8 lg:mt-12">
              {slidesToRender.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === selectedIndex
                      ? "w-8 h-1.5 bg-[#176FC0]"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
