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

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const paginate = React.useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setActiveIndex((prev) => {
        let next = prev + newDirection;
        if (next < 0) next = displayProducts.length - 1;
        if (next >= displayProducts.length) next = 0;
        return next;
      });
    },
    [displayProducts.length],
  );

  const scrollTo = React.useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex],
  );

  const activeProduct = displayProducts[activeIndex];

  if (!activeProduct && status !== "loading") return null;

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
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="container mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 lg:mb-8"
        >
          {/* <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-slate-50 to-blue-50 border border-blue-200/50 shadow-lg shadow-blue-500/10 mb-3"
          >
            <TrendingUp className="w-3 h-3 text-[#176FC0]" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#176FC0]">
              {t("categories.badge")}
            </span>
            <Sparkles className="w-3 h-3 text-[#176FC0]" />
          </motion.div> */}

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mb-3 leading-tight">
            {t("categories.title")}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85]">
                {t("categories.titleHighlight")}
              </span>
              <motion.div
                className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85] rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>

          {/* <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {t("categories.subtitle")}
          </p> */}
        </motion.div>

        {/* Mobile View: 3D Paginated Deck */}
        <div className="lg:hidden mt-0">
          <div className="relative h-[440px] overflow-visible perspective-[1200px]">
            {/* Static Background Stack - Chunks at the back */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {displayProducts.length > 1 && (
                <div
                  className="absolute inset-0 h-[410px] transition-all duration-700 ease-out pointer-events-none"
                  style={{
                    transform: `translateY(-20px) scale(0.96)`,
                    opacity: 0.4,
                    zIndex: 10,
                    filter: "blur(1px)",
                  }}
                >
                  <MobileProductStackCard
                    product={
                      displayProducts[
                        (activeIndex + 1) % displayProducts.length
                      ]
                    }
                    isActive={false}
                  />
                </div>
              )}
              {displayProducts.length > 2 && (
                <div
                  className="absolute inset-0 h-[410px] transition-all duration-700 ease-out pointer-events-none"
                  style={{
                    transform: `translateY(-40px) scale(0.92)`,
                    opacity: 0.2,
                    zIndex: 5,
                    filter: "blur(2px)",
                  }}
                >
                  <MobileProductStackCard
                    product={
                      displayProducts[
                        (activeIndex + 2) % displayProducts.length
                      ]
                    }
                    isActive={false}
                  />
                </div>
              )}
            </div>

            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
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
                className="absolute inset-x-0 top-0 w-full h-[410px]"
              >
                <MobileProductStackCard
                  product={displayProducts[activeIndex]}
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Handles */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-3 z-[150]">
              {displayProducts.slice(0, 5).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`transition-all duration-500 rounded-full ${
                    idx === activeIndex
                      ? "w-10 h-2 bg-[#176FC0] shadow-[0_0_10px_rgba(23,111,192,0.3)]"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
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
      <div className="relative w-full aspect-[4/5] bg-slate-50 overflow-hidden">
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
