"use client";
import React from "react";
import { ShieldCheck, Truck, Users, ArrowRight, Play, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Color Theme from Login Page:
// Primary Blue: #176FC0
// Darker Blue: #0F4C85
// Gradient Mid: #1461A8

export default function AboutUs() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative bg-white py-12 sm:py-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Updated background blur color */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-slate-50/80 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-sm overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 group">
              <div className="absolute inset-0 bg-slate-900/10 transition-opacity duration-300 group-hover:bg-slate-900/0 z-10" />
              <video
                src="/images/home/about.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover aspect-[4/3] sm:aspect-video lg:aspect-[4/3] transform transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-xl ring-1 ring-white/50">
                  {/* Updated play icon color */}
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-[#176FC0] pl-1">
                    <Play fill="currentColor" className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-4 sm:-bottom-10 sm:-right-10 z-30 hidden sm:block">
              <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 max-w-[200px] animate-fade-in-up">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-3xl font-bold text-slate-900 leading-none mb-1">100%</p>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Client Satisfaction</p>
              </div>
            </div>
            
            {/* Updated blur color */}
            <div className="absolute -top-6 -left-6 z-0 w-32 h-32 bg-[#176FC0]/5 rounded-full blur-2xl" />
          </div>

          <div className="flex flex-col justify-center order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 w-fit mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                {/* Updated pinging dot color */}
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#176FC0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#176FC0]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                Who We Are
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.15]">
              {t("about.title")}{" "}
              {/* Updated heading gradient */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] to-[#0F4C85]">
                {t("about.titleHighlight")}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              {t("about.intro")}
            </p>
            
            {/* Updated mission quote box colors */}
            <div className="bg-[#176FC0]/10 border-l-4 border-[#176FC0] p-6 rounded-r-xl mb-10">
              <p className="text-lg font-medium text-slate-800 italic leading-relaxed">
                "{t("about.mission")}"
              </p>
            </div>

            <div className="space-y-4">
              <FeatureItem
                icon={<ShieldCheck className="h-6 w-6" strokeWidth={1.5} />}
                title={t("about.f.quality.title")}
                description={t("about.f.quality.desc")}
              />
              <FeatureItem
                icon={<Truck className="h-6 w-6" strokeWidth={1.5} />}
                title={t("about.f.shipping.title")}
                description={t("about.f.shipping.desc")}
              />
              <FeatureItem
                icon={<Users className="h-6 w-6" strokeWidth={1.5} />}
                title={t("about.f.support.title")}
                description={t("about.f.support.desc")}
              />
            </div>

            <div className="mt-10">
              {/* Updated link hover colors */}
              <a href="/about-us" className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-[#176FC0] transition-colors group border-b-2 border-slate-200 hover:border-[#176FC0] pb-1">
                Discover Our Story
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FeatureItem = ({ icon, title, description }) => (
  // Updated hover effects for feature items
  <div className="group flex items-start gap-5 p-4 rounded-xl bg-white border border-slate-100 hover:border-[#176FC0]/30 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-slate-50 text-slate-600 group-hover:bg-[#176FC0] group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);