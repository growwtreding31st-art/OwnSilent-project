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
    <section className="relative bg-gradient-to-b from-white via-slate-50/50 to-white py-12 sm:py-16 lg:py-20 overflow-hidden">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-50 to-blue-50 border border-blue-200/50 shadow-lg shadow-blue-500/10 mb-4"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#176FC0]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#176FC0]">
              {t("categories.badge")}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#176FC0]" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            {t("categories.title")}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85]">
                {t("categories.titleHighlight")}
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85] rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {t("categories.subtitle")}
          </p>
        </motion.div>

        {/* Enhanced Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} index={index} />
          ))}
        </div>

        {/* Enhanced View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="/shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest overflow-hidden shadow-2xl shadow-slate-900/30"
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
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Separate component for 3D tilt effect
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
      className="group relative block overflow-hidden rounded-3xl bg-white/50 backdrop-blur-sm border border-slate-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_80px_rgba(23,111,192,0.2)] transition-shadow duration-700"
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700"
        style={{
          background: `linear-gradient(135deg, rgba(23,111,192,0.3), rgba(14,97,168,0.2))`,
        }}
      />

      {/* Image Container with 3D depth */}
      <div
        className="relative aspect-[2/1] overflow-hidden bg-slate-100"
        style={{ transform: "translateZ(50px)" }}
      >
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated Accent Line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${category.accent}`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: "left" }}
        />

        {/* Particle Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ x: "50%", y: "50%", opacity: 0 }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content with 3D depth */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6"
        style={{ transform: "translateZ(75px)" }}
      >
        <div className="flex items-center justify-between">
          <motion.h3
            className="text-xl font-black text-white tracking-tight"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {category.title}
          </motion.h3>

          {/* Enhanced CTA Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 45 }}
            transition={{ type: "spring", stiffness: 400 }}
            className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${category.accent} backdrop-blur-sm flex items-center justify-center shadow-lg`}
          >
            <ArrowRight className="w-5 h-5 text-white" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-sm text-white/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          {t("common.exploreMore")} →
        </motion.p>
      </div>

      {/* Corner Decoration */}
      <motion.div
        className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-white/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: "translateZ(100px)" }}
      />

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        animate={{
          background: [
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            "linear-gradient(90deg, transparent, transparent, transparent)",
          ],
          backgroundPosition: ["-200%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </motion.a>
  );
}
