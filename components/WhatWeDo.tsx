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
    <section className="relative bg-gradient-to-b from-white via-slate-50/30 to-white py-8 sm:py-10 lg:py-12 overflow-hidden">
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
          className="text-center max-w-3xl mx-auto mb-8 lg:mb-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 shadow-lg shadow-blue-500/10 mb-3"
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

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mb-3 leading-tight">
            {t("whatWeDo.title")}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85]">
                {t("whatWeDo.titleHighlight")}
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
            {t("whatWeDo.subtitle")}
          </p>
        </motion.div>

        {/* Enhanced Features Grid - 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${feature.glowColor}, transparent 70%)`,
                }}
              />

              {/* Card - Compact */}
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
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

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Enhanced Icon - Compact */}
                  <motion.div
                    className="mb-3"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${feature.iconBg} text-white shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-500`}
                    >
                      <feature.icon
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        strokeWidth={2}
                      />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-black text-slate-900 mb-2 tracking-tight group-hover:text-[#176FC0] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description - Hidden on very small screens if needed, or small text */}
                  <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
