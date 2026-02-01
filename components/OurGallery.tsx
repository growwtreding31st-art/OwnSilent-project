"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Maximize2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function OurGallery() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Using existing showcase images
  const galleryImages = [
    {
      src: "/images/showcase/image1.png",
      alt: t("gallery.img1.alt"),
    },
    {
      src: "/images/showcase/image2.png",
      alt: t("gallery.img2.alt"),
    },
    {
      src: "/images/showcase/image3.png",
      alt: t("gallery.img3.alt"),
    },
    {
      src: "/images/showcase/image4.png",
      alt: t("gallery.img4.alt"),
    },
    {
      src: "/images/showcase/image5.png",
      alt: t("gallery.img5.alt"),
    },
    {
      src: "/images/home/image1.webp",
      alt: t("gallery.img6.alt"),
    },
    {
      src: "/images/home/image2.webp",
      alt: t("gallery.img7.alt"),
    },
    {
      src: "/images/home/image3.webp",
      alt: t("gallery.img8.alt"),
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryImages.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

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

        {/* Slider Container */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            {/* Main Slider with Enhanced Design */}
            <motion.div
              className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-[0_20px_60px_rgba(23,111,192,0.15)]"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={galleryImages[currentIndex].src}
                    alt={galleryImages[currentIndex].alt}
                    fill
                    className="object-cover"
                    priority={currentIndex === 0}
                  />

                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20" />

                  {/* Image Counter with Premium Design */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-6 right-6 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                  >
                    <span className="text-sm font-bold text-white">
                      {String(currentIndex + 1).padStart(2, "0")} /{" "}
                      {String(galleryImages.length).padStart(2, "0")}
                    </span>
                  </motion.div>

                  {/* Fullscreen Button */}
                  <motion.button
                    onClick={() => setIsFullscreen(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </AnimatePresence>

              {/* Enhanced Navigation Arrows */}
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10 shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10 shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
              </motion.button>

              {/* Enhanced Play/Pause Button */}
              <motion.button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10 shadow-lg"
                aria-label={
                  isAutoPlaying ? "Pause slideshow" : "Play slideshow"
                }
              >
                {isAutoPlaying ? (
                  <Pause className="w-5 h-5" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                )}
              </motion.button>
            </motion.div>

            {/* Enhanced Dots Indicator */}
            <div className="flex items-center justify-center gap-2.5 mt-6">
              {galleryImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    index === currentIndex
                      ? "w-10 bg-gradient-to-r from-[#176FC0] to-[#0F4C85] shadow-lg shadow-blue-500/50"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Enhanced Thumbnail Navigation - Desktop Only */}
            <div className="hidden lg:grid grid-cols-8 gap-3 mt-6">
              {galleryImages.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    index === currentIndex
                      ? "border-[#176FC0] shadow-xl shadow-blue-500/30 scale-105"
                      : "border-slate-200 hover:border-slate-300 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  {index === currentIndex && (
                    <motion.div
                      layoutId="activeThumb"
                      className="absolute inset-0 border-2 border-[#176FC0] rounded-xl"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh]"
            >
              <Image
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
