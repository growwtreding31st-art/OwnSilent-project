"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Truck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function HowWeWork() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: Search,
      title: t("howWeWork.step1.title"),
      description: t("howWeWork.step1.desc"),
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      number: "02",
      icon: ShoppingCart,
      title: t("howWeWork.step2.title"),
      description: t("howWeWork.step2.desc"),
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50",
    },
    {
      number: "03",
      icon: Truck,
      title: t("howWeWork.step3.title"),
      description: t("howWeWork.step3.desc"),
      gradient: "from-sky-500 to-indigo-500",
      bgGradient: "from-sky-50 to-indigo-50",
    },
    {
      number: "04",
      icon: CheckCircle2,
      title: t("howWeWork.step4.title"),
      description: t("howWeWork.step4.desc"),
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/30 to-white py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
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
            <Sparkles className="w-3.5 h-3.5 text-[#176FC0]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#176FC0]">
              {t("howWeWork.badge")}
            </span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            {t("howWeWork.title")}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85]">
                {t("howWeWork.titleHighlight")}
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
            {t("howWeWork.subtitle")}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-20 left-[calc(100%+0.5rem)] w-6 h-0.5 bg-gradient-to-r from-[#176FC0] to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                />
              )}

              {/* Step Card */}
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative h-full bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(23,111,192,0.15)] transition-all duration-500 overflow-hidden"
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, rgba(23,111,192,0.2), transparent 70%)`,
                  }}
                />

                {/* Animated Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Number Badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-black text-2xl text-slate-300 group-hover:text-[#176FC0] transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="mb-6"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} text-white shadow-lg shadow-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-500`}
                    >
                      <step.icon className="w-8 h-8" strokeWidth={2} />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight group-hover:text-[#176FC0] transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {step.description}
                  </p>

                  {/* Progress Indicator */}
                  <motion.div
                    className="mt-6 h-1 bg-slate-100 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={`h-full bg-gradient-to-r ${step.gradient}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </motion.div>
                </div>

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
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
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-3xl p-8 lg:p-10 border border-blue-100/50 shadow-xl"
        >
          <motion.h3
            className="text-xl sm:text-2xl font-black text-slate-900 mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("howWeWork.cta.text")}
          </motion.h3>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#176FC0] to-[#0F4C85] text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:shadow-3xl hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#0F4C85] to-[#176FC0]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">{t("howWeWork.cta.button")}</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
