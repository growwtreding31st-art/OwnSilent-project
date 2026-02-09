import React from "react";
import { Icons } from "./CategoryIcons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}

export const CategoryPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 pt-8 md:pt-10 border-t border-slate-100">
      <nav className="flex items-center gap-1.5 md:gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-blue-600 disabled:opacity-20 transition-all shadow-sm active:scale-90"
          aria-label="Previous"
        >
          <Icons.ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        <div className="mx-1 md:mx-2 flex items-center gap-1.5 md:gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isVisible =
              pageNum === 1 ||
              pageNum === totalPages ||
              Math.abs(pageNum - currentPage) <= 1;

            if (isVisible) {
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl font-black text-xs md:text-sm transition-all shadow-sm active:scale-90 ${
                    pageNum === currentPage
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-white border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600"
                  }`}
                >
                  {pageNum}
                </button>
              );
            }
            if (
              (pageNum === 2 && currentPage > 3) ||
              (pageNum === totalPages - 1 && currentPage < totalPages - 2)
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
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-blue-600 disabled:opacity-20 transition-all shadow-sm active:scale-90"
          aria-label="Next"
        >
          <Icons.ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </nav>

      <div className="flex items-center gap-3 text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        <span>
          PAGE {currentPage} / {totalPages}
        </span>
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        <span>{totalItems} ITEMS</span>
      </div>
    </div>
  );
};
