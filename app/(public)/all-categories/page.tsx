"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchPublicCategories } from "@/lib/redux/productSlice";

// --- Components ---
import { Category } from "@/components/all-categories/types";
import { Icons } from "@/components/all-categories/CategoryIcons";
import { CategoryCard } from "@/components/all-categories/CategoryCard";
import { CategoryPagination } from "@/components/all-categories/CategoryPagination";
import {
  GridSkeleton,
  EmptyState,
} from "@/components/all-categories/CategorySkeletons";

// --- Main Component ---

const ITEMS_PER_PAGE = 8;

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

  // Safe data extraction with type safety
  const allCategoriesList = useMemo<Category[]>(() => {
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

  const isLoading =
    apiFetchStatus === "loading" && allCategoriesList.length === 0;
  const hasData = paginatedItems.length > 0;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-20 md:pt-32 md:pb-32 font-outfit">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
            <Icons.Sparkles />
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
        </header>

        {/* Categories Grid Container */}
        <section className="relative min-h-[400px]">
          {isLoading ? (
            <GridSkeleton />
          ) : hasData ? (
            <div className="space-y-12 md:space-y-20">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                {paginatedItems.map((cat, idx) => (
                  <CategoryCard
                    key={cat._id || idx}
                    category={cat}
                    index={(activePage - 1) * ITEMS_PER_PAGE + idx}
                  />
                ))}
              </div>

              <CategoryPagination
                currentPage={activePage}
                totalPages={totalPagesCount}
                onPageChange={setActivePage}
                totalItems={allCategoriesList.length}
              />
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </main>
  );
}
