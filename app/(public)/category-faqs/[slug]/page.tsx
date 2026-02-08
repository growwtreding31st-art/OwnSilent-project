"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, Eye, Tag, ChevronDown, ChevronUp, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import categoryBlogsApi from '@/lib/api/categoryBlogs.api';

interface CategoryBlog {
    _id: string;
    title: string;
    slug: string;
    topic: string;
    summary: string;
    description: string;
    content: string;
    publishedAt: string;
    viewCount: number;
    categories: { _id: string; name: string; slug: string }[];
    products: { _id: string; name: string; price: number; images: string[] }[];
    faqs: { _id: string; question: string; answer: string }[];
}

interface Comment {
    _id: string;
    user: { name: string; email: string };
    content: string;
    createdAt: string;
}

export default function CategoryFAQDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [blog, setBlog] = useState<CategoryBlog | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
    const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (slug) {
            fetchBlog();
            fetchComments();
        }
    }, [slug]);

    const fetchBlog = async () => {
        setLoading(true);
        try {
            const response = await categoryBlogsApi.public.getBySlug(slug);
            setBlog(response.data);
        } catch (error) {
            console.error('Failed to fetch blog');
            toast.error('Blog not found');
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await categoryBlogsApi.public.getComments(slug);
            setComments(response.data || []);
        } catch (error) {
            console.error('Failed to fetch comments');
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await categoryBlogsApi.public.submitComment(slug, {
                user: { name: commentForm.name, email: commentForm.email },
                content: commentForm.content,
            });
            toast.success('Comment submitted! It will be visible after moderation.');
            setCommentForm({ name: '', email: '', content: '' });
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to submit comment');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500 text-lg">Blog not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                            {blog.topic}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">{blog.title}</h1>
                    <p className="text-lg text-slate-600 mb-6">{blog.summary}</p>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                        <span className="flex items-center gap-2">
                            <Calendar size={16} />
                            {new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2">
                            <Eye size={16} />
                            {blog.viewCount || 0} views
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Categories */}
                {blog.categories && blog.categories.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <Tag size={16} /> Related Categories
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {blog.categories.map((cat) => (
                                <a
                                    key={cat._id}
                                    href={`/categories/${cat.slug}`}
                                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                                >
                                    {cat.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8">
                    <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>

                {/* FAQs */}
                {blog.faqs && blog.faqs.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {blog.faqs.map((faq) => (
                                <div key={faq._id} className="border border-slate-200 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setExpandedFAQ(expandedFAQ === faq._id ? null : faq._id)}
                                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                                    >
                                        <span className="font-semibold text-slate-900">{faq.question}</span>
                                        {expandedFAQ === faq._id ? (
                                            <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                                        )}
                                    </button>
                                    {expandedFAQ === faq._id && (
                                        <div className="p-4 bg-white border-t border-slate-200">
                                            <p className="text-slate-700">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Products */}
                {blog.products && blog.products.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {blog.products.map((product) => (
                                <a
                                    key={product._id}
                                    href={`/products/${product._id}`}
                                    className="border border-slate-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all"
                                >
                                    {product.images && product.images[0] && (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-32 object-cover rounded-lg mb-3"
                                        />
                                    )}
                                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{product.name}</h3>
                                    <p className="text-blue-600 font-bold">${product.price}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Comments Section */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Comments ({comments.length})</h2>

                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <h3 className="font-semibold text-slate-900 mb-4">Leave a Comment</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                                <input
                                    type="text"
                                    value={commentForm.name}
                                    onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                                <input
                                    type="email"
                                    value={commentForm.email}
                                    onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Comment *</label>
                            <textarea
                                value={commentForm.content}
                                onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={16} />
                            {submitting ? 'Submitting...' : 'Submit Comment'}
                        </button>
                        <p className="text-xs text-slate-500 mt-2">Your comment will be visible after moderation.</p>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {comments.length === 0 ? (
                            <p className="text-slate-500 text-center py-8">No comments yet. Be the first to comment!</p>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment._id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="font-semibold text-slate-900">{comment.user.name}</p>
                                            <p className="text-xs text-slate-500">
                                                {new Date(comment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-slate-700">{comment.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
