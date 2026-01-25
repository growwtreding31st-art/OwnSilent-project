"use client";

import React from "react";
import {
  Disc3,
  Layers,
  Car,
  Check,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Sparkles,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { t } = useLanguage();

  const specializations = [
    {
      icon: Disc3,
      title: t("hero.s1.t"),
      description: t("hero.s1.d"),
      bg: "bg-blue-50",
      iconColor: "text-[#176FC0]",
    },
    {
      icon: Layers,
      title: t("hero.s2.t"),
      description: t("hero.s2.d"),
      bg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      icon: Car,
      title: t("hero.s3.t"),
      description: t("hero.s3.d"),
      bg: "bg-slate-50",
      iconColor: "text-slate-700",
    },
  ];

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-white pt-16 pb-8 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24 mt-4"
    >
      {/* Premium Background System */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px]" />

        {/* Animated Mesh Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Content Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#176FC0]">
                Global Automotive Partner
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6"
            >
              {t("hero.welcome")}{" "}
              <span className="relative inline-block mt-1">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85]">
                  Own Silent International Limited
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8 font-medium"
            >
              {t("hero.desc")}
            </motion.p>

            {/* Specialization Cards */}
            <div className="grid sm:grid-cols-1 gap-4 mb-8">
              {specializations.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-5 p-4 rounded-xl bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(23,111,192,0.08)] transition-all duration-300"
                >
                  <div
                    className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg ${item.bg} ${item.iconColor} group-hover:bg-[#176FC0] group-hover:text-white transition-all duration-500`}
                  >
                    <item.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#176FC0] transition-colors mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="mailto:sales@ownsilent.international"
                className="group relative inline-flex items-center gap-2.5 bg-slate-950 text-white px-7 py-3.5 rounded-lg font-bold text-[13px] uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
              >
                <span className="relative z-10">Contact Our Team</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#176FC0] to-[#0F4C85] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <div className="flex items-center gap-2.5 px-5 py-3.5 rounded-lg border border-slate-200 bg-white/50 backdrop-blur-sm text-slate-600 font-bold text-[13px]">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                Certified Quality
              </div>
            </motion.div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Main Decorative Glow */}
              <div className="absolute -inset-3 bg-gradient-to-br from-[#176FC0] to-indigo-600 rounded-[2rem] opacity-15 blur-xl animate-pulse" />

              <div className="relative backdrop-blur-3xl bg-white/75 border border-white/60 rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,120,255,0.06)] overflow-hidden">
                {/* HUD Elements */}
                <div className="absolute top-6 right-6 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 rounded-full bg-[#176FC0]"
                      style={{ opacity: 1 - i * 0.3 }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3.5 mb-6 pb-6 border-b border-slate-200/50">
                  <div className="h-12 w-12 rounded-xl bg-slate-950 flex items-center justify-center shadow-md transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      {t("hero.box.t")}
                    </h2>
                    <span className="text-[9px] font-black text-[#176FC0] uppercase tracking-[0.2em] flex items-center gap-1.5">
                      <span className="w-1.5 h-[1px] bg-[#176FC0]" />
                      Top Performance
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium italic">
                  "{t("hero.box.d")}"
                </p>

                <ul className="space-y-3.5 mb-8">
                  {[t("hero.list1"), t("hero.list2"), t("hero.list3")].map(
                    (text, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-3 group/item"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center group-hover/item:bg-[#176FC0] transition-colors duration-300">
                          <Check className="w-3 h-3 text-[#176FC0] group-hover/item:text-white" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 tracking-tight">
                          {text}
                        </span>
                      </motion.li>
                    ),
                  )}
                </ul>

                <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full border border-white shadow-sm overflow-hidden flex items-center justify-center bg-blue-50 text-[#176FC0]">
                      <Globe2 className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        Global Support
                      </p>
                      <p className="text-[11px] font-bold text-slate-900">
                        {t("hero.footer")}
                      </p>
                    </div>
                  </div>
                  <Sparkles className="w-4.5 h-4.5 text-[#176FC0] opacity-40" />
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:8px_8px] opacity-30" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
