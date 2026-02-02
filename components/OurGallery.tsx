"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import CircularGallery from "./CircularGallery";

export default function OurGallery() {
  const { t } = useLanguage();

  // Gallery items with images and text
  const galleryItems = [
    {
      image: "/images/gallery/engine_service.png",
      text: "Engine Service",
    },
    {
      image: "/images/gallery/lift_inspection.png",
      text: "Lift Inspection",
    },
    {
      image: "/images/gallery/tire_service.png",
      text: "Tire Service",
    },
    {
      image: "/images/gallery/oil_change.png",
      text: "Oil Change",
    },
    {
      image: "/images/gallery/brake_service.png",
      text: "Brake Service",
    },
    {
      image: "/images/gallery/diagnostics.png",
      text: "System Diagnostics",
    },
    {
      image: "/images/gallery/battery_service.png",
      text: "Battery Service",
    },
    {
      image: "/images/gallery/filter_replacement.png",
      text: "Filter Replacement",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 shadow-lg shadow-blue-500/10 mb-4"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="relative flex h-2 w-2"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </motion.span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#176FC0]">
              {t("gallery.badge")}
            </span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            {t("gallery.title")}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85]">
                {t("gallery.titleHighlight")}
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85] rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {t("gallery.subtitle")}
          </p>
        </motion.div>

        {/* 3D Circular Gallery */}
        <div className="w-full h-[400px] sm:h-[450px] lg:h-[500px]">
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="#176FC0"
            borderRadius={0.05}
            font="bold 24px sans-serif"
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      </div>
    </section>
  );
}
