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
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  // Color Theme from Login Page:
  // Primary Blue: #176FC0
  // Darker Blue: #0F4C85
  // Gradient Mid: #1461A8

  const specializations = [
    {
      icon: Disc3,
      title: t("hero.s1.t"),
      description: t("hero.s1.d"),
      bg: "bg-blue-100/70", // Using a lighter, consistent blue
      iconColor: "text-[#176FC0]",
    },
    {
      icon: Layers,
      title: t("hero.s2.t"),
      description: t("hero.s2.d"),
      bg: "bg-[#0F4C85]/10", // Using the darker theme blue with opacity
      iconColor: "text-[#0F4C85]",
    },
    {
      icon: Car,
      title: t("hero.s3.t"),
      description: t("hero.s3.d"),
      bg: "bg-slate-100", // Slate is a neutral color, kept as is
      iconColor: "text-slate-700",
    },
  ];

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-white pt-16 pb-8 sm:pt-24 sm:pb-20 lg:py-20 mt-6"
    >
      <div className="absolute inset-0 z-0">
        {/* Using the same blur colors as login page for consistency */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm w-fit mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600">
                Global Automotive Partner
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
              {t("hero.welcome")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] to-[#0F4C85]">
                Own Silent International Limited
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-10">
              {t("hero.desc")}
            </p>

            {/* CHANGE 1: Hide specialization cards on mobile (hidden) and show on small screens and up (sm:grid) */}
            <div className="hidden sm:grid gap-5">
              {specializations.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-blue-200/50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div
                    className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg ${item.bg} ${item.iconColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3
                      className={`text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#176FC0] transition-colors`}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHANGE 2: Hide this entire right column on mobile/tablet (hidden) and show on large screens (lg:block) */}
          <div className="hidden lg:block lg:col-span-5 lg:pl-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#176FC0] to-[#0F4C85] rounded-2xl opacity-20 blur-lg" />

              <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                  <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {t("hero.box.t")}
                    </h2>
                    <span className="text-xs font-medium text-[#176FC0] uppercase tracking-wide">
                      Premium Service
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {t("hero.box.d")}
                </p>

                <ul className="space-y-3 mb-8">
                  {[t("hero.list1"), t("hero.list2"), t("hero.list3")].map(
                    (text, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <Check className="w-5 h-5 text-[#176FC0]" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {text}
                        </span>
                      </li>
                    )
                  )}
                </ul>

                <a
                  href="mailto:sales@ownsilent.international"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-[#176FC0] to-[#1461A8] hover:to-[#0F4C85] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200"
                >
                  Contact Our Team
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <Globe2 className="w-3 h-3" />
                  <p>{t("hero.footer")}</p>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-5 -z-10 hidden lg:block">
                <div className="w-24 h-24 bg-[url('/images/misc/dots.svg')] opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
