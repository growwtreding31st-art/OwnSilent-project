"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  BookOpen,
  Calendar,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import categoryBlogsApi from "@/lib/api/categoryBlogs.api";

interface CategoryBlog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  featuredImage?: string;
  status: "Draft" | "Published";
  viewCount: number;
  publishedAt?: string;
  categories: any[];
}

export default function AllSpecialPagesPage() {
  const [blogs, setBlogs] = useState<CategoryBlog[]>([]);
  const [allBlogs, setAllBlogs] = useState<CategoryBlog[]>([]); // Cache all blogs
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 12; // Items per page

  // Fetch blogs when search changes
  useEffect(() => {
    fetchBlogs();
  }, [searchQuery]);

  // Update pagination when page or allBlogs changes
  useEffect(() => {
    if (allBlogs.length > 0) {
      const startIndex = (currentPage - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedBlogs = allBlogs.slice(startIndex, endIndex);

      setBlogs(paginatedBlogs);
      setTotalPages(Math.ceil(allBlogs.length / limit));
      setTotalCount(allBlogs.length);
    } else {
      // If allBlogs is empty, reset paginated blogs and counts
      setBlogs([]);
      setTotalPages(1);
      setTotalCount(0);
    }
  }, [currentPage, allBlogs, limit]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      // Using admin endpoint since public endpoint doesn't exist yet
      // Filtering for published items only on the client side
      const response = await categoryBlogsApi.admin.getAll({
        search: searchQuery,
        status: "Published", // Only fetch published items
      });

      const data = response.data;
      const publishedBlogs = (data.blogs || data).filter(
        (blog: CategoryBlog) => blog.status === "Published",
      );

      setAllBlogs(publishedBlogs);
      setCurrentPage(1); // Reset to first page on new search
    } catch (error: any) {
      console.error("Failed to fetch special pages:", error);
      // Set empty state on error
      setAllBlogs([]);
      setBlogs([]);
      setTotalPages(1);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#176FC0] to-blue-600 text-white overflow-hidden pt-20 sm:pt-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-20">
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Animated Icon Container */}
            <div className="relative inline-block mb-3 sm:mb-4">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full animate-pulse"></div>

              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-white/40 shadow-2xl shadow-white/20 transform hover:scale-110 transition-transform duration-300">
                <BookOpen
                  className="w-7 h-7 sm:w-10 sm:h-10 text-white drop-shadow-lg"
                  strokeWidth={2.5}
                />
              </div>

              {/* Floating particles */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div
                className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-200 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>

            {/* Title with gradient */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="inline-block bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent animate-gradient">
                Special Pages
              </span>
            </h1>

            {/* Subtitle with better styling */}
            <p className="text-sm sm:text-lg lg:text-xl text-blue-50/90 max-w-2xl mx-auto px-4 leading-relaxed font-medium">
              Explore our comprehensive collection of{" "}
              <span className="text-white font-semibold">
                educational content
              </span>{" "}
              and expert guides
            </p>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Search Bar */}
        <div className="mb-4 sm:mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-focus-within:text-[#176FC0] transition-colors" />
              <input
                type="text"
                placeholder="Search special pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl sm:rounded-2xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm hover:shadow-md"
              />
            </div>
          </form>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-4 sm:mb-6 text-center">
            <p className="text-xs sm:text-sm font-medium text-slate-600">
              Showing{" "}
              <span className="text-[#176FC0] font-bold">{blogs.length}</span>{" "}
              of <span className="text-[#176FC0] font-bold">{totalCount}</span>{" "}
              special pages
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12 sm:py-20">
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-[#176FC0]" />
          </div>
        )}

        {/* Blog Grid */}
        {!loading && blogs.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/${blog.slug}`}
                className="group flex flex-col bg-white rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-video bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 overflow-hidden">
                  {blog.featuredImage ? (
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/80 via-white to-slate-50/80">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#176FC0]/5 blur-2xl rounded-full"></div>
                        <BookOpen
                          className="relative w-10 h-10 sm:w-14 sm:h-14 text-[#176FC0]/60"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  {blog.status === "Published" && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                      <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-500 text-white shadow-lg">
                        Published
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 flex flex-col h-full">
                  <div className="flex-grow space-y-3 sm:space-y-4">
                    {/* Title */}
                    <h3 className="text-base sm:text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-[#176FC0] transition-colors">
                      {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3">
                      {blog.description}
                    </p>

                    {/* Categories */}
                    {blog.categories && blog.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {blog.categories
                          .slice(0, 3)
                          .map((category: any, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100"
                            >
                              {category.name || category}
                            </span>
                          ))}
                        {blog.categories.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-semibold bg-slate-100 text-slate-600">
                            +{blog.categories.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Meta Info - Always at bottom */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-500">
                      {blog.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span className="hidden sm:inline">
                            {new Date(blog.publishedAt).toLocaleDateString()}
                          </span>
                          <span className="sm:hidden">
                            {new Date(blog.publishedAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" },
                            )}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>{blog.viewCount || 0}</span>
                      </div>
                    </div>
                    <div className="text-[#176FC0] font-semibold text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
                      Read →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-12 sm:py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full mb-4 sm:mb-6">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-2 px-4">
              No special pages found
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto px-4">
              {searchQuery
                ? `No results found for "${searchQuery}". Try a different search term.`
                : "There are no special pages available at the moment."}
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && blogs.length > 0 && totalPages > 1 && (
          <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm font-medium text-slate-600">
                Page{" "}
                <span className="text-[#176FC0] font-bold">{currentPage}</span>{" "}
                of{" "}
                <span className="text-[#176FC0] font-bold">{totalPages}</span>
              </p>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl border-2 border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all text-slate-700 hover:border-[#176FC0] hover:text-[#176FC0]"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`min-w-[32px] h-8 sm:min-w-[40px] sm:h-10 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all ${
                          currentPage === pageNum
                            ? "bg-[#176FC0] text-white shadow-lg shadow-blue-500/30"
                            : "bg-white border-2 border-slate-200 text-slate-700 hover:border-[#176FC0] hover:text-[#176FC0]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl border-2 border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all text-slate-700 hover:border-[#176FC0] hover:text-[#176FC0]"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
