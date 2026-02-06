"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function PremiumPartsCategories() {
  const { t } = useLanguage();

  // Using the same category structure as Footer
  const categories = [
    {
      title: t("footer.cat.engine"),
      image: "/images/home/Parts-2.jpg",
      link: "/shop?category=engine",
      accent: "from-blue-500 to-cyan-500",
    },
    {
      title: t("footer.cat.suspension"),
      image: "/images/home/Parts-3.jpg",
      link: "/shop?category=suspension",
      accent: "from-indigo-500 to-blue-500",
    },
    {
      title: t("footer.cat.brakes"),
      image: "/images/home/Part-4.jpg",
      link: "/shop?category=brakes",
      accent: "from-sky-500 to-indigo-500",
    },
    {
      title: t("footer.cat.exhaust"),
      image: "/images/home/Parts-5.jpg",
      link: "/shop?category=exhaust",
      accent: "from-cyan-500 to-blue-500",
    },
    {
      title: t("footer.cat.body"),
      image: "/images/home/Parts-6.jpg",
      link: "/shop?category=body-kits",
      accent: "from-blue-600 to-indigo-600",
    },
    {
      title: t("footer.cat.lighting"),
      image: "/images/home/Parts-7.jpg",
      link: "/shop?category=lighting",
      accent: "from-indigo-600 to-purple-600",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/50 to-white py-8 sm:py-10 lg:py-12 overflow-hidden">
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
          className="text-center max-w-3xl mx-auto mb-6 lg:mb-8"
        >
          <motion.div
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
          </motion.div>

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

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {t("categories.subtitle")}
          </p>
        </motion.div>

        {/* Enhanced Categories Grid - 3 cols mobile (2 rows), 6 cols desktop (1 row) */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} index={index} />
          ))}
        </div>

        {/* Enhanced View All Button - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10"
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

// Separate component for 3D tilt effect - Compact Version
function CategoryCard({ category, index }: { category: any; index: number }) {
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
      href={category.link}
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
          src={category.image}
          alt={category.title}
          fill
          quality={60}
          sizes="(max-width: 768px) 33vw, 16vw"
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
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.accent}`}
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
            className="text-xs sm:text-sm font-black text-white tracking-tight uppercase leading-tight"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {category.title}
          </motion.h3>

          {/* Enhanced CTA Icon - Smaller */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 45 }}
            transition={{ type: "spring", stiffness: 400 }}
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${category.accent} backdrop-blur-sm flex items-center justify-center shadow-lg`}
          >
            <ArrowRight
              className="w-3 h-3 sm:w-4 sm:h-4 text-white"
              strokeWidth={2.5}
            />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}
