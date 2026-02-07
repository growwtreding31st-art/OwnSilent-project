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
          <motion.div
            className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none"
            animate={{
              rotate: isActive ? 5 : 0,
              scale: isActive ? 1.1 : 1,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Layers className="w-80 h-80 text-slate-900" />
          </motion.div>

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
              className="text-lg md:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight mb-4 truncate w-full"
            >
              {slide.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm md:text-base text-slate-500 mb-6 leading-relaxed max-w-lg font-medium truncate w-full"
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
        className="group relative block bg-white rounded-sm shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden transition-all duration-300"
      >
        <div className="relative w-full aspect-[4/5] bg-slate-50 overflow-hidden">
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

        <div className="p-4 bg-white relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
            className="w-full text-center"
          >
            <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate w-full px-1">
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
      validCategorySlides.some((slide) => slide.category?._id === cat._id),
    );

    // Map cats to include the image from the first slide if available
    const catsWithImage = filteredCats.map((cat) => {
      const slide = validCategorySlides.find(
        (s) => s.category?._id === cat._id,
      );
      return {
        ...cat,
        imageUrl: slide?.images?.[0] || "",
      };
    });

    if (part === "1") return catsWithImage.slice(0, 5);
    if (part === "2") return catsWithImage.slice(5, 10);
    return catsWithImage;
  }, [categories, validCategorySlides, part]);

  const slidesToRender = useMemo(() => {
    return categoriesWithContent
      .map((cat) => {
        const slide = validCategorySlides.find(
          (s) => s.category?._id === cat._id,
        );
        return slide;
      })
      .filter(Boolean);
  }, [categoriesWithContent, validCategorySlides]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setSelectedIndex((prevIndex) => {
        let nextIndex = prevIndex + newDirection;
        if (nextIndex < 0) nextIndex = slidesToRender.length - 1;
        if (nextIndex >= slidesToRender.length) nextIndex = 0;
        return nextIndex;
      });
    },
    [slidesToRender.length],
  );

  const scrollTo = useCallback(
    (index: number) => {
      setDirection(index > selectedIndex ? 1 : -1);
      setSelectedIndex(index);
    },
    [selectedIndex],
  );

  useEffect(() => {
    dispatch(fetchPublicCategories());
    dispatch(fetchPublicCategorySlides());
  }, [dispatch]);

  if (status !== "loading" && categoriesWithContent.length === 0) return null;

  return (
    <section className={`py-4 sm:py-12 bg-slate-50 overflow-x-hidden pb-12 sm:pb-20 ${part === "1" ? "mt-10" : ""}`}>
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

        <div className="relative h-[450px] lg:h-[750px] overflow-visible perspective-[1200px]">
          {/* Static Background Stack - Chunks at the back */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {slidesToRender.length > 1 && (
              <div
                className="absolute inset-0 transition-all duration-700 ease-out pointer-events-none"
                style={{
                  transform: `translateY(-20px) scale(0.96)`,
                  opacity: 0.4,
                  zIndex: 10,
                  filter: "blur(1px)",
                }}
              >
                <div className="hidden lg:block h-full">
                  <CategoryHeroCard
                    slide={
                      slidesToRender[
                        (selectedIndex + 1) % slidesToRender.length
                      ]
                    }
                    isActive={false}
                  />
                </div>
                <div className="lg:hidden h-full">
                  <MobileCategoryCard
                    slide={
                      slidesToRender[
                        (selectedIndex + 1) % slidesToRender.length
                      ]
                    }
                    isActive={false}
                  />
                </div>
              </div>
            )}
            {slidesToRender.length > 2 && (
              <div
                className="absolute inset-0 h-[460px] lg:h-full transition-all duration-700 ease-out pointer-events-none"
                style={{
                  transform: `translateY(-40px) scale(0.92)`,
                  opacity: 0.2,
                  zIndex: 5,
                  filter: "blur(2px)",
                }}
              >
                <div className="hidden lg:block h-full">
                  <CategoryHeroCard
                    slide={
                      slidesToRender[
                        (selectedIndex + 2) % slidesToRender.length
                      ]
                    }
                    isActive={false}
                  />
                </div>
                <div className="lg:hidden h-full">
                  <MobileCategoryCard
                    slide={
                      slidesToRender[
                        (selectedIndex + 2) % slidesToRender.length
                      ]
                    }
                    isActive={false}
                  />
                </div>
              </div>
            )}
          </div>

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={selectedIndex}
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  scale: direction > 0 ? 0.96 : 1.1,
                  y: direction > 0 ? -20 : 0,
                  x: direction > 0 ? 0 : "100%",
                  opacity: direction > 0 ? 0.4 : 0,
                  zIndex: 50,
                  filter: direction > 0 ? "blur(1px)" : "blur(0px)",
                }),
                center: {
                  scale: 1,
                  y: 0,
                  x: 0,
                  zIndex: 50,
                  opacity: 1,
                  filter: "blur(0px)",
                },
                exit: (direction: number) => ({
                  x: direction > 0 ? "-100%" : "100%",
                  opacity: 0,
                  zIndex: 100,
                  rotate: direction > 0 ? -15 : 15,
                  scale: direction > 0 ? 1 : 0.95,
                  transition: { duration: 0.4 },
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe =
                  Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                if (swipe) {
                  paginate(offset.x > 0 ? -1 : 1);
                }
              }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                y: { type: "spring", stiffness: 300, damping: 30 },
                scale: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="absolute inset-x-0 top-0 w-full h-[460px] lg:h-full"
            >
              {status === "loading" ? (
                <div className="w-full h-full">
                  <div className="hidden lg:block h-full">
                    <DesktopSkeletonLoader />
                  </div>
                  <div className="lg:hidden h-full">
                    <MobileSkeletonLoader />
                  </div>
                </div>
              ) : (
                slidesToRender[selectedIndex] && (
                  <div className="w-full h-full">
                    <div className="hidden lg:block h-full">
                      <CategoryHeroCard
                        slide={slidesToRender[selectedIndex]}
                        isActive={true}
                      />
                    </div>
                    <div className="lg:hidden h-full">
                      <MobileCategoryCard
                        slide={slidesToRender[selectedIndex]}
                        isActive={true}
                      />
                    </div>
                  </div>
                )
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {slidesToRender.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-slate-900 border border-white/20 hidden lg:flex"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-slate-900 border border-white/20 hidden lg:flex"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              <div className="absolute -bottom-1 lg:-bottom-10 left-0 right-0 flex justify-center gap-3 z-30">
                {slidesToRender.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollTo(idx)}
                    className={`transition-all duration-500 rounded-full ${
                      idx === selectedIndex
                        ? "w-10 h-2 bg-[#176FC0] shadow-[0_0_10px_rgba(23,111,192,0.3)]"
                        : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
