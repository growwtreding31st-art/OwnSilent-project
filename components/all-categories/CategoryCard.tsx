import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "./types";
import { Icons } from "./CategoryIcons";

const getPlaceholderStyle = (name: string) => {
  const themes = [
    "from-blue-600 to-indigo-700",
    "from-slate-800 to-slate-900",
    "from-indigo-600 to-purple-700",
    "from-cyan-700 to-blue-800",
    "from-slate-700 to-indigo-900",
  ];
  const charCode = (name || "A").charCodeAt(0);
  return themes[charCode % themes.length];
};

export const CategoryCard = ({
  category,
  index,
}: {
  category: Category;
  index: number;
}) => (
  <Link
    href={`/category/${category.slug}`}
    className="group relative flex flex-col bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-slate-200 hover:border-blue-500/50 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.1)] md:hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.15)] transition-all duration-500 h-full transform md:hover:-translate-y-1.5"
  >
    {/* Visual Area - Square Aspect */}
    <div className="relative aspect-square overflow-hidden bg-slate-100">
      {category.featuredImage ? (
        <Image
          src={category.featuredImage}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      ) : (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-white p-4 bg-gradient-to-br ${getPlaceholderStyle(category.name)}`}
        >
          <div className="text-4xl md:text-7xl font-black opacity-30 select-none">
            {category.name.charAt(0).toUpperCase()}
          </div>
          <Icons.Grid className="w-8 h-8 md:w-12 md:h-12 mt-2 md:mt-4 opacity-40 hidden md:block" />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Hover CTA */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 md:translate-y-4 group-hover:translate-y-0 z-10">
        <div className="bg-white/95 backdrop-blur-sm text-slate-900 px-4 py-2 md:px-7 md:py-3 rounded-full font-black text-[8px] md:text-[10px] uppercase tracking-widest shadow-xl">
          View Collection
        </div>
      </div>
    </div>

    {/* Content Area */}
    <div className="p-3 md:p-8 flex flex-col flex-grow bg-white">
      <div className="flex items-start justify-between mb-1.5 md:mb-4 gap-2">
        <h2 className="text-xs md:text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight line-clamp-2">
          {category.name}
        </h2>
        <div className="hidden md:flex w-10 h-10 min-w-10 rounded-2xl bg-slate-50 items-center justify-center group-hover:bg-blue-50 group-hover:rotate-45 transition-all duration-500">
          <Icons.Arrow className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>

      <p className="text-[10px] md:text-sm text-slate-500 line-clamp-2 md:line-clamp-3 leading-relaxed hidden sm:block">
        {category.shortDescription ||
          "Premium high-performance components for automotive excellence."}
      </p>

      <div className="mt-auto pt-2 md:pt-6 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[7px] md:text-[9px] font-black text-slate-300 uppercase tracking-widest">
          Series {index + 1}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-[7px] md:text-[10px] font-black text-blue-600 uppercase tracking-widest">
            Explore
          </span>
          <Icons.Arrow className="w-2 h-2 md:w-3 md:h-3 text-blue-600" />
        </div>
      </div>
    </div>
  </Link>
);
