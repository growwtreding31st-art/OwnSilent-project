"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BannerSegment() {
  const { t } = useLanguage();

  return (
    <section className="relative py-8 sm:py-16 md:py-24 px-4 sm:px-12 overflow-hidden bg-[#f0f8ff]">
      {/* Abstract Background Shapes (Light Mode) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] sm:w-[50%] aspect-square rounded-full bg-gradient-to-br from-blue-200/50 to-transparent blur-[60px] sm:blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[80%] sm:w-[50%] aspect-square rounded-full bg-gradient-to-br from-blue-100/40 to-transparent blur-[80px] sm:blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="backdrop-blur-3xl bg-white/40 border border-white/60 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,120,255,0.06)]">
          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4 sm:mb-6"
            >
              <Sparkles size={12} className="text-blue-600 sm:w-3.5 sm:h-3.5" />
              <span className="text-[9px] sm:text-[11px] font-black tracking-[0.2em] text-blue-600 uppercase">
                {t("showcase.series") || "High Performance Series"}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4 sm:mb-6"
            >
              {t("home.banner.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 sm:mb-10"
            >
              {t("home.banner.desc")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex justify-center lg:justify-start"
            >
              <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-slate-950 text-white px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-sm uppercase tracking-widest overflow-hidden transition-all hover:pr-12 shadow-[0_10px_40px_rgba(0,0,0,0.15)] active:scale-95 w-full sm:w-auto"
              >
                <span className="relative z-10">{t("home.banner.btn")}</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform group-hover:translate-x-1 sm:w-4 sm:h-4"
                />

                {/* Button Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{ translateX: ["100%", "-100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Car Image */}
          <div className="flex-1 w-full relative group/img">
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[320px] sm:max-w-[500px] lg:max-w-none mx-auto aspect-[16/10] lg:aspect-square"
            >
              <Image
                src="/images/home/slider1.png"
                alt="Premium Performance Car"
                fill
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] scale-110 sm:scale-100 group-hover/img:scale-105 transition-transform duration-700"
                priority
              />

              {/* Image Glow */}
              <div className="absolute inset-0 bg-blue-100/40 blur-[40px] sm:blur-[80px] rounded-full z-[-1]" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Border Detail */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent via-blue-200/40 to-transparent opacity-50" />
    </section>
  );
}
