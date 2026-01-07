import React from 'react';
import Link from 'next/link';
import { Instagram, ArrowUpRight, Camera } from 'lucide-react';

export default function InstagramFeedSection() {
    return (
      <section className="relative bg-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative mx-auto px-4 z-10">
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 shadow-lg shadow-purple-500/20 mb-6 group transition-transform hover:scale-110 duration-300">
              <Instagram className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              Follow Our Journey
            </h2>

            <Link
              href="https://www.instagram.com/ownsilent.international/"
              target="_blank"
              className="inline-flex items-center gap-2 text-lg sm:text-xl font-medium text-slate-500 hover:text-[#176FC0] transition-colors"
            >
              <span>@ownsilent.international</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-200/70 p-2 sm:p-4">
              <div className="relative w-full overflow-hidden rounded-xl bg-slate-50">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 z-0">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-10 h-10" />
                    <span className="text-sm font-medium">Loading Feed...</span>
                  </div>
                </div>

                <iframe
                  title="Instagram Feed for ownsilent.international"
                  scrolling="no"
                  className="relative z-10 w-full border-none min-h-[500px] sm:min-h-[600px] md:min-h-[683px]"
                  src="https://www.instagram.com/ownsilent.international/embed"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="https://www.instagram.com/ownsilent.international/"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#176FC0] to-[#1461A8] hover:to-[#0F4C85] rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
              >
                <span>View on Instagram</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
}