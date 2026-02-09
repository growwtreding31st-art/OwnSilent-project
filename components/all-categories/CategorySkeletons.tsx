import React from "react";
import { Icons } from "./CategoryIcons";

export const GridSkeleton = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="aspect-[4/5] bg-white rounded-2xl md:rounded-[2.5rem] border border-slate-100 animate-pulse shadow-sm"
      />
    ))}
  </div>
);

export const EmptyState = () => (
  <div className="text-center py-20 bg-white rounded-3xl md:rounded-[3rem] border-2 border-dashed border-slate-200">
    <Icons.Grid className="w-10 h-10 text-slate-200 mx-auto mb-4" />
    <p className="text-lg font-bold text-slate-900">No categories found</p>
  </div>
);
