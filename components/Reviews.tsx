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
    <section className="relative bg-gradient-to-b from-white via-slate-50/30 to-white py-12 sm:py-16 lg:py-20 overflow-hidden">
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
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 shadow-lg shadow-blue-500/10 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#176FC0]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#176FC0]">
              {t("reviews.badge")}
            </span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            {t("reviews.title")}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176FC0] via-[#1461A8] to-[#0F4C85]">
                {t("reviews.titleHighlight")}
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
            {t("reviews.subtitle")}
          </p>
        </motion.div>

        {/* Reviews Slider */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Review Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/50 shadow-[0_20px_60px_rgba(23,111,192,0.12)] overflow-hidden"
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl opacity-50 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at center, rgba(23,111,192,0.2), transparent 70%)`,
                  }}
                />

                {/* Decorative Background Gradient */}
                <div
                  className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${reviews[currentIndex].gradient} opacity-5 rounded-full blur-3xl`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Quote Icon */}
                  <motion.div
                    className="mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${reviews[currentIndex].gradient} shadow-lg shadow-blue-500/30`}
                    >
                      <Quote
                        className="w-10 h-10 text-white"
                        fill="currentColor"
                      />
                    </div>
                  </motion.div>

                  {/* Star Rating */}
                  <motion.div
                    className="flex gap-1.5 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.4 + i * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <Star className="w-6 h-6 text-[#176FC0] fill-[#176FC0]" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Feedback */}
                  <motion.p
                    className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 font-medium italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    "{reviews[currentIndex].feedback}"
                  </motion.p>

                  {/* Divider */}
                  <motion.div
                    className={`h-1 bg-gradient-to-r ${reviews[currentIndex].gradient} rounded-full mb-6`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    style={{ transformOrigin: "left" }}
                  />

                  {/* Customer Info */}
                  <motion.div
                    className="flex items-center justify-between flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div>
                      <h4 className="text-xl font-black text-slate-900 mb-1">
                        {reviews[currentIndex].name}
                      </h4>
                      <p className="text-sm text-slate-500 font-medium">
                        {reviews[currentIndex].carModel}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-4 h-4" />
                      <p className="text-xs uppercase tracking-wider font-bold">
                        {reviews[currentIndex].location}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-6 right-6 w-20 h-20 border-t-2 border-r-2 border-blue-200/50 rounded-tr-3xl" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <motion.button
                onClick={prevReview}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="group w-14 h-14 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#176FC0] hover:text-[#176FC0] hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex gap-2.5">
                {reviews.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? "w-10 bg-gradient-to-r from-[#176FC0] to-[#0F4C85] shadow-lg shadow-blue-500/50"
                        : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextReview}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="group w-14 h-14 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#176FC0] hover:text-[#176FC0] hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* Thumbnail Reviews - Desktop Only */}
            <div className="hidden lg:grid grid-cols-4 gap-4 mt-8">
              {reviews.map((review, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                    index === currentIndex
                      ? "border-[#176FC0] bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl shadow-blue-500/20"
                      : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-lg"
                  }`}
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-[#176FC0] fill-[#176FC0]"
                      />
                    ))}
                  </div>
                  <h5 className="text-sm font-black text-slate-900 mb-1">
                    {review.name}
                  </h5>
                  <p className="text-xs text-slate-500 font-medium">
                    {review.carModel}
                  </p>
                  {index === currentIndex && (
                    <motion.div
                      layoutId="activeReview"
                      className={`mt-3 h-1 bg-gradient-to-r ${review.gradient} rounded-full`}
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
    </section>
  );
}
