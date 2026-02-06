"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Reviews() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: t("reviews.review1.name"),
      carModel: t("reviews.review1.car"),
      rating: 5,
      feedback: t("reviews.review1.feedback"),
      location: t("reviews.review1.location"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: t("reviews.review2.name"),
      carModel: t("reviews.review2.car"),
      rating: 5,
      feedback: t("reviews.review2.feedback"),
      location: t("reviews.review2.location"),
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      name: t("reviews.review3.name"),
      carModel: t("reviews.review3.car"),
      rating: 5,
      feedback: t("reviews.review3.feedback"),
      location: t("reviews.review3.location"),
      gradient: "from-sky-500 to-indigo-500",
    },
    {
      name: t("reviews.review4.name"),
      carModel: t("reviews.review4.car"),
      rating: 5,
      feedback: t("reviews.review4.feedback"),
      location: t("reviews.review4.location"),
      gradient: "from-cyan-500 to-blue-500",
    },
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/30 to-white py-8 sm:py-10 lg:py-12 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 lg:mb-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 shadow-lg shadow-blue-500/10 mb-3"
          >
            <Sparkles className="w-3 h-3 text-[#176FC0]" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#176FC0]">
              {t("reviews.badge")}
            </span>
          </motion.div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mb-3 leading-tight">
            {t("reviews.title")}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85]">
                {t("reviews.titleHighlight")}
              </span>
              <motion.div
                className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85] rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {t("reviews.subtitle")}
          </p>
        </motion.div>

        {/* Reviews Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Review Card - Compact */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 border border-slate-200/50 shadow-lg overflow-hidden"
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-50 blur-xl"
                  style={{
                    background: `radial-gradient(circle at center, rgba(23,111,192,0.2), transparent 70%)`,
                  }}
                />

                {/* Decorative Background Gradient */}
                <div
                  className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${reviews[currentIndex].gradient} opacity-5 rounded-full blur-2xl`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex bg-transparent flex-col md:flex-row md:items-start gap-4 sm:gap-6">
                    {/* Left: Quote Icon & Rating */}
                    <div className="flex flex-row md:flex-col items-center md:items-center gap-4 shrink-0">
                      {/* Quote Icon - Compact */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${reviews[currentIndex].gradient} shadow-lg shadow-blue-500/30`}
                        >
                          <Quote
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                          />
                        </div>
                      </motion.div>

                      {/* Star Rating - Compact */}
                      <motion.div
                        className="flex gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {[...Array(reviews[currentIndex].rating)].map(
                          (_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay: 0.4 + i * 0.1,
                                type: "spring",
                                stiffness: 200,
                              }}
                            >
                              <Star className="w-4 h-4 text-[#176FC0] fill-[#176FC0]" />
                            </motion.div>
                          ),
                        )}
                      </motion.div>
                    </div>

                    {/* Right: Feedback & Info */}
                    <div className="flex-1 text-center md:text-left">
                      {/* Feedback - Compact */}
                      <motion.p
                        className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4 font-medium italic"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        "{reviews[currentIndex].feedback}"
                      </motion.p>

                      {/* Customer Info - Compact */}
                      <motion.div
                        className="flex flex-col md:flex-row items-center md:items-end justify-between gap-3 border-t border-slate-100 pt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div>
                          <h4 className="text-base sm:text-lg font-black text-slate-900 leading-none mb-1">
                            {reviews[currentIndex].name}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            {reviews[currentIndex].carModel}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MapPin className="w-3.5 h-3.5" />
                          <p className="text-[10px] uppercase tracking-wider font-bold">
                            {reviews[currentIndex].location}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-blue-200/50 rounded-tr-2xl" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons - Compact */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <motion.button
                onClick={prevReview}
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#176FC0] hover:text-[#176FC0] hover:bg-blue-50 transition-all duration-300 shadow-md"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
              </motion.button>

              {/* Dots Indicator - Compact */}
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? "w-8 bg-gradient-to-r from-[#176FC0] to-[#0F4C85]"
                        : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextReview}
                whileHover={{ scale: 1.1, x: 3 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#176FC0] hover:text-[#176FC0] hover:bg-blue-50 transition-all duration-300 shadow-md"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* Thumbnail Reviews - Compact Grid Hidden on Mobile */}
            <div className="hidden lg:grid grid-cols-4 gap-3 mt-6">
              {reviews.map((review, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className={`text-left p-3 rounded-xl border transition-all duration-300 ${
                    index === currentIndex
                      ? "border-[#176FC0] bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md"
                      : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-[#176FC0] fill-[#176FC0]"
                      />
                    ))}
                  </div>
                  <h5 className="text-xs font-black text-slate-900 mb-0.5 truncate">
                    {review.name}
                  </h5>
                  <p className="text-[10px] text-slate-500 font-medium truncate">
                    {review.carModel}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
