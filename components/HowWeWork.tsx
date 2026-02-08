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
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

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
      href: "/how-it-works/find-your-part",
    },
    {
      number: "02",
      icon: ShoppingCart,
      title: t("howWeWork.step2.title"),
      description: t("howWeWork.step2.desc"),
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50",
      href: "/how-it-works/ordering-process",
    },
    {
      number: "03",
      icon: Truck,
      title: t("howWeWork.step3.title"),
      description: t("howWeWork.step3.desc"),
      gradient: "from-sky-500 to-indigo-500",
      bgGradient: "from-sky-50 to-indigo-50",
      href: "/how-it-works/fast-shipping",
    },
    {
      number: "04",
      icon: CheckCircle2,
      title: t("howWeWork.step4.title"),
      description: t("howWeWork.step4.desc"),
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50",
      href: "/how-it-works/quality-delivery",
    },
  ];

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

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/30 to-white py-4 sm:py-6 lg:py-8 overflow-hidden">
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
          className="text-center max-w-3xl mx-auto mb-6 lg:mb-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 shadow-lg shadow-blue-500/10 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#176FC0]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#176FC0]">
              {t("howWeWork.badge")}
            </span>
          </motion.div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mb-3 leading-tight">
            {t("howWeWork.title")}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85]">
                {t("howWeWork.titleHighlight")}
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
            {t("howWeWork.subtitle")}
          </p>
        </motion.div>

        {/* Mobile View Slider */}
        <div className="lg:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {steps.map((step, index) => (
                <div key={index} className="flex-[0_0_85%] min-w-0 px-2">
                  <Link href={step.href} className="block h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                      }}
                      className="group relative h-full"
                    >
                      {/* Step Card */}
                      <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
                        {/* Number Badge */}
                        <div className="absolute top-4 right-4 text-xl font-black text-slate-100 group-hover:text-[#176FC0] transition-colors duration-300">
                          {step.number}
                        </div>

                        {/* Animated Background Gradient */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        />

                        <div className="relative z-10 flex flex-col items-center text-center">
                          <motion.div className="mb-4">
                            <div
                              className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-lg shadow-blue-500/30 group-hover:shadow-xl transition-all duration-500`}
                            >
                              <step.icon className="w-7 h-7" strokeWidth={2} />
                            </div>
                          </motion.div>
                          <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">
                            {step.title}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-1 mt-8">
            {steps.map((_, idx) => (
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
        </div>

        {/* Desktop View Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-4">
          {steps.map((step, index) => (
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
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-200 to-transparent z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                />
              )}

              {/* Step Card */}
              <Link href={step.href} className="block group relative h-full">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden z-10"
                >
                  <motion.div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, rgba(23,111,192,0.2), transparent 70%)`,
                    }}
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="absolute top-2 right-2 text-[10px] font-black text-slate-200 group-hover:text-[#176FC0] transition-colors duration-300">
                      {step.number}
                    </div>

                    <motion.div
                      className="mb-3"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${step.gradient} text-white shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-500`}
                      >
                        <step.icon
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          strokeWidth={2}
                        />
                      </div>
                    </motion.div>

                    <h3 className="text-sm sm:text-base font-black text-slate-900 mb-2 tracking-tight group-hover:text-[#176FC0] transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {step.description}
                    </p>

                    <motion.div
                      className="mt-3 h-0.5 w-full bg-slate-100 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${step.gradient}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.15 + 0.3,
                          duration: 0.8,
                        }}
                        style={{ transformOrigin: "left" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
