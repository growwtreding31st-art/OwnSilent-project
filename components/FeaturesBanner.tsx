"use client";

import React from "react";
import {
  ArrowRight,
  Cpu,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  Shield,
  Globe2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function FeaturesBanner() {
  const { t } = useLanguage();
  const workFeatures = [
    {
      icon: Cpu,
      title: t("feat.w.innovate.t"),
      description: t("feat.w.innovate.d"),
    },
    {
      icon: Globe2,
      title: t("feat.w.global.t"),
      description: t("feat.w.global.d"),
    },
    {
      icon: TrendingUp,
      title: t("feat.w.growth.t"),
      description: t("feat.w.growth.d"),
    },
    {
      icon: Users,
      title: t("feat.w.roles.t"),
      description: t("feat.w.roles.d"),
    },
    {
      icon: Zap,
      title: t("feat.w.impact.t"),
      description: t("feat.w.impact.d"),
    },
  ];

  return (
    <section className="relative bg-white py-8 sm:py-10 lg:py-12 overflow-hidden">
      {/* Dynamic Background System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent" />

        <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-blue-50/50 rounded-full blur-[60px] sm:blur-[80px] lg:blur-[100px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-indigo-50/40 rounded-full blur-[60px] sm:blur-[80px] lg:blur-[100px] translate-y-1/2 -translate-x-1/4" />

        {/* Mesh Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* LIGHT MODE CORPORATE SECTION */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/50 p-6 sm:p-8 lg:p-12 overflow-hidden border border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] sm:shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          {/* Animated Float Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-5 right-5 w-16 h-16 sm:w-20 sm:h-20 bg-[#176FC0]/10 rounded-full blur-xl sm:blur-2xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="absolute bottom-5 left-5 w-20 h-20 sm:w-24 sm:h-24 bg-indigo-500/10 rounded-full blur-xl sm:blur-2xl"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 relative z-10">
            {/* Header Content */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#176FC0]/5 border border-[#176FC0]/10 text-[#176FC0] mb-4">
                  <Shield size={10} className="sm:w-3 sm:h-3" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-none">
                    Global Network
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                  {t("feat.work.t")}{" "}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] to-[#0F4C85] mt-1">
                    {t("feat.work.h")}
                  </span>
                </h2>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                  {t("feat.work.d")}
                </p>

                <div className="flex">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:sales@ownsilent.international"
                    className="group flex items-center justify-center w-full sm:w-auto gap-3 sm:gap-4 bg-slate-900 text-white rounded-xl px-5 py-3 text-xs font-black uppercase tracking-wider shadow-xl shadow-slate-950/20 hover:bg-[#176FC0] transition-colors"
                  >
                    <span>{t("feat.contact")}</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Features Grid - 2 cols mobile, fits in one line visually if packed well */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {workFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white border border-slate-100 p-4 sm:p-5 rounded-xl transition-all duration-500 hover:shadow-lg hover:border-[#176FC0]/20 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#176FC0]/5 flex items-center justify-center text-[#176FC0] group-hover:bg-[#176FC0] group-hover:text-white transition-all duration-500">
                        <feature.icon
                          size={18}
                          className="sm:w-5 sm:h-5"
                          strokeWidth={1.5}
                        />
                      </div>
                      <CheckCircle2
                        size={14}
                        className="text-slate-200 group-hover:text-[#176FC0] transition-colors"
                      />
                    </div>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 mb-1 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed font-medium line-clamp-2">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}

                {/* Visual Performance Accent - Compact */}
                <div className="flex group relative bg-white border-2 border-dashed border-[#176FC0]/20 p-4 sm:p-5 rounded-xl flex-col justify-center items-center text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 border-2 border-[#176FC0]/5 rounded-xl pointer-events-none"
                  />
                  <Zap
                    size={20}
                    className="text-[#176FC0] mb-2 animate-bounce-slow"
                  />
                  <p className="text-slate-900 font-black uppercase tracking-widest text-[8px] sm:text-[9px]">
                    Innovation
                  </p>
                  <p className="text-slate-400 text-[8px] mt-1 font-bold italic">
                    Driven by Excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
