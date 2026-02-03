"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Target,
  Shield,
  Cog,
  Activity,
  Thermometer,
  MousePointer2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const AUTO_PLAY_INTERVAL = 4000;

export default function PremiumCarShowcase() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse tracking for 3D tilt and spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [10, -10]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-10, 10]),
    springConfig,
  );

  // Spotlight position
  const spotlightX = useSpring(useMotionValue(0), springConfig);
  const spotlightY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);

    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Memoize parts array
  const parts = useMemo(
    () => [
      {
        id: 1,
        name: t("showcase.part1.name") || "Carbon Matrix Rotors",
        headline:
          t("showcase.part1.headline") || "Thermal Mastery in Every Stop.",
        description:
          t("showcase.part1.desc") ||
          "Our carbon ceramic matrix rotors provide unmatched heat dissipation and zero brake fade, even under extreme track conditions.",
        image: "/images/showcase/image1.png",
        bgText: t("showcase.part1.bgText") || "POWER",
        bgColor: "bg-[#f8fafc]",
        accentColor: "#3b82f6",
        glowColor: "rgba(59, 130, 246, 0.15)",
        specs: [
          {
            label: t("showcase.part1.s1.l"),
            value: t("showcase.part1.s1.v"),
            icon: <Shield size={14} />,
          },
          {
            label: t("showcase.part1.s2.l"),
            value: t("showcase.part1.s2.v"),
            icon: <Activity size={14} />,
          },
          {
            label: t("showcase.part1.s3.l"),
            value: t("showcase.part1.s3.v"),
            icon: <Zap size={14} />,
          },
        ],
      },
      {
        id: 2,
        name: t("showcase.part2.name") || "Forged Aero-S Wheels",
        headline:
          t("showcase.part2.headline") || "Lightweight. Forged. Unstoppable.",
        description:
          t("showcase.part2.desc") ||
          "Precision engineered from aerospace-grade 6061-T6 aluminum, the Aero-S series significantly reduces unsprung mass for superior handling.",
        image: "/images/showcase/image2.png",
        bgText: t("showcase.part2.bgText") || "LIGHT",
        bgColor: "bg-[#f1f5f9]",
        accentColor: "#3b82f6",
        glowColor: "rgba(59, 130, 246, 0.15)",
        specs: [
          {
            label: t("showcase.part2.s1.l"),
            value: t("showcase.part2.s1.v"),
            icon: <Cog size={14} />,
          },
          {
            label: t("showcase.part2.s2.l"),
            value: t("showcase.part2.s2.v"),
            icon: <Target size={14} />,
          },
          {
            label: t("showcase.part2.s3.l"),
            value: t("showcase.part2.s3.v"),
            icon: <Zap size={14} />,
          },
        ],
      },
      {
        id: 3,
        name: t("showcase.part3.name") || "Adaptive Nitro Coilovers",
        headline: t("showcase.part3.headline") || "Precision Perfected.",
        description:
          t("showcase.part3.desc") ||
          "Ultra-fast response nitrogen-charged dampers with 32-way adjustment, offering the perfect balance between track rigidity and road comfort.",
        image: "/images/showcase/image3.png",
        bgText: t("showcase.part3.bgText") || "GLIDE",
        bgColor: "bg-[#e2e8f0]",
        accentColor: "#3b82f6",
        glowColor: "rgba(59, 130, 246, 0.15)",
        specs: [
          {
            label: t("showcase.part3.s1.l"),
            value: t("showcase.part3.s1.v"),
            icon: <Activity size={14} />,
          },
          {
            label: t("showcase.part3.s2.l"),
            value: t("showcase.part3.s2.v"),
            icon: <Thermometer size={14} />,
          },
          {
            label: t("showcase.part3.s3.l"),
            value: t("showcase.part3.s3.v"),
            icon: <Target size={14} />,
          },
        ],
      },
      {
        id: 4,
        name: t("showcase.part4.name") || "Matrix LASER Headlights",
        headline:
          t("showcase.part4.headline") || "Illuminating the Path Ahead.",
        description:
          t("showcase.part4.desc") ||
          "High-definition laser projection system with adaptive beam technology, providing up to 600m of crystal clear visibility.",
        image: "/images/showcase/image4.png",
        bgText: t("showcase.part4.bgText") || "LIGHT",
        bgColor: "bg-[#f8fafc]",
        accentColor: "#3b82f6",
        glowColor: "rgba(59, 130, 246, 0.15)",
        specs: [
          {
            label: t("showcase.part4.s1.l"),
            value: t("showcase.part4.s1.v"),
            icon: <Activity size={14} />,
          },
          {
            label: t("showcase.part4.s2.l"),
            value: t("showcase.part4.s2.v"),
            icon: <Zap size={14} />,
          },
          {
            label: t("showcase.part4.s3.l"),
            value: t("showcase.part4.s3.v"),
            icon: <Target size={14} />,
          },
        ],
      },
      {
        id: 5,
        name: t("showcase.part5.name") || "Forged Carbon Aero Kit",
        headline: t("showcase.part5.headline") || "Aerodynamics Redefined.",
        description:
          t("showcase.part5.desc") ||
          "Ultra-lightweight forged carbon fiber components designed for maximum downforce and aggressive aesthetics.",
        image: "/images/showcase/image5.png",
        bgText: t("showcase.part5.bgText") || "AERO",
        bgColor: "bg-[#f1f5f9]",
        accentColor: "#3b82f6",
        glowColor: "rgba(59, 130, 246, 0.15)",
        specs: [
          {
            label: t("showcase.part5.s1.l"),
            value: t("showcase.part5.s1.v"),
            icon: <Cog size={14} />,
          },
          {
            label: t("showcase.part5.s2.l"),
            value: t("showcase.part5.s2.v"),
            icon: <Activity size={14} />,
          },
          {
            label: t("showcase.part5.s3.l"),
            value: t("showcase.part5.s3.v"),
            icon: <Zap size={14} />,
          },
        ],
      },
    ],
    [t],
  );

  const currentPart = parts[currentIndex];

  const nextPart = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % parts.length);
  }, [parts.length]);

  const prevPart = () => {
    setCurrentIndex((prev) => (prev - 1 + parts.length) % parts.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextPart, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [nextPart, isHovered]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen md:h-screen w-full overflow-hidden flex items-center justify-center py-12 md:py-0 cursor-crosshair group"
    >
      {/* Background System */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPart.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 ${currentPart.bgColor}`}
        />
      </AnimatePresence>

      {/* Interactive Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(circle 400px at ${x}px ${y}px, ${currentPart.glowColor}, transparent)`,
          ),
        }}
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Modern HUD Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        {/* Corner Brackets */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-slate-900/10" />
        <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-slate-900/10" />
        <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-slate-900/10" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-slate-900/10" />

        {/* Moving Scan Line */}
        <motion.div
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-900/5 to-transparent z-[2]"
        />
      </div>

      {/* Hero Background Text (Kinetic) */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden z-[1]">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentPart.bgText}
            initial={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            animate={{ opacity: 0.04, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(30px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[25vw] font-black tracking-tighter text-slate-900 leading-none"
          >
            {currentPart.bgText}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full max-w-[1300px] px-6 sm:px-12 flex flex-col md:grid md:grid-cols-12 md:gap-10 items-center">
        {/* Information Panel */}
        <div className="col-span-12 md:col-span-5 order-2 md:order-1 text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPart.id}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-3 backdrop-blur-md bg-white/40 px-3 py-1 rounded-full border border-white/60 mb-6"
              >
                <div className="relative flex h-1.5 w-1.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: currentPart.accentColor }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ backgroundColor: currentPart.accentColor }}
                  />
                </div>
                <span className="font-bold tracking-[0.25em] uppercase text-[8px] text-slate-600">
                  {t("showcase.series")}
                </span>
              </motion.div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[0.95] mb-4 sm:mb-6 overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {currentPart.name.split(" ").slice(0, 2).join(" ")}
                </motion.span>
                <motion.span
                  className="block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${currentPart.accentColor}, #64748b)`,
                  }}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {currentPart.name.split(" ").slice(2).join(" ")}
                </motion.span>
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-slate-500 text-sm md:text-base font-medium leading-relaxed mb-6 md:mb-8 max-w-sm mx-auto md:mx-0 border-l-2 pl-4"
                style={{ borderColor: currentPart.accentColor }}
              >
                {currentPart.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D Visual Hub */}
        <div className="col-span-12 md:col-span-4 order-1 md:order-2 flex items-center justify-center py-10 md:py-0">
          <div className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[550px] aspect-square flex items-center justify-center">
            {/* Dynamic Interactive Platform */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Rotating Tech Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 15 + i * 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute rounded-full border border-dashed pointer-events-none"
                  style={{
                    width: `${85 + i * 20}%`,
                    height: `${85 + i * 20}%`,
                    borderColor: currentPart.accentColor,
                    opacity: 0.1 - i * 0.03,
                  }}
                />
              ))}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPart.id}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    rotateY: -90,
                    filter: "brightness(0)",
                  }}
                  animate={{
                    opacity: 1,
                    scale:
                      typeof window !== "undefined" && window.innerWidth < 768
                        ? 1
                        : 1.3,
                    rotateY: 0,
                    filter: "brightness(1)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    rotateY: 90,
                    filter: "brightness(2)",
                  }}
                  transition={{ type: "spring", stiffness: 45, damping: 15 }}
                  className="relative z-10 w-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    style={{
                      transform: "translateZ(80px) md:translateZ(120px)",
                    }}
                  >
                    <Image
                      src={currentPart.image}
                      alt={currentPart.name}
                      width={900}
                      height={900}
                      className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.15)] md:drop-shadow-[0_80px_80px_rgba(0,0,0,0.2)] pointer-events-none p-4 transition-all duration-700"
                      priority
                    />
                  </div>

                  {/* Dynamic Glow */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 blur-[60px] md:blur-[120px] z-[-1] rounded-full"
                    style={{ backgroundColor: currentPart.accentColor }}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Control & Specs Panel */}
        <div className="col-span-12 md:col-span-3 order-3 flex flex-col items-center md:items-end w-full">
          <div className="space-y-12 w-full max-w-sm md:max-w-none">
            {/* Spec Cluster */}
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-end gap-3 text-slate-400">
                <span className="text-[8px] font-black uppercase tracking-[0.3em]">
                  {t("showcase.stats")}
                </span>
                <div className="w-8 h-[1px] bg-slate-200" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                {currentPart.specs.map((spec, idx) => (
                  <motion.div
                    key={`${currentPart.id}-${spec.label}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    whileHover={{ x: -5, scale: 1.02 }}
                    className="group/spec relative flex items-center justify-between md:justify-end gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/40"
                  >
                    <div className="text-right">
                      <p className="text-[8px] font-black uppercase tracking-tighter text-slate-400 mb-0.5">
                        {spec.label}
                      </p>
                      <p className="text-xl font-black text-slate-900 tracking-tight">
                        {spec.value}
                      </p>
                    </div>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover/spec:scale-110 shadow-md shadow-slate-100 bg-slate-50"
                      style={{ color: currentPart.accentColor }}
                    >
                      {spec.icon}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Intelligent Navigation */}
            <div className="pt-10 border-t border-slate-200/60 w-full space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  {parts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className="group/dot relative h-4 flex items-center"
                    >
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          currentIndex === idx
                            ? "w-10"
                            : "w-3 bg-slate-200 group-hover/dot:bg-slate-300"
                        }`}
                        style={
                          currentIndex === idx
                            ? { backgroundColor: currentPart.accentColor }
                            : {}
                        }
                      />
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  {[
                    { icon: <ChevronLeft size={20} />, onClick: prevPart },
                    { icon: <ChevronRight size={20} />, onClick: nextPart },
                  ].map((btn, i) => (
                    <motion.button
                      key={i}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "#0f172a",
                        color: "#fff",
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={btn.onClick}
                      className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center bg-white transition-shadow hover:shadow-xl"
                    >
                      {btn.icon}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Enhanced Progress System */}
              <div className="space-y-3">
                <div className="h-[2px] w-full bg-slate-200/40 rounded-full overflow-hidden">
                  <motion.div
                    key={currentIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: isHovered ? "0%" : "100%" }}
                    transition={{
                      duration: AUTO_PLAY_INTERVAL / 1000,
                      ease: "linear",
                    }}
                    className="h-full"
                    style={{ backgroundColor: currentPart.accentColor }}
                  />
                </div>
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                  <div className="flex items-center gap-2">
                    <MousePointer2
                      size={10}
                      className={isHovered ? "text-slate-900" : ""}
                    />
                    <span>
                      {t("showcase.status")} :{" "}
                      {isHovered ? t("showcase.paused") : t("showcase.auto")}
                    </span>
                  </div>
                  <span className="text-slate-900">
                    SYSTEM_0{currentIndex + 1} / 0{parts.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Bottom Bar (Data Flow) */}
      <div className="absolute bottom-8 left-12 right-12 hidden md:flex items-center justify-between pointer-events-none z-[5]">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-900">
              {t("showcase.osPerformance")}
            </span>
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-3 bg-slate-950"
                  style={{ opacity: 1 - i * 0.2 }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-10 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase">
            <span>{t("showcase.est")}</span>
            <span className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: currentPart.accentColor }}
              />
              {t("showcase.aerospace")}
            </span>
          </div>
        </div>
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-4 group/discover cursor-pointer pointer-events-auto"
        >
          <span className="text-[10px] font-black tracking-widest text-slate-900">
            {t("showcase.discover")}
          </span>
          <ChevronRight
            size={14}
            className="text-slate-900 transition-transform group-hover/discover:translate-x-1"
          />
        </motion.div>
      </div>

      <style jsx global>{`
        .cursor-crosshair {
          cursor: crosshair;
        }
      `}</style>
    </section>
  );
}
