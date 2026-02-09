"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchPublicCategories } from "@/lib/redux/productSlice";

/**
 * Hand-coded SVGs to replace lucide-react (Zero package dependency)
 */
const SVGS = {
  Sparkles: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  Grid: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  ),
  Arrow: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  ChevronLeft: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  ChevronRight: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
};

const ITEMS_PER_PAGE = 20; // Increased for better grid view

export default function AllCategoriesGridPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [activePage, setActivePage] = useState(1);

  const { categories, status: apiFetchStatus } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(fetchPublicCategories());
  }, [dispatch]);

  // Scroll to top on page change
  useEffect(() => {
    if (activePage > 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activePage]);

  // Safe data extraction
  const allCategoriesList = useMemo(() => {
    if (!categories) return [];
    if (Array.isArray(categories)) return categories;
    if (
      typeof categories === "object" &&
      Array.isArray((categories as any).categories)
    ) {
      return (categories as any).categories;
    }
    return [];
  }, [categories]);

  const totalPagesCount = Math.ceil(allCategoriesList.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
    return allCategoriesList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [allCategoriesList, activePage]);

  const isCurrentlyFetching = apiFetchStatus === "loading";
  const hasDataToShow = paginatedItems.length > 0;

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

  const handlePageChange = (newPage: number) => {
    setActivePage(newPage);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-20 md:pt-32 md:pb-32 font-outfit">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section - More Compact on Mobile */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
            <SVGS.Sparkles />
            Exclusive Collections
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] md:leading-[0.95]">
            Browse <span className="text-blue-700">Categories</span>
          </h1>
          <p className="text-sm md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto px-4">
            Discover our premium range of high-performance components.{" "}
            {allCategoriesList.length > 0 &&
              `Explore ${allCategoriesList.length} unique series.`}
          </p>
        </div>

        {/* Categories Grid - 2 columns on mobile */}
        <div className="relative">
          {isCurrentlyFetching && allCategoriesList.length === 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] bg-white rounded-2xl md:rounded-[2.5rem] border border-slate-100 animate-pulse shadow-sm"
                />
              ))}
            </div>
          ) : hasDataToShow ? (
            <div className="space-y-12 md:space-y-20">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                {paginatedItems.map((cat: any, idx: number) => (
                  <Link
                    key={cat._id || idx}
                    href={`/category/${cat.slug}`}
                    className="group relative flex flex-col bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-slate-200 hover:border-blue-500/50 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.1)] md:hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.15)] transition-all duration-500 h-full transform md:hover:-translate-y-1.5"
                  >
                    {/* Visual Area - Square Aspect */}
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      {cat.featuredImage ? (
                        <Image
                          src={cat.featuredImage}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div
                          className={`absolute inset-0 flex flex-col items-center justify-center text-white p-4 bg-gradient-to-br ${getPlaceholderStyle(cat.name)}`}
                        >
                          <div className="text-4xl md:text-7xl font-black opacity-30 select-none">
                            {cat.name.charAt(0).toUpperCase()}
                          </div>
                          <SVGS.Grid className="w-8 h-8 md:w-12 md:h-12 mt-2 md:mt-4 opacity-40 hidden md:block" />
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Mobile Badge or Desktop CTA */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 md:translate-y-4 group-hover:translate-y-0 z-10">
                        <div className="bg-white/95 backdrop-blur-sm text-slate-900 px-4 py-2 md:px-7 md:py-3 rounded-full font-black text-[8px] md:text-[10px] uppercase tracking-widest shadow-xl">
                          View
                        </div>
                      </div>
                    </div>

                    {/* Content Area - Scaled for Mobile 2-cols */}
                    <div className="p-3 md:p-8 flex flex-col flex-grow bg-white">
                      <div className="flex items-start justify-between mb-1.5 md:mb-4 gap-2">
                        <h2 className="text-xs md:text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight line-clamp-2">
                          {cat.name}
                        </h2>
                        <div className="hidden md:flex w-10 h-10 min-w-10 rounded-2xl bg-slate-50 items-center justify-center group-hover:bg-blue-50 group-hover:rotate-45 transition-all duration-500">
                          <SVGS.Arrow className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </div>

                      <p className="text-[10px] md:text-sm text-slate-500 line-clamp-2 md:line-clamp-3 leading-relaxed hidden sm:block">
                        {cat.shortDescription ||
                          "Premium high-performance components for automotive excellence."}
                      </p>

                      <div className="mt-auto pt-2 md:pt-6 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[7px] md:text-[9px] font-black text-slate-300 uppercase tracking-widest">
                          SERIES {activePage * 10 + idx}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <span className="text-[7px] md:text-[10px] font-black text-blue-600 uppercase tracking-widest">
                            Explore
                          </span>
                          <SVGS.Arrow className="w-2 h-2 md:w-3 md:h-3 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Enhanced Pagination - Responsive Scaling */}
              {totalPagesCount > 1 && (
                <div className="flex flex-col items-center gap-6 md:gap-8 pt-8 md:pt-10 border-t border-slate-100">
                  <nav className="flex items-center gap-1.5 md:gap-2">
                    <button
                      onClick={() =>
                        handlePageChange(Math.max(1, activePage - 1))
                      }
                      disabled={activePage === 1}
                      className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-blue-600 disabled:opacity-20 transition-all shadow-sm active:scale-90"
                      aria-label="Previous"
                    >
                      <SVGS.ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                    </button>

                    <div className="mx-1 md:mx-2 flex items-center gap-1.5 md:gap-2">
                      {Array.from({ length: totalPagesCount }).map((_, i) => {
                        const pageNum = i + 1;
                        const isVisible =
                          pageNum === 1 ||
                          pageNum === totalPagesCount ||
                          Math.abs(pageNum - activePage) <= 1;

                        if (isVisible) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl font-black text-xs md:text-sm transition-all shadow-sm active:scale-90 ${
                                pageNum === activePage
                                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                  : "bg-white border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                        if (
                          (pageNum === 2 && activePage > 3) ||
                          (pageNum === totalPagesCount - 1 &&
                            activePage < totalPagesCount - 2)
                        ) {
                          return (
                            <span
                              key={pageNum}
                              className="px-1 md:px-2 text-slate-300 font-black text-[10px] md:text-sm"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() =>
                        handlePageChange(
                          Math.min(totalPagesCount, activePage + 1),
                        )
                      }
                      disabled={activePage === totalPagesCount}
                      className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-blue-600 disabled:opacity-20 transition-all shadow-sm active:scale-90"
                      aria-label="Next"
                    >
                      <SVGS.ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                  </nav>

                  <div className="flex items-center gap-3 text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <span>
                      PAGE {activePage} / {totalPagesCount}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{allCategoriesList.length} ITEMS</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl md:rounded-[3rem] border-2 border-dashed border-slate-200">
              <SVGS.Grid className="w-10 h-10 text-slate-200 mx-auto mb-4" />
              <p className="text-lg font-bold text-slate-900">
                No results found
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
