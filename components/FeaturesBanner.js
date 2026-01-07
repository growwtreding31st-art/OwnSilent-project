"use client";
import React from "react";
import {
  Factory as LucideFactory,
  Lock as LucideLock,
  Layers as LucideLayers,
  Maximize as LucideMaximize,
  Flag as LucideFlag,
  Palette as LucidePalette,
  Sparkles as LucideSparkles,
  Globe2 as LucideGlobe2,
  ShieldCheck as LucideShieldCheck,
  ArrowRight as LucideArrowRight,
  Cpu as LucideCpu,
  TrendingUp as LucideTrendingUp,
  Users as LucideUsers,
  Zap as LucideZap,
  CheckCircle2 as LucideCheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FeaturesBanner() {
  const { t } = useLanguage();

  const trustFeatures = [
    { icon: LucideGlobe2, title: "Worldwide Shipping" },
    { icon: LucideFlag, title: "Track-Tested Performance" },
    { icon: LucideFactory, title: "In-House Manufacturing" },
    { icon: LucideShieldCheck, title: "Premium OEM-Grade Materials" },
    { icon: LucideLock, title: "Secure Payments" },
  ];

  const engineeringFeatures = [
    {
      icon: LucideLayers,
      title: "In-house Carbon Manufacturing",
      description:
        "Complete control over the entire process, ensuring unparalleled quality and perfect weave consistency.",
    },
    {
      icon: LucideMaximize,
      title: "OEM-Level Fitment Precision",
      description:
        "Our parts integrate seamlessly with your vehicle's original lines, guaranteed by 3D scanning and precision molding.",
    },
    {
      icon: LucideFlag,
      title: "Track-Proven Performance",
      description:
        "Rigorously tested on demanding circuits to validate performance and durability under extreme conditions.",
    },
    {
      icon: LucidePalette,
      title: "Bespoke Customization",
      description:
        "Tailor every detail, from carbon weave patterns to unique finishes, creating a truly one-of-a-kind statement.",
    },
    {
      icon: LucideGlobe2,
      title: "Global Logistics & Support",
      description:
        "Seamless and secure door-to-door shipping worldwide, with dedicated support to manage the entire process.",
    },
    {
      icon: LucideSparkles,
      title: "Impeccable Finishing Standards",
      description:
        "Each component is hand-finished with multi-layer clear coat for a deep, flawless gloss that exceeds luxury standards.",
    },
  ];

  const workFeatures = [
    {
      icon: LucideCpu,
      title: t("feat.w.innovate.t"),
      description: t("feat.w.innovate.d"),
    },
    {
      icon: LucideGlobe2,
      title: t("feat.w.global.t"),
      description: t("feat.w.global.d"),
    },
    {
      icon: LucideTrendingUp,
      title: t("feat.w.growth.t"),
      description: t("feat.w.growth.d"),
    },
    {
      icon: LucideUsers,
      title: t("feat.w.roles.t"),
      description: t("feat.w.roles.d"),
    },
    {
      icon: LucideZap,
      title: t("feat.w.impact.t"),
      description: t("feat.w.impact.d"),
    },
  ];

  return (
    <section className="relative bg-slate-50 py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 sm:mb-16 gap-6">
          <div className="max-w-3xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-4 mx-auto md:mx-0">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#176FC0]"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                Engineering Excellence
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              The Own Silent Difference:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] to-[#0F4C85]">
                The Art of Performance
              </span>
            </h2>
          </div>
          <p className="max-w-md text-slate-600 text-base sm:text-lg leading-relaxed md:text-right hidden sm:block">
            We merge cutting-edge technology with artisanal craftsmanship to
            create automotive components that are unparalleled in design and
            performance.
          </p>
        </div>
        <p className="text-slate-600 text-base leading-relaxed mb-12 sm:hidden text-center">
          We merge cutting-edge technology with artisanal craftsmanship to
          create automotive components that are unparalleled in design and
          performance.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 mb-16 border-t border-b border-slate-200/70 py-8">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#176FC0]/10 flex items-center justify-center">
                <feature.icon
                  className="w-5 h-5 text-[#176FC0]"
                  strokeWidth={2}
                />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {feature.title}
              </span>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineeringFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-2xl hover:shadow-[#176FC0]/10 hover:border-[#176FC0]/40 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-[80px] -mr-8 -mt-8 transition-all duration-500 group-hover:from-blue-100/70 group-hover:scale-110" />
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white border border-slate-100 text-slate-600 shadow-sm transition-all duration-300 group-hover:bg-[#176FC0] group-hover:text-white group-hover:border-[#176FC0]">
                  <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#176FC0] transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-16 border-t border-slate-200">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <span className="text-[#176FC0] font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 block">
                Corporate Culture
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 sm:mb-6">
                {t("feat.work.t")}{" "}
                <span className="block text-[#0F4C85] mt-1">
                  {t("feat.work.h")}
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8">
                {t("feat.work.d")}
              </p>

              <div className="hidden lg:block">
                <a
                  href="mailto:sales@ownsilent.international"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-[#176FC0] transition-colors group"
                >
                  <span className="border-b-2 border-slate-200 group-hover:border-[#176FC0] pb-0.5 transition-colors">
                    {t("feat.contact")}
                  </span>
                  <LucideArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 min-w-0">
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {workFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="group flex-shrink-0 w-[85vw] sm:w-auto snap-center bg-white p-6 sm:p-8 rounded-xl border border-slate-200 transition-all duration-300 hover:border-[#176FC0]/30 hover:shadow-xl hover:shadow-[#176FC0]/10 relative overflow-hidden h-full min-h-[220px]"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#176FC0] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-[#176FC0]/10 transition-colors">
                        <feature.icon
                          className="w-6 h-6 text-slate-700 group-hover:text-[#176FC0]"
                          strokeWidth={1.5}
                        />
                      </div>
                      <LucideCheckCircle2 className="w-5 h-5 text-slate-300 group-hover:text-[#176FC0] transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 w-full lg:hidden">
                <a
                  href="mailto:sales@ownsilent.international"
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold text-white bg-gradient-to-r from-[#176FC0] to-[#1461A8] hover:to-[#0F4C85] shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
                >
                  {t("feat.contact")}
                  <LucideArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}