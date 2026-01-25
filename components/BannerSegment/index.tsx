"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function BannerSegment() {
  const { t } = useLanguage();

  return (
    <section className="relative py-12 px-6 sm:px-12 overflow-hidden bg-slate-950">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] aspect-square rounded-full bg-gradient-to-br from-blue-600/30 to-transparent blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] aspect-square rounded-full bg-gradient-to-br from-slate-400/20 to-transparent blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] text-blue-300 uppercase">
                {t("showcase.series") || "High Performance Series"}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none mb-6"
            >
              {t("home.banner.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed"
            >
              {t("home.banner.desc")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/shop"
              className="group relative inline-flex items-center gap-3 bg-white text-slate-950 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:pr-12 shadow-[0_10px_40px_rgba(255,255,255,0.15)] active:scale-95"
            >
              <span className="relative z-10">{t("home.banner.btn")}</span>
              <ArrowRight
                size={18}
                className="relative z-10 transition-transform group-hover:translate-x-1"
              />

              {/* Button Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                animate={{ translateX: ["100%", "-100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Ticker Tape Style Detail */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </section>
  );
}
