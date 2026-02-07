"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Truck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Globe2,
  Wrench,
  Headphones,
  Award,
  Box,
  CreditCard,
  Eye,
  BarChart3,
  Star,
  TrendingUp,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// Define the structure of our How it Works data
type StepData = {
  [key: string]: {
    title: string;
    subtitle: string;
    description: string;
    icon: React.ElementType;
    color: string;
    gradient: string;
    bgGradient: string;
    stats: { label: string; value: string }[];
    details: { title: string; description: string; icon: React.ElementType }[];
    benefits: { title: string; icon: React.ElementType }[];
    theme: "blue" | "indigo" | "sky" | "cyan";
  };
};

const HOW_IT_WORKS_DATA: StepData = {
  "find-your-part": {
    title: "Find Your Perfect Part",
    subtitle: "Precision Filtering & Expert Navigation",
    description:
      "Navigate through our extensive catalog of high-performance components. Our intelligent filtering system ensures 100% fitment accuracy for your specific vehicle configuration.",
    icon: Search,
    color: "#3b82f6",
    gradient: "from-blue-600 to-cyan-500",
    bgGradient: "bg-blue-950",
    theme: "blue",
    stats: [
      { label: "Products", value: "50,000+" },
      { label: "Car Models", value: "2,500+" },
      { label: "Brands", value: "120+" },
    ],
    details: [
      {
        title: "Model-Specific Search",
        description:
          "Our database is indexed by chassis code and engine type for perfect matching.",
        icon: Eye,
      },
      {
        title: "Expert Guidance",
        description:
          "Chat with our specialists to confirm compatibility before you buy.",
        icon: Headphones,
      },
      {
        title: "Visual Verification",
        description:
          "High-resolution 3D renders and photos of every component.",
        icon: Sparkles,
      },
    ],
    benefits: [
      { title: "Instant Search Results", icon: Zap },
      { title: "100% Fitment Guarantee", icon: Shield },
      { title: "Live Expert Chat", icon: Headphones },
      { title: "Advanced Filters", icon: Star },
    ],
  },
  "ordering-process": {
    title: "Secure Ordering",
    subtitle: "Seamless Checkout & Order Management",
    description:
      "Complete your purchase with complete peace of mind. Our secure system handles worldwide transactions, multiple currencies, and instant inventory confirmation.",
    icon: ShoppingCart,
    color: "#4f46e5",
    gradient: "from-indigo-600 to-blue-500",
    bgGradient: "bg-indigo-950",
    theme: "indigo",
    stats: [
      { label: "Currencies", value: "30+" },
      { label: "Security", value: "AES-256" },
      { label: "Time", value: "<2 Min" },
    ],
    details: [
      {
        title: "Global Payments",
        description:
          "Secure gateway supporting all major cards, PayPal, and bank transfers.",
        icon: CreditCard,
      },
      {
        title: "Real-time Inventory",
        description:
          "We verify stock status in real-time across our global warehouses.",
        icon: BarChart3,
      },
      {
        title: "Fraud Protection",
        description:
          "Advanced AI-driven security to protect your financial data.",
        icon: Shield,
      },
    ],
    benefits: [
      { title: "Encrypted Checkout", icon: Lock },
      { title: "Instant Confirmation", icon: CheckCircle2 },
      { title: "Order Tracking", icon: TrendingUp },
      { title: "Easy Returns", icon: ArrowRight },
    ],
  },
  "fast-shipping": {
    title: "Fast Global Shipping",
    subtitle: "Aerospace-Grade Logistics Network",
    description:
      "From our hub to your doorstep. We partner with elite courier services to ensure your premium parts arrive safely, quickly, and with full insurance coverage.",
    icon: Truck,
    color: "#0ea5e9",
    gradient: "from-sky-500 to-indigo-600",
    bgGradient: "bg-sky-950",
    theme: "sky",
    stats: [
      { label: "Delivery", value: "3-5 Days" },
      { label: "Tracking", value: "Live" },
      { label: "Insurance", value: "100%" },
    ],
    details: [
      {
        title: "Priority Air Cargo",
        description:
          "Express shipping options for urgent performance upgrades.",
        icon: Zap,
      },
      {
        title: "Secure Packaging",
        description:
          "Military-grade packaging protocols to prevent transit damage.",
        icon: Box,
      },
      {
        title: "Customs Handling",
        description:
          "We manage all export documentation and clearance processes.",
        icon: Globe2,
      },
    ],
    benefits: [
      { title: "Express Delivery", icon: Zap },
      { title: "Real-time GPS", icon: Globe2 },
      { title: "Signature Required", icon: Shield },
      { title: "Full Insurance", icon: Award },
    ],
  },
  "quality-delivery": {
    title: "Quality Confirmation",
    subtitle: "The Ultimate Unboxing Experience",
    description:
      "Receive your parts with the confidence that they have passed our rigorous 50-point quality check. Enjoy life-long support and professional installation guidance.",
    icon: CheckCircle2,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-400",
    bgGradient: "bg-cyan-950",
    theme: "cyan",
    stats: [
      { label: "Checkpoints", value: "50+" },
      { label: "Guarantee", value: "Lifetime" },
      { label: "Support", value: "24/7" },
    ],
    details: [
      {
        title: "Authenticity Check",
        description:
          "Every part includes a holographic security seal for verification.",
        icon: Award,
      },
      {
        title: "Installation Support",
        description:
          "Access to private video tutorials and expert tech support.",
        icon: Wrench,
      },
      {
        title: "Satisfaction Promise",
        description: "Hassle-free returns if you're not 100% satisfied.",
        icon: CheckCircle2,
      },
    ],
    benefits: [
      { title: "Quality Certified", icon: Award },
      { title: "Video Guides", icon: Sparkles },
      { title: "Lifetime Warranty", icon: Shield },
      { title: "Expert Support", icon: Headphones },
    ],
  },
};

export default function HowItWorksDetail({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const benefitsRef = useRef(null);
  const isInView = useInView(benefitsRef, { once: true, margin: "-100px" });

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const data = HOW_IT_WORKS_DATA[slug] || HOW_IT_WORKS_DATA["find-your-part"];
  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-sans">
      {/* === HERO SECTION === */}
      <section className="relative min-h-[75vh] sm:min-h-screen py-10 sm:py-20 flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className={`absolute inset-0 ${data.bgGradient}`}>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

          {/* Abstract Animated Blobs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] bg-gradient-to-br ${data.gradient} opacity-20`}
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
              x: [0, -80, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] bg-white opacity-10`}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center pt-20 sm:pt-24 pb-8 sm:pb-12 lg:py-0">
          {/* Text Content */}
          <motion.div style={{ y: y1, scale }} className="text-white order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-3 sm:mb-6 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              <span className="text-[9px] sm:text-xs font-bold tracking-widest uppercase">
                Step{" "}
                {slug === "find-your-part"
                  ? "01"
                  : slug === "ordering-process"
                    ? "02"
                    : slug === "fast-shipping"
                      ? "03"
                      : "04"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-3 sm:mb-6"
            >
              {data.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[11px] sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-xl mb-5 sm:mb-8 border-l-2 border-white/30 pl-3 sm:pl-6 opacity-90"
            >
              {data.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/shop"
                className="group relative inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-white text-slate-900 rounded-full font-bold text-[11px] sm:text-base overflow-hidden transition-all hover:pr-8 sm:hover:pr-10 shadow-xl hover:shadow-2xl"
              >
                <span>Discover Products</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual/Stats */}
          <motion.div
            style={{ y: y2 }}
            className="relative order-2 mt-6 sm:mt-8 lg:mt-0"
          >
            {/* HUD / Glass Card */}
            <div className="relative aspect-square w-full max-w-[220px] sm:max-w-md mx-auto rounded-[1.5rem] sm:rounded-[3rem] border border-white/20 bg-white/10 backdrop-blur-2xl p-3 sm:p-8 flex flex-col justify-between overflow-hidden group shadow-2xl shadow-black/20">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-1000`}
              />

              <div className="grid grid-cols-2 gap-2 sm:gap-4 h-full relative z-10">
                {data.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className={`rounded-lg sm:rounded-2xl bg-white/5 border border-white/10 p-2.5 sm:p-5 flex flex-col justify-end ${i === 0 ? "col-span-2 bg-gradient-to-r from-white/10 to-transparent" : ""}`}
                  >
                    <span className="text-base sm:text-3xl font-black text-white mb-0.5">
                      {stat.value}
                    </span>
                    <span className="text-[7px] sm:text-[10px] uppercase tracking-widest text-slate-300 font-bold opacity-80">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
                <div className="rounded-lg sm:rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 relative overflow-hidden">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Icon className="w-5 h-5 sm:w-12 sm:h-12 text-white/60" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce cursor-pointer flex flex-col items-center gap-1 sm:gap-2"
        >
          <span className="text-[8px] sm:text-[10px] uppercase tracking-widest">
            Scroll
          </span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-90" />
        </motion.div>
      </section>

      {/* === BENEFITS SECTION === */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 relative z-10 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <span
              className={`text-[9px] sm:text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${data.gradient} mb-2 block`}
            >
              Key Benefits
            </span>
            <h2 className="text-xl sm:text-4xl font-black text-slate-900 mb-3 sm:mb-6 leading-tight">
              Why Choose This Step
            </h2>
          </motion.div>

          <div
            ref={benefitsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          >
            {data.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${data.gradient} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
                >
                  <benefit.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-[10px] sm:text-sm font-black text-slate-900 leading-tight">
                  {benefit.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === CONTENT SECTION === */}
      <section className="py-10 sm:py-24 px-4 sm:px-6 relative z-10 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span
                className={`text-[9px] sm:text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${data.gradient} mb-2 sm:mb-3 block`}
              >
                In-Depth Insights
              </span>
              <h2 className="text-lg sm:text-4xl font-black text-slate-900 mb-3 sm:mb-6 leading-tight">
                Mastering the {data.title}
              </h2>
              <p className="text-[11px] sm:text-base text-slate-600 leading-relaxed mb-5 sm:mb-6 font-medium opacity-80">
                {data.description}
              </p>
              <div className="space-y-2 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3 text-slate-700">
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${data.gradient}`}
                  />
                  <span className="text-[10px] sm:text-sm font-bold">
                    100% Secure & Verified
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-slate-700">
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${data.gradient}`}
                  />
                  <span className="text-[10px] sm:text-sm font-bold">
                    Expert Manual Review
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="space-y-3 sm:space-y-8">
              {data.details.map((detail, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="group flex gap-3 sm:gap-6 p-3 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100 bg-white/40 sm:bg-transparent"
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-gradient-to-br ${data.gradient} transition-all duration-500 shadow-sm sm:shadow-md`}
                  >
                    <detail.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-[11px] sm:text-lg font-black text-slate-900 mb-0.5 sm:mb-1">
                      {detail.title}
                    </h3>
                    <p className="text-[10px] sm:text-sm text-slate-500 leading-relaxed">
                      {detail.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === PROCESS STEPS === */}
      <section className="py-10 sm:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-6 sm:mb-16 px-4">
            <h2 className="text-xl sm:text-5xl font-black text-slate-900 mb-2 sm:mb-4">
              Our Commitment
            </h2>
            <div
              className={`h-1 w-12 sm:w-20 bg-gradient-to-r ${data.gradient} mx-auto rounded-full`}
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-8">
            {Object.entries(HOW_IT_WORKS_DATA).map(([key, step], idx) => (
              <Link key={key} href={`/how-it-works/${key}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`group p-3 sm:p-8 rounded-xl sm:rounded-[2rem] border transition-all duration-500 h-full ${key === slug ? `bg-gradient-to-br ${data.gradient} border-transparent text-white shadow-xl sm:shadow-2xl sm:scale-105` : "bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-900 hover:bg-white hover:shadow-xl"}`}
                >
                  <div
                    className={`w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-6 ${key === slug ? "bg-white/20" : "bg-white shadow-sm"}`}
                  >
                    <step.icon
                      className={`w-3.5 h-3.5 sm:w-6 sm:h-6 ${key === slug ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`}
                    />
                  </div>
                  <span
                    className={`text-[7px] sm:text-[10px] font-black uppercase tracking-widest mb-1 sm:mb-2 block ${key === slug ? "text-white/60" : "text-slate-400"}`}
                  >
                    Step 0{idx + 1}
                  </span>
                  <h3 className="text-[11px] sm:text-lg font-black mb-1 sm:mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <ArrowRight
                    className={`w-3.5 h-3.5 sm:w-5 sm:h-5 transform transition-transform group-hover:translate-x-1 ${key === slug ? "text-white" : "text-slate-300"}`}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="py-12 sm:py-24 bg-slate-900 text-white overflow-hidden relative px-4">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${data.gradient} opacity-20`}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-[9px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-3 sm:mb-4"
          >
            Ready to Start?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-6xl font-black mb-5 sm:mb-8 leading-tight"
          >
            Begin Your Upgrade <br className="hidden sm:block" /> Journey Today.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
          >
            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-slate-900 rounded-full font-black text-[11px] sm:text-lg hover:scale-105 transition-transform shadow-lg shadow-white/10"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="/contact-us"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white/20 text-white rounded-full font-black text-[11px] sm:text-lg hover:bg-white/10 transition-colors"
            >
              <span>Need Assistance?</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
