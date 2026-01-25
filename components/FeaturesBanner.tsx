"use client";

import React, { useRef } from "react";
import {
  Factory,
  Lock,
  Layers,
  Maximize,
  Flag,
  Palette,
  Sparkles,
  Globe2,
  ShieldCheck,
  ArrowRight,
  Cpu,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  Settings,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// High-Animation Tilt Card Component
const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(23,111,192,0.12)] hover:border-[#176FC0]/20 transition-all duration-500 overflow-hidden"
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 shadow-sm group-hover:bg-[#176FC0] group-hover:text-white group-hover:rotate-6 transition-all duration-500">
            <feature.icon size={28} strokeWidth={1.5} />
          </div>
          <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-md bg-white border border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-black uppercase text-[#176FC0]">
              {feature.tag}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-[#176FC0] transition-colors tracking-tight">
          {feature.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed font-medium">
          {feature.description}
        </p>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#176FC0]/5 to-transparent rounded-bl-[100px] -mr-10 -mt-10 transition-all duration-500 group-hover:scale-125" />
    </motion.div>
  );
};

export default function FeaturesBanner() {
  const { t } = useLanguage();

  const trustFeatures = [
    { icon: Globe2, title: "Worldwide Shipping" },
    { icon: Flag, title: "Tested Performance" },
    { icon: Factory, title: "In-House Mfg" },
    { icon: ShieldCheck, title: "OEM Materials" },
    { icon: Lock, title: "Secure Payments" },
  ];

  const engineeringFeatures = [
    {
      icon: Layers,
      title: "In-house Carbon Manufacturing",
      description:
        "Complete control over the entire process, ensuring unparalleled quality and perfect weave consistency.",
      tag: "Craftsmanship",
    },
    {
      icon: Maximize,
      title: "OEM-Level Fitment Precision",
      description:
        "Our parts integrate seamlessly with your vehicle's original lines, guaranteed by 3D scanning and precision molding.",
      tag: "Technology",
    },
    {
      icon: Flag,
      title: "Track-Proven Performance",
      description:
        "Rigorously tested on demanding circuits to validate performance and durability under extreme conditions.",
      tag: "Motorsport",
    },
    {
      icon: Palette,
      title: "Bespoke Customization",
      description:
        "Tailor every detail, from carbon weave patterns to unique finishes, creating a truly one-of-a-kind statement.",
      tag: "Luxury",
    },
    {
      icon: Globe2,
      title: "Global Logistics & Support",
      description:
        "Seamless and secure door-to-door shipping worldwide, with dedicated support to manage the entire process.",
      tag: "Global",
    },
    {
      icon: Sparkles,
      title: "Impeccable Finishing Standards",
      description:
        "Each component is hand-finished with multi-layer clear coat for a deep, flawless gloss that exceeds luxury standards.",
      tag: "Quality",
    },
  ];

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
    <section className="relative bg-white py-16 sm:py-24 lg:py-36 overflow-hidden">
      {/* Dynamic Background System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent" />

        <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-blue-50/50 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-indigo-50/40 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] translate-y-1/2 -translate-x-1/4" />

        {/* Mesh Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 sm:mb-16 lg:mb-20 gap-6 lg:gap-10">
          <div className="max-w-3xl w-full lg:w-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6 sm:mb-8"
            >
              <Settings
                size={12}
                className="sm:w-3.5 sm:h-3.5 text-[#176FC0] animate-spin-slow"
              />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#176FC0]">
                Engineering Philosophy
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] mb-2"
            >
              The Own Silent{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85]">
                Edge
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-md text-slate-500 text-base sm:text-lg font-medium leading-relaxed"
          >
            We merge cutting-edge technology with artisanal craftsmanship to
            create automotive components that are unparalleled.
          </motion.p>
        </div>

        {/* Premium Value Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20 lg:mb-24 border-y border-slate-100 py-8 sm:py-10 lg:py-12"
        >
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-2 sm:gap-3 lg:gap-4 text-center"
            >
              <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#176FC0] group-hover:text-white transition-all duration-500 shadow-sm">
                <feature.icon
                  size={20}
                  className="sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-black text-slate-700 uppercase tracking-[0.15em] sm:tracking-[0.2em] group-hover:text-[#176FC0] transition-colors leading-tight">
                {feature.title}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Interactive Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mb-20 sm:mb-28 lg:mb-32">
          {engineeringFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* LIGHT MODE CORPORATE SECTION */}
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3.5rem] bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/50 p-6 sm:p-10 lg:p-24 overflow-hidden border border-white shadow-[0_20px_60px_rgba(0,0,0,0.04)] sm:shadow-[0_40px_100px_rgba(0,0,0,0.05)]">
          {/* Animated Float Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-10 right-10 sm:top-16 sm:right-16 lg:top-20 lg:right-20 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-[#176FC0]/10 rounded-full blur-2xl sm:blur-3xl"
            />
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="absolute bottom-10 left-10 sm:bottom-16 sm:left-16 lg:bottom-20 lg:left-20 w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 bg-indigo-500/10 rounded-full blur-2xl sm:blur-3xl"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 relative z-10">
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#176FC0]/5 border border-[#176FC0]/10 text-[#176FC0] mb-6 sm:mb-8">
                  <Shield size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-black uppercase tracking-widest leading-none">
                    Global Network
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1] mb-6 sm:mb-8 lg:mb-10">
                  {t("feat.work.t")}{" "}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] to-[#0F4C85] mt-2 sm:mt-3">
                    {t("feat.work.h")}
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-8 sm:mb-10 lg:mb-12">
                  {t("feat.work.d")}
                </p>

                <div className="flex">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:sales@ownsilent.international"
                    className="group flex items-center justify-center w-full sm:w-auto gap-4 sm:gap-6 bg-slate-900 text-white rounded-xl sm:rounded-2xl px-6 py-4 sm:px-8 sm:py-5 text-xs sm:text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-950/20 hover:bg-[#176FC0] transition-colors"
                  >
                    <span>{t("feat.contact")}</span>
                    <ArrowRight
                      size={18}
                      className="sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform"
                    />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                {workFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white border border-slate-100 p-6 sm:p-8 lg:p-10 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-[#176FC0]/20 hover:-translate-y-1 sm:hover:-translate-y-2"
                  >
                    <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-10">
                      <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-[#176FC0]/5 flex items-center justify-center text-[#176FC0] group-hover:bg-[#176FC0] group-hover:text-white transition-all duration-500">
                        <feature.icon
                          size={24}
                          className="sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                          strokeWidth={1.5}
                        />
                      </div>
                      <CheckCircle2
                        size={18}
                        className="sm:w-5 sm:h-5 text-slate-200 group-hover:text-[#176FC0] transition-colors"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 mb-2 sm:mb-3 lg:mb-4 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}

                {/* Visual Performance Accent */}
                <div className="hidden sm:flex group relative bg-white border-2 border-dashed border-[#176FC0]/20 p-6 sm:p-8 lg:p-10 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] flex-col justify-center items-center text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 border-4 border-[#176FC0]/5 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] pointer-events-none"
                  />
                  <Zap
                    size={40}
                    className="sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-[#176FC0] mb-4 sm:mb-5 lg:mb-6 animate-bounce-slow"
                  />
                  <p className="text-slate-900 font-black uppercase tracking-widest text-[10px] sm:text-[11px]">
                    Innovation Core
                  </p>
                  <p className="text-slate-400 text-[9px] sm:text-[10px] mt-1.5 sm:mt-2 font-bold italic">
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
