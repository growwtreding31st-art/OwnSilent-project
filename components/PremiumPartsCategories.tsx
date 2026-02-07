"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchPublicParts } from "@/lib/redux/productSlice";

export default function PremiumPartsCategories() {
  const { t } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  const { parts, status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchPublicParts({ limit: 5 }));
  }, [dispatch]);

  // Get first 10 products
  const displayProducts = parts.slice(0, 5);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  if (status === "loading") {
    return (
      <section className="relative bg-gradient-to-b from-white via-slate-50/50 to-white py-8 sm:py-10 lg:py-12">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center text-slate-600">Loading products...</div>
        </div>
      </section>
    );
  }

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/50 to-white py-4 sm:py-10 lg:py-12 overflow-hidden">
      {/* Enhanced Background */}
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-slate-50/50 pointer-events-none" />

      <div className="container mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 lg:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            {t("categories.title") || "Choose From Premium Parts"}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85]">
                {t("categories.titleHighlight") || "For Your Car"}
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>
        </motion.div>

        {/* Mobile View: Simple Slider */}
        <div className="lg:hidden mt-0 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {displayProducts.map((product: any, idx: number) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 px-2 group">
                <MobileProductStackCard
                  product={product}
                  isActive={idx === activeIndex}
                />
              </div>
            ))}
          </div>

          {/* Dots handles for mobile */}
          <div className="flex justify-center gap-2 mt-8">
            {displayProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? "w-8 h-1.5 bg-[#176FC0]"
                    : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View: Original Grid */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4">
          {displayProducts.map((product: any, index: number) => (
            <ProductCard
              key={product._id || index}
              product={product}
              index={index}
            />
          ))}
        </div>

        {/* Enhanced View All Button - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-1 sm:mt-10"
        >
          <motion.a
            href="/shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest overflow-hidden shadow-xl shadow-slate-900/30"
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#176FC0] to-[#0F4C85]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />

            <span className="relative z-10">{t("categories.viewAll")}</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Mobile Stack Card for the 3D Deck
function MobileProductStackCard({
  product,
  isActive,
}: {
  product: any;
  isActive: boolean;
}) {
  if (!product) return null;
  const productLink = `/product/${product.slug || product._id}`;

  return (
    <motion.a
      href={productLink}
      className="group relative block w-full h-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300"
    >
      <div className="relative w-full h-[360px] lg:aspect-[4/5] bg-slate-50 overflow-hidden">
        <motion.div
          className="h-full w-full"
          animate={{ scale: isActive ? 1 : 1.1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={product.images?.[0] || "/images/placeholder.jpg"}
            alt={product.title || "Product"}
            fill
            className="object-cover"
            priority={isActive}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </div>

      <div className="p-3 pb-1.5 bg-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.2 }}
          className="w-full text-center"
        >
          <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight uppercase tracking-tight truncate w-full px-1">
            {product.title || product.name}
          </h3>
        </motion.div>
      </div>
    </motion.a>
  );
}

// Product Card Component with 3D tilt effect
function ProductCard({ product, index }: { product: any; index: number }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={`/product/${product.slug || product._id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative block overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-700"
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"
        style={{
          background: `linear-gradient(135deg, rgba(23,111,192,0.3), rgba(14,97,168,0.2))`,
        }}
      />

      {/* Image Container with 3D depth - Square Aspect Ratio for Compactness */}
      <div
        className="relative aspect-square overflow-hidden bg-slate-100"
        style={{ transform: "translateZ(20px)" }}
      >
        <Image
          src={product.images?.[0] || "/images/placeholder.jpg"}
          alt={product.title || "Product"}
          fill
          quality={40}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated Accent Line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Content with 3D depth - Compact Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 sm:p-4"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="flex flex-col items-start gap-2">
          <motion.h3
            className="text-[10px] sm:text-xs font-black text-white tracking-tight uppercase leading-tight truncate w-full"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {product.title || product.name || "Product"}
          </motion.h3>
        </div>
      </div>
    </motion.a>
  );
}
