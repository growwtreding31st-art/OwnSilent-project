"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Threads from "./Threads";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Logo from "./ownsilent.png";

export default function WelcomeScreen() {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has seen the welcome screen before
    const hasSeenWelcome = localStorage.getItem("own_silent_welcome_seen");
    if (hasSeenWelcome) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleProceed = () => {
    localStorage.setItem("own_silent_welcome_seen", "true");
    setIsVisible(false);
  };

  if (isVisible === null) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 1, ease: [0.4, 0, 0.2, 1] },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Layer 1: Animated Background Lines */}
          <div className="absolute inset-0 z-0 opacity-40">
            <Threads
              amplitude={2.5}
              distance={0.3}
              color={[1, 1, 1]}
              enableMouseInteraction={true}
            />
          </div>

          {/* Layer 2: Dynamic Ambient Glows */}
          <div className="absolute inset-0 z-1">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1/4 -left-1/4 w-full h-full bg-blue-600/20 rounded-full blur-[160px]"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.15, 0.1],
                x: [0, -40, 0],
                y: [0, 60, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-slate-400/10 rounded-full blur-[160px]"
            />
          </div>

          {/* Layer 3: Glass Overlay - Transparent */}
          <div className="absolute inset-0 z-10 bg-black/5" />

          {/* Layer 4: Content Container */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-6">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-12 sm:p-20 rounded-[40px] border border-white/10 bg-white/[0.01] backdrop-blur-sm shadow-[0_0_80px_rgba(0,0,0,0.3)] max-w-3xl w-full text-center overflow-hidden"
            >
              {/* Internal Accent Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

              {/* Logo Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-10 relative inline-block group"
              >
                <div className="absolute -inset-4 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Image
                  src={Logo}
                  alt="OwnSilent"
                  className="h-16 sm:h-24 w-auto object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  priority
                />
              </motion.div>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mb-4"
              >
                <span className="text-[10px] sm:text-xs font-black tracking-[0.6em] uppercase text-blue-400/80">
                  Precision Engineering
                </span>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-base sm:text-lg text-slate-400 font-light mb-12 leading-relaxed max-w-lg mx-auto italic"
              >
                "The most powerful sound is the presence of absolute silence."
                <span className="block mt-4 not-italic font-medium text-slate-300">
                  Experience the ultimate premium automotive interior upgrade.
                </span>
              </motion.p>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceed}
                  className="group relative px-12 py-5 bg-white rounded-2xl overflow-hidden transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="relative flex items-center gap-3">
                    <span className="text-sm font-black uppercase tracking-widest text-black group-hover:text-white transition-colors duration-500">
                      Proceed
                    </span>
                    <ArrowRight className="w-5 h-5 text-black group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Floating Ornamental Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 2 }}
              className="absolute top-1/2 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
            />
          </div>

          {/* Bottom Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.8, duration: 1.5 }}
            className="absolute bottom-12 left-0 right-0 text-center"
          >
            <p className="text-[9px] font-black uppercase tracking-[1em] text-white">
              OwnSilent &copy; 2024
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
