"use client";

import React, { useRef, useState } from "react";
import {
  ShieldCheck,
  Truck,
  Users,
  ArrowRight,
  Play,
  Star,
  CheckCircle2,
  Trophy,
  Activity,
  Maximize2,
  Cpu,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export default function AboutUs() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
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

  const features = [
    {
      icon: ShieldCheck,
      title: t("about.f.quality.title"),
      description: t("about.f.quality.desc"),
    },
    {
      icon: Truck,
      title: t("about.f.shipping.title"),
      description: t("about.f.shipping.desc"),
    },
    {
      icon: Users,
      title: t("about.f.support.title"),
      description: t("about.f.support.desc"),
    },
  ];

  return (
    <section
      id="about"
      className="relative bg-white py-6 sm:py-10 lg:py-12 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-[-5%] w-[450px] h-[450px] bg-indigo-50/30 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16 items-center">
          {/* ADVANCED VIDEO INTERFACE */}
          <div className="hidden lg:flex lg:col-span-5 relative order-2 lg:order-1 items-center">
            <motion.div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full aspect-[4/3] cursor-pointer"
            >
              {/* Backglow Effect */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-[#176FC0]/20 to-indigo-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Floating Glass Panels (Depth Layer) */}
              <motion.div
                style={{ transform: "translateZ(-50px)" }}
                className="absolute -top-12 -left-12 w-32 h-32 bg-white/40 backdrop-blur-3xl rounded-3xl border border-white/50 shadow-2xl z-0 hidden xl:flex items-center justify-center"
              >
                <Cpu size={40} className="text-[#176FC0]/20 animate-pulse" />
              </motion.div>

              {/* Main Cinematic Frame */}
              <div
                style={{ transform: "translateZ(50px)" }}
                className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-[6px] border-white ring-1 ring-slate-100 bg-black group"
              >
                {/* Video Scanning Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {/* Moving Laser Line */}
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#176FC0] to-transparent shadow-[0_0_20px_rgba(23,111,192,1)]"
                  />

                  {/* Digital Grain Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                {/* Status HUD Elements */}
                <div className="absolute top-8 left-8 z-30 flex flex-col gap-2">
                  <div className="flex items-center gap-3 backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">
                      System: Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-bold text-white/50 uppercase tracking-widest pl-1">
                    <Maximize2 size={8} /> 4K Stream 240fps
                  </div>
                </div>

                <div className="absolute top-8 right-8 z-30">
                  <div className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-8 h-8 rounded-full border-t border-r border-[#176FC0]"
                    />
                  </div>
                </div>

                <video
                  src="/images/home/about.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out opacity-80 group-hover:opacity-100"
                />

                {/* Central Play/Interaction Button */}
                <div className="absolute inset-0 flex items-center justify-center z-30">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-20 h-20 rounded-full bg-white/20 backdrop-blur-2xl border border-white/40 flex items-center justify-center group-hover:bg-[#176FC0] transition-colors duration-500 shadow-2xl"
                  >
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#176FC0] shadow-sm transform group-hover:scale-110 transition-transform duration-500">
                      <Play fill="currentColor" size={24} className="ml-1" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Data Floating Card */}
              <motion.div
                style={{ transform: "translateZ(80px)" }}
                className="absolute -bottom-8 -right-8 z-40 hidden sm:block"
              >
                <div className="bg-slate-900 text-white p-5 rounded-[2rem] shadow-2xl border border-white/10 ring-1 ring-black max-w-[200px] overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-20">
                    <Trophy size={40} />
                  </div>
                  <div className="flex text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-3xl font-black mb-1">100%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                    Verified Engineering Success
                  </p>

                  {/* Mini Graph Decor */}
                  <div className="mt-4 flex gap-1 items-end h-8">
                    {[0.4, 0.7, 0.5, 0.9, 0.6, 1.0, 0.8].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: [
                            `${h * 100}%`,
                            `${h * 0.5 * 100}%`,
                            `${h * 100}%`,
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        className="flex-1 bg-[#176FC0] rounded-sm"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* CONTENT COLUMN */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 w-fit mb-4 sm:mb-8"
            >
              <Activity size={14} className="text-[#176FC0]" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Performance Metrics
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3 sm:mb-6 leading-[1.05]"
            >
              {t("about.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85] block mt-1 sm:mt-2">
                {t("about.titleHighlight")}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[13px] sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6 font-medium"
            >
              {t("about.intro")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden md:block relative bg-gradient-to-br from-slate-50 to-white border-l-4 border-[#176FC0] p-6 rounded-r-[2rem] mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
            >
              <p className="text-lg font-bold text-slate-800 italic leading-relaxed">
                "{t("about.mission")}"
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="group flex items-start gap-3 sm:gap-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-100 hover:border-[#176FC0]/30 hover:shadow-xl hover:shadow-[#176FC0]/5 transition-all duration-500"
                >
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-slate-50 text-slate-400 group-hover:bg-[#176FC0] group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                    <feature.icon
                      size={20}
                      className="sm:w-[22px] sm:h-[22px]"
                      strokeWidth={2}
                    />
                  </div>
                  <div>
                    <h4 className="text-[13px] sm:text-sm font-black text-slate-900 mb-0.5 sm:mb-1 tracking-tight group-hover:text-[#176FC0] transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-10"
            >
              <a
                href="/about-us"
                className="group relative inline-flex items-center gap-4 text-[13px] font-black text-slate-950 uppercase tracking-[0.2em] overflow-hidden"
              >
                <span className="relative z-10 transition-transform group-hover:translate-x-2">
                  Discover Our Story
                </span>
                <div className="w-10 h-10 rounded-full bg-[#176FC0] flex items-center justify-center text-white shadow-lg shadow-[#176FC0]/20 transform group-hover:scale-110 transition-transform">
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-100 z-0" />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  className="absolute bottom-0 left-0 h-[1px] bg-[#176FC0] z-0"
                />
              </a>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
