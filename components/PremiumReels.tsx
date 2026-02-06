"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Play, ArrowRight, Video } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";

const REELS = ["DRCP2ZoEuyg", "DRBa_DYEl6t", "DQ9dLmiEgrt"];

export default function PremiumReels() {
  const { t } = useLanguage();
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 640px)": { active: false }, // Disable carousel on tablet/desktop to keep grid
    },
  });

  return (
    <section className="relative pt-2 pb-12 sm:pt-4 sm:pb-16 bg-white overflow-hidden">
      {/* Background Cinematic Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-4"
            >
              <Video size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Performance in Motion
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2"
            >
              Watch Our <span className="text-[#176FC0]">Latest Reels</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-lg leading-relaxed"
            >
              Experience the roar of high-performance engineering. Our latest
              builds, tests, and track days.
            </motion.p>
          </div>

          <motion.a
            href="https://www.instagram.com/ownsilent.international/reels/"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl transition-all font-bold text-sm tracking-widest uppercase shadow-lg shadow-slate-200"
          >
            <Instagram size={18} />
            Visit Reels
            <ArrowRight size={16} />
          </motion.a>
        </div>

        {/* Reels Container - Slider on Mobile, Grid on Desktop */}
        <div className="overflow-hidden sm:overflow-visible" ref={emblaRef}>
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {REELS.map((id, index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative flex-none w-[85%] sm:w-auto group aspect-[9/16] bg-slate-50 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100"
              >
                <iframe
                  src={`https://www.instagram.com/reel/${id}/embed`}
                  className="absolute inset-0 w-full h-full border-0"
                ></iframe>

                {/* Decorative Frame Overlays */}
                <div className="absolute inset-0 pointer-events-none border-[8px] border-white rounded-3xl z-20 shadow-inner" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Help Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-6 p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center"
        >
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
            💡 To add your reels: Replace the codes in{" "}
            <code className="text-[#176FC0]">PremiumReels.tsx</code> with your
            Instagram Reel shortcodes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
