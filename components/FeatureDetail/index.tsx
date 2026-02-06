"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Zap,
  Globe2,
  Wrench,
  CheckCircle2,
  Cpu,
  Settings,
  Clock,
  MapPin,
  Headphones,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// Define the structure of our feature data
type FeatureData = {
  [key: string]: {
    title: string;
    subtitle: string;
    description: string;
    icon: React.ElementType;
    color: string;
    gradient: string; // CSS gradient class
    bgGradient: string; // CSS background class
    stats: { label: string; value: string }[];
    details: { title: string; description: string; icon: React.ElementType }[];
    heroImage?: string; // Placeholder for now
  };
};

const FEATURES_DATA: FeatureData = {
  maintenance: {
    title: "Precision Maintenance",
    subtitle: "Engineering Excellence for Your Vehicle",
    description:
      "Our state-of-the-art maintenance protocols ensure your luxury vehicle performs at its absolute peak. We utilize factory-grade diagnostics and specialized tooling.",
    icon: Wrench,
    color: "#3b82f6",
    gradient: "from-blue-600 to-cyan-500",
    bgGradient: "bg-blue-950",
    stats: [
      { label: "Checkpoints", value: "150+" },
      { label: "Accuracy", value: "99.9%" },
      { label: "Turnaround", value: "24h" },
    ],
    details: [
      {
        title: "Diagnostic Mastery",
        description:
          "Advanced computerized scanning to detect micro-anomalies before they become issues.",
        icon: Cpu,
      },
      {
        title: "Specialized Tooling",
        description:
          "We use only manufacturer-approved tools designed specifically for high-end chassis.",
        icon: Settings,
      },
      {
        title: "Preventative Care",
        description:
          "Proactive replacement schedules derived from millions of miles of fleet data.",
        icon: Clock,
      },
    ],
  },
  warranty: {
    title: "Comprehensive Protection",
    subtitle: "Peace of Mind, Guaranteed",
    description:
      "Industry-leading warranty coverage that protects your investment. We stand behind every part and every service with absolute confidence.",
    icon: Shield,
    color: "#4f46e5",
    gradient: "from-indigo-600 to-purple-500",
    bgGradient: "bg-indigo-950",
    stats: [
      { label: "Coverage", value: "3 Years" },
      { label: "Claims", value: "Instant" },
      { label: "Global", value: "Yes" },
    ],
    details: [
      {
        title: "Zero Deductible",
        description: "Complete coverage without hidden costs or surprise fees.",
        icon: CheckCircle2,
      },
      {
        title: "OEM Compliance",
        description:
          "Our warranties adhere strictly to original manufacturer standards.",
        icon: Award,
      },
      {
        title: "Transferable",
        description:
          "Enhance your vehicle's resale value with fully transferable protection.",
        icon: ArrowRight,
      },
    ],
  },
  performance: {
    title: "Unleashed Performance",
    subtitle: "Redefining the Limits",
    description:
      "Unlock the hidden potential of your machine. Our performance tuning solutions are engineered for power, reliability, and pure driving emotion.",
    icon: Zap,
    color: "#0ea5e9",
    gradient: "from-sky-500 to-blue-600",
    bgGradient: "bg-sky-950",
    stats: [
      { label: "Power Gain", value: "+30%" },
      { label: "Response", value: "<10ms" },
      { label: "Efficiency", value: "Optimized" },
    ],
    details: [
      {
        title: "ECU Tuning",
        description:
          "Custom maps calibrated for your specific hardware and fuel quality.",
        icon: Cpu,
      },
      {
        title: "Aerodynamics",
        description:
          "Wind-tunnel tested components for reduced drag and increased downforce.",
        icon: Zap,
      },
      {
        title: "Thermals",
        description:
          "Enhanced cooling systems to sustain peak output during track sessions.",
        icon: Settings,
      },
    ],
  },
  "global-support": {
    title: "Global Support Network",
    subtitle: "Wherever You Are, We Are There",
    description:
      "A seamless network of logistics and support ensuring you have access to parts and expertise regardless of your location on the map.",
    icon: Globe2,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-400",
    bgGradient: "bg-cyan-950",
    stats: [
      { label: "Countries", value: "80+" },
      { label: "Support", value: "24/7" },
      { label: "Shipping", value: "Express" },
    ],
    details: [
      {
        title: "Worldwide Logistics",
        description:
          "Strategic warehousing partners to minimize shipping times globally.",
        icon: MapPin,
      },
      {
        title: "Expert Concierge",
        description: "Dedicated account managers available round-the-clock.",
        icon: Headphones,
      },
      {
        title: "Customs Handling",
        description:
          "We handle all import/export documentation for a hassle-free experience.",
        icon: ArrowRight,
      },
    ],
  },
};

export default function FeatureDetail({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const data = FEATURES_DATA[slug] || FEATURES_DATA["maintenance"];
  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-sans">
      {/* === HERO SECTION === */}
      <section className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className={`absolute inset-0 ${data.bgGradient}`}>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          {/* Abstract Animated Blobs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[120px] bg-gradient-to-br ${data.gradient} opacity-20`}
          />
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -100, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] bg-white opacity-10`}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-24 pb-12 lg:py-0">
          {/* Text Content */}
          <motion.div style={{ y: y1 }} className="text-white order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <Icon className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-widest uppercase">
                {data.title}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
            >
              {data.subtitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-xl mb-8 border-l-2 border-white/30 pl-6"
            >
              {data.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/contact-us"
                className="group relative inline-flex items-center gap-3 px-6 py-3 bg-white text-slate-900 rounded-full font-bold text-sm sm:text-base overflow-hidden transition-all hover:pr-10 shadow-xl hover:shadow-2xl"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual/Stats */}
          <motion.div
            style={{ y: y2 }}
            className="relative order-2 mt-8 lg:mt-0"
          >
            {/* Glass Card */}
            <div className="relative aspect-square w-full max-w-[320px] sm:max-w-md mx-auto rounded-[2rem] sm:rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden group shadow-2xl">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-1000`}
              />

              <div className="grid grid-cols-2 gap-4 h-full relative z-10">
                {data.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className={`rounded-2xl bg-black/30 p-5 flex flex-col justify-end ${i === 0 ? "col-span-2 bg-gradient-to-r from-white/10 to-transparent" : ""}`}
                  >
                    <span className="text-2xl sm:text-3xl font-black text-white mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-300 font-bold">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
                <div className="rounded-2xl border border-white/10 flex items-center justify-center bg-white/5">
                  <Icon className="w-12 h-12 text-white/80" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce cursor-pointer flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ArrowRight className="w-5 h-5 rotate-90" />
        </motion.div>
      </section>

      {/* === CONTENT SECTION === */}
      <section className="py-24 px-6 relative z-10 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <span
                className={`text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${data.gradient} mb-3 block`}
              >
                Key Features
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                Why Choose Our {data.title}?
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Experience the pinnacle of automotive excellence with our
                specialized {data.title.toLowerCase()} services. We combine
                years of heritage with cutting-edge innovation.
              </p>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 text-slate-900 text-sm font-bold underline decoration-2 decoration-slate-300 underline-offset-4 hover:decoration-slate-900 transition-all"
              >
                Explore Compatible Parts
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="space-y-8">
              {data.details.map((detail, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.2 }}
                  className="group flex gap-6 p-4 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100"
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-gradient-to-br ${data.gradient} transition-all duration-500 shadow-md`}
                  >
                    <detail.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {detail.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-xs sm:text-sm">
                      {detail.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${data.gradient} opacity-20`}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-4"
          >
            Take the Next Step
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-8 leading-tight"
          >
            Ready to Elevate Your Experience?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-white/10"
            >
              <span>Contact Our Experts</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
