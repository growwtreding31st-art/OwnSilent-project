"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Play, ArrowRight, Video } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";

const REELS = ["DRCP2ZoEuyg", "DRBa_DYEl6t", "DQ9dLmiEgrt"];

export default function PremiumReels() {
  const { t } = useLanguage();
  const [activeReel, setActiveReel] = React.useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 640px)": { active: false },
    },
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

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
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-4"
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
              className="text-xl sm:text-5xl font-black text-slate-900 tracking-tight"
            >
              Watch Our <span className="text-[#176FC0]">Latest Reels</span>
            </motion.h2>
          </div>

          <motion.a
            href="https://www.instagram.com/ownsilent.international/reels/"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl transition-all font-bold text-[10px] sm:text-sm tracking-widest uppercase shadow-lg shadow-slate-200"
          >
            <Instagram size={14} className="sm:w-[18px] sm:h-[18px]" />
            Visit Reels
            <ArrowRight size={14} className="sm:w-[16px] sm:h-[16px]" />
          </motion.a>
        </div>

        {/* Reels Container - Slider on Mobile, Grid on Desktop */}
        <div
          className="overflow-hidden sm:overflow-visible relative"
          ref={emblaRef}
        >
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {REELS.map((id, index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative flex-none w-[90%] sm:w-auto group aspect-[1/1.2] bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100"
              >
                <iframe
                  src={`https://www.instagram.com/reel/${id}/embed`}
                  className="absolute inset-0 w-full h-full border-0"
                ></iframe>

                {/* Drag Proxy Overlay for Mobile */}
                <div
                  onClick={() => setActiveReel(id)}
                  className={`absolute inset-0 z-20 sm:hidden transition-opacity duration-300 ${
                    activeReel === id
                      ? "pointer-events-none opacity-0"
                      : "pointer-events-auto opacity-100"
                  }`}
                >
                  <div className="absolute inset-x-0 bottom-4 flex justify-center">
                    <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-white/20">
                      <Play
                        size={10}
                        className="text-[#176FC0] fill-[#176FC0]"
                      />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">
                        Tap to Play
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Dots - Mobile only */}
          <div className="flex sm:hidden justify-center gap-1 mt-6">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === selectedIndex
                    ? "w-8 h-1.5 bg-[#176FC0]"
                    : "w-2 h-2 bg-slate-200"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
