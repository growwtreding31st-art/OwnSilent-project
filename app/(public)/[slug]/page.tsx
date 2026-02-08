"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Loader2,
    Calendar,
    User,
    ArrowLeft,
    Facebook,
    Twitter,
    Linkedin,
    Copy,
    Eye,
    MessageSquare,
    ArrowRight,
    HelpCircle,
    Send
} from "lucide-react";
import toast from "react-hot-toast";
import categoryBlogsApi from "@/lib/api/categoryBlogs.api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// --- Interfaces ---

interface FAQ {
    _id: string;
    question: string;
    answer: string;
    displayOrder: number;
}

interface Comment {
    _id: string;
    user: { name: string; email: string };
    content: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Spam';
    createdAt: string;
}

interface Product {
    _id: string;
    slug: string;
    name: string;
    price: number;
    images: string[];
    description?: string | { fullDescription?: string };
}

interface CategoryBlog {
    _id: string;
    title: string;
    description: string;
    content: string;
    slug: string;
    featuredImage?: string;
    publishedAt: string;
    updatedAt?: string; // Add this
    createdAt?: string;
    author: {
        _id: string;
        fullName: string;
    };
    category?: {
        _id: string;
        name: string;
    };
    viewCount: number;
    faqs?: FAQ[];
    comments?: Comment[];
    relatedProducts?: Product[];
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
        canonicalUrl?: string;
        ogTitle?: string;
        ogDescription?: string;
        ogImage?: string;
        robots?: string;
        structuredData?: string;
    };
    updates?: Update[];
}

interface Update {
    _id: string;
    title: string;
    content: string;
    date: string;
    image?: string;
}

// --- Components ---

const injectIds = (html: string) => {
    if (typeof html !== 'string') return '';
    return html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, content) => {
        if (attrs.includes('id=')) return match;
        const slug = content.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<${tag} id="${slug}"${attrs}>${content}</${tag}>`;
    });
};

const ProductCard: React.FC<{ part: Product }> = ({ part }) => {
    const descriptionText = typeof part.description === 'string'
        ? part.description
        : part.description?.fullDescription;

    return (
        <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-slate-100 transition-all duration-300 ease-in-out hover:shadow-md h-full">
            <Link href={`/product/${part.slug}`} className="block relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                    src={part.images[0] || '/placeholder.png'}
                    alt={part.name}
                    fill
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 20vw"
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
            </Link>
            <div className="p-4 flex flex-col flex-grow gap-2">
                <h4 className="font-bold text-slate-800 text-sm leading-tight line-clamp-2" title={part.name}>
                    <Link href={`/product/${part.slug}`} className="hover:text-[#176FC0] transition-colors">
                        {part.name}
                    </Link>
                </h4>
                {descriptionText && (
                    <p className="text-xs text-slate-500 line-clamp-2">
                        {descriptionText}
                    </p>
                )}
                <div className="mt-auto pt-2 flex justify-between items-center border-t border-slate-50">
                    <p className="text-slate-900 font-bold text-base">
                        ${part.price?.toLocaleString('en-US') || '0'}
                    </p>
                    <Link href={`/product/${part.slug}`} className="flex items-center justify-center text-[#176FC0] text-xs font-bold hover:underline">
                        View <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};



export default function SpecialPageDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [blog, setBlog] = useState<CategoryBlog | null>(null);
    const [loading, setLoading] = useState(true);
    const [commentUser, setCommentUser] = useState({ name: '', email: '' });
    const [commentContent, setCommentContent] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const response = await categoryBlogsApi.public.getBySlug(slug);
                setBlog(response.data);
            } catch (err: any) {
                console.error("Error fetching blog:", err);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchBlog();
        }
    }, [slug]);

    useEffect(() => {
        if (blog) {
            // Update Title
            document.title = blog.seo?.metaTitle || blog.title || 'Special Page';

            // Helper to update or create meta tag
            const updateMeta = (name: string, content: string, attribute: string = 'name') => {
                if (!content) return;
                let element = document.querySelector(`meta[${attribute}="${name}"]`);
                if (!element) {
                    element = document.createElement('meta');
                    element.setAttribute(attribute, name);
                    document.head.appendChild(element);
                }
                element.setAttribute('content', content);
            };

            // Update Meta Tags
            updateMeta('description', blog.seo?.metaDescription || blog.description?.substring(0, 160) || '');
            updateMeta('keywords', blog.seo?.keywords?.join(', ') || '');
            updateMeta('robots', blog.seo?.robots || 'index, follow');

            // Canonical
            const canonicalUrl = blog.seo?.canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.setAttribute('rel', 'canonical');
                document.head.appendChild(canonical);
            }
            canonical.setAttribute('href', canonicalUrl);

            // Open Graph
            updateMeta('og:title', blog.seo?.ogTitle || blog.seo?.metaTitle || blog.title || '', 'property');
            updateMeta('og:description', blog.seo?.ogDescription || blog.seo?.metaDescription || blog.description?.substring(0, 160) || '', 'property');
            updateMeta('og:image', blog.seo?.ogImage || blog.featuredImage || '', 'property');
            updateMeta('og:url', canonicalUrl, 'property');

            // JSON-LD Structured Data
            if (blog.seo?.structuredData) {
                let script = document.getElementById('json-ld-sd');
                if (!script) {
                    script = document.createElement('script');
                    script.id = 'json-ld-sd';
                    script.setAttribute('type', 'application/ld+json');
                    document.head.appendChild(script);
                }
                script.textContent = blog.seo.structuredData;
            }
        }
    }, [blog]);

    const handleCopyLink = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!blog) return;

        try {
            setSubmittingComment(true);
            await categoryBlogsApi.public.submitComment(blog.slug, {
                user: commentUser,
                content: commentContent
            });
            toast.success("Comment submitted for moderation!");
            setCommentContent('');
            // Optional: clear user fields or keep them
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to submit comment");
        } finally {
            setSubmittingComment(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-12 h-12 animate-spin text-slate-500" />
            </div>
        );
    }

    if (!blog) return notFound();

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    return (
        <main className="bg-white">
            {/* Hero Section - Matches Collections Page */}
            <section className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center text-center text-white">
                <Image
                    src={blog.featuredImage || '/placeholder.png'}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Back Link - Fixed top-left for better accessibility */}
                <div className="absolute top-6 left-6 z-20 hidden md:block">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-semibold text-white/90 hover:text-white transition-all group px-5 py-2.5 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full border border-white/10"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </div>

                <div className="relative z-10 p-4 w-full max-w-7xl mx-auto flex flex-col items-center">
                    {blog.category && (
                        <div className="mb-6">
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-bold uppercase tracking-wider">
                                {blog.category.name}
                            </span>
                        </div>
                    )}

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg">
                        {blog.title}
                    </h1>

                    <p className="text-base md:text-lg text-white/90 max-w-6xl mx-auto leading-relaxed mb-8 px-4 drop-shadow-md">
                        {blog.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-white/80">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{blog.author?.fullName || 'Admin'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                                {new Date(blog.publishedAt || Date.now()).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>{blog.viewCount || 0} Views</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-slate-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Main Content Column */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Table of Contents */}
                            <div className="bg-slate-50/50 rounded-2xl border border-slate-200 p-6 mb-8">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#176FC0]/10 text-[#176FC0]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                    </span>
                                    On this page
                                </h3>
                                <nav className="space-y-1">
                                    <a href="#mark" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-white hover:text-[#176FC0] hover:shadow-sm transition-all group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#176FC0] transition-colors" />
                                        Introduction
                                    </a>

                                    {blog.updates && blog.updates.length > 0 && (
                                        <div className="py-1">
                                            <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                <Calendar className="w-3 h-3" />
                                                Updates Timeline
                                            </div>
                                            <div className="ml-3 pl-3 border-l border-slate-200 mt-1 space-y-1">
                                                {blog.updates.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(update => {
                                                    const updateSlug = update.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                                    return (
                                                        <a
                                                            key={update._id}
                                                            href={`#${updateSlug}`}
                                                            className="block px-3 py-1.5 text-sm text-slate-500 rounded-md hover:bg-white hover:text-[#176FC0] hover:shadow-sm transition-all truncate"
                                                        >
                                                            {update.title}
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {blog.faqs && blog.faqs.length > 0 && (
                                        <a href="#faqs" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-white hover:text-[#176FC0] hover:shadow-sm transition-all group">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#176FC0] transition-colors" />
                                            Frequently Asked Questions
                                        </a>
                                    )}

                                    <a href="#comments" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-white hover:text-[#176FC0] hover:shadow-sm transition-all group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#176FC0] transition-colors" />
                                        Comments
                                    </a>
                                </nav>
                            </div>

                            {/* Blog Content (Main Body) */}
                            <article id="mark" className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-slate-100 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#176FC0]"></div>
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                        Introduction
                                        <a href="#mark" className="text-slate-300 hover:text-[#176FC0] transition-colors" title="Link to introduction">
                                            <span className="sr-only">Anchor link</span>
                                            #
                                        </a>
                                    </h2>
                                    <p className="text-sm font-semibold text-[#176FC0] mt-1 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(blog.publishedAt || blog.createdAt || Date.now()).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>

                                <div
                                    className="prose prose-lg max-w-none prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-[#176FC0] prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-img:rounded-xl"
                                    dangerouslySetInnerHTML={{ __html: injectIds(blog.content) }}
                                />

                                {/* Share Buttons */}
                                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                                        Share this article:
                                    </span>
                                    <div className="flex gap-3">
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-[#1877F2] hover:text-white transition-all"
                                        >
                                            <Facebook className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${blog.title}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-[#1DA1F2] hover:text-white transition-all"
                                        >
                                            <Twitter className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={handleCopyLink}
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-800 hover:text-white transition-all"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* Updates Section */}
                            {blog.updates && blog.updates.length > 0 && (
                                <div className="space-y-8">
                                    <div id="updates-timeline" className="flex items-center gap-4">
                                        <div className="h-px flex-1 bg-slate-200"></div>
                                        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest">Updates Timeline</h2>
                                        <div className="h-px flex-1 bg-slate-200"></div>
                                    </div>

                                    {/* Render updates Oldest to Newest (Chronological) */}
                                    {blog.updates.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((update) => {
                                        const updateSlug = update.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                        return (
                                            <div key={update._id} id={updateSlug} className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-slate-100 relative overflow-hidden group">
                                                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#176FC0]"></div>

                                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                                            {update.title}
                                                            <a href={`#${updateSlug}`} className="text-slate-300 hover:text-[#176FC0] transition-colors" title="Link to this update">
                                                                <span className="sr-only">Anchor link</span>
                                                                #
                                                            </a>
                                                        </h3>
                                                        <p className="text-sm font-semibold text-[#176FC0] mt-1 flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            {new Date(update.date).toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                </div>

                                                {update.image && (
                                                    <div className="mb-6 relative h-[300px] w-full rounded-xl overflow-hidden bg-slate-100">
                                                        <Image
                                                            src={update.image}
                                                            alt={update.title}
                                                            fill
                                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                )}

                                                <div
                                                    className="prose prose-lg max-w-none prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-[#176FC0] prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-img:rounded-xl"
                                                    dangerouslySetInnerHTML={{ __html: injectIds(update.content) }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* FAQ Section */}
                            {blog.faqs && blog.faqs.length > 0 && (
                                <div id="faqs" className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-slate-100">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <HelpCircle className="w-6 h-6 text-[#176FC0]" />
                                        Frequently Asked Questions
                                    </h3>
                                    <Accordion type="single" collapsible className="w-full">
                                        {blog.faqs.map((faq) => (
                                            <AccordionItem key={faq._id} value={faq._id}>
                                                <AccordionTrigger className="text-slate-800 font-semibold text-left">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-slate-600 leading-relaxed">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            )}

                            {/* Comments Section */}
                            <div id="comments" className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-slate-100">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                                    <MessageSquare className="w-6 h-6 text-[#176FC0]" />
                                    Comments
                                </h3>

                                {/* Comment List */}
                                <div className="space-y-6 mb-10">
                                    {blog.comments && blog.comments.length > 0 ? (
                                        blog.comments.map((comment) => (
                                            <div key={comment._id} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-slate-900">{comment.user.name}</h4>
                                                    <span className="text-xs text-slate-500">
                                                        {new Date(comment.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 text-sm leading-relaxed">{comment.content}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-500 italic">No comments yet. Be the first to share your thoughts!</p>
                                    )}
                                </div>

                                {/* Comment Form */}
                                <form onSubmit={handleCommentSubmit} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-900 mb-4">Leave a specific comment</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input
                                            type="text"
                                            placeholder="Your Name *"
                                            value={commentUser.name}
                                            onChange={e => setCommentUser({ ...commentUser, name: e.target.value })}
                                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                                            required
                                        />
                                        <input
                                            type="email"
                                            placeholder="Your Email *"
                                            value={commentUser.email}
                                            onChange={e => setCommentUser({ ...commentUser, email: e.target.value })}
                                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                                            required
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Write your comment here..."
                                        value={commentContent}
                                        onChange={e => setCommentContent(e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] mb-4"
                                        rows={4}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={submittingComment}
                                        className="inline-flex items-center gap-2 bg-[#176FC0] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-70"
                                    >
                                        {submittingComment ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
                                        Submit Comment
                                    </button>
                                </form>
                            </div>

                        </div>

                        {/* Sidebar / Related Products */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-8">
                                {/* Related Products Widget */}
                                {blog.relatedProducts && blog.relatedProducts.length > 0 && (
                                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                        <div className="p-6 border-b border-slate-100 bg-slate-50">
                                            <h3 className="font-bold text-slate-900 text-lg">Related Products</h3>
                                            <p className="text-slate-500 text-sm mt-1">
                                                Check out these top-rated products mentioned in or related to this article.
                                            </p>
                                        </div>
                                        <div className="p-0">
                                            <div className="flex flex-col gap-6 p-4 max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent snap-y">
                                                {blog.relatedProducts.map(product => (
                                                    <div key={product._id} className="w-full snap-start flex-shrink-0">
                                                        <ProductCard part={product} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Categories Widget (Placeholder/Optional) */}
                                {blog.category && (
                                    <div className="bg-[#176FC0] rounded-2xl shadow-lg p-6 text-white text-center">
                                        <h3 className="font-bold text-xl mb-2">Explore {blog.category.name}</h3>
                                        <p className="text-blue-100 text-sm mb-6">Find the best parts for your vehicle in this category.</p>
                                        <Link
                                            href={`/collections/${blog.category.name.toLowerCase().replace(/ /g, '-')}`}
                                            className="inline-block w-full bg-white text-[#176FC0] font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors"
                                        >
                                            View Collection
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
