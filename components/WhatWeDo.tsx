"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench, Shield, Zap, Globe2, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhatWeDo() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Wrench,
      title: t("whatWeDo.feature1.title"),
      description: t("whatWeDo.feature1.desc"),
      gradient: "from-blue-500/10 via-cyan-500/10 to-blue-500/10",
      iconBg: "from-blue-500 to-cyan-500",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: Shield,
      title: t("whatWeDo.feature2.title"),
      description: t("whatWeDo.feature2.desc"),
      gradient: "from-indigo-500/10 via-blue-500/10 to-indigo-500/10",
      iconBg: "from-indigo-500 to-blue-500",
      glowColor: "rgba(99, 102, 241, 0.3)",
    },
    {
      icon: Zap,
      title: t("whatWeDo.feature3.title"),
      description: t("whatWeDo.feature3.desc"),
      gradient: "from-sky-500/10 via-indigo-500/10 to-sky-500/10",
      iconBg: "from-sky-500 to-indigo-500",
      glowColor: "rgba(14, 165, 233, 0.3)",
    },
    {
      icon: Globe2,
      title: t("whatWeDo.feature4.title"),
      description: t("whatWeDo.feature4.desc"),
      gradient: "from-cyan-500/10 via-blue-500/10 to-cyan-500/10",
      iconBg: "from-cyan-500 to-blue-500",
      glowColor: "rgba(6, 182, 212, 0.3)",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/30 to-white py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
        />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 shadow-lg shadow-blue-500/10 mb-4"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="relative flex h-2 w-2"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </motion.span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#176FC0]">
              {t("whatWeDo.badge")}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#176FC0]" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            {t("whatWeDo.title")}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85]">
                {t("whatWeDo.titleHighlight")}
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

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {t("whatWeDo.subtitle")}
          </p>
        </motion.div>

        {/* Enhanced Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${feature.glowColor}, transparent 70%)`,
                }}
              />

              {/* Card */}
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 border border-slate-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(23,111,192,0.15)] transition-all duration-500 overflow-hidden">
                {/* Animated Gradient Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500/5 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Enhanced Icon */}
                  <motion.div
                    className="mb-4 sm:mb-5 lg:mb-6"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br ${feature.iconBg} text-white shadow-lg shadow-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-500`}
                    >
                      <feature.icon
                        className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                        strokeWidth={2}
                      />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tight group-hover:text-[#176FC0] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>

                  {/* Animated Arrow */}
                  <motion.div
                    className="mt-4 sm:mt-6 flex items-center gap-2 text-[#176FC0] font-bold text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <span>{t("common.learnMore")}</span>
                    <motion.svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </motion.svg>
                  </motion.div>
                </div>

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  initial={false}
                  animate={{
                    background: [
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      "linear-gradient(90deg, transparent, transparent, transparent)",
                    ],
                    backgroundPosition: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
