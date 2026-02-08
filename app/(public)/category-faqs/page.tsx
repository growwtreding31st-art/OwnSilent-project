"use client"
import React, { useState, useEffect } from 'react';
import { Search, Calendar, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import categoryBlogsApi from '@/lib/api/categoryBlogs.api';

interface CategoryBlog {
    _id: string;
    title: string;
    slug: string;
    topic: string;
    summary: string;
    publishedAt: string;
    viewCount: number;
    categories: { _id: string; name: string; slug: string }[];
}

export default function CategoryFAQsPage() {
    const [blogs, setBlogs] = useState<CategoryBlog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchBlogs();
    }, [currentPage, searchQuery]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await categoryBlogsApi.public.getAll({
                page: currentPage,
                limit: 12,
                search: searchQuery,
            });
            setBlogs(response.data.blogs || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Category Guides & FAQs</h1>
                    <p className="text-lg text-slate-600 max-w-3xl">
                        Comprehensive guides, tutorials, and frequently asked questions about our product categories.
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="relative max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search guides and FAQs..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No guides found. Try a different search term.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map((blog) => (
                                <Link
                                    key={blog._id}
                                    href={`/category-faqs/${blog.slug}`}
                                    className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <div className="p-6">
                                        {/* Topic Badge */}
                                        <div className="mb-4">
                                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                                {blog.topic}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h2>

                                        {/* Summary */}
                                        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                                            {blog.summary}
                                        </p>

                                        {/* Categories */}
                                        {blog.categories && blog.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {blog.categories.slice(0, 2).map((cat) => (
                                                    <span
                                                        key={cat._id}
                                                        className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded"
                                                    >
                                                        {cat.name}
                                                    </span>
                                                ))}
                                                {blog.categories.length > 2 && (
                                                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                                                        +{blog.categories.length - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Meta */}
                                        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {new Date(blog.publishedAt).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye size={14} />
                                                    {blog.viewCount || 0}
                                                </span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-12">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
