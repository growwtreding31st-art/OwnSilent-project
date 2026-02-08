"use client";
import React, { useEffect } from "react";
import { useRouter, useParams, notFound } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchPublicBlogPostBySlug,
  fetchPublicBlogPosts,
  clearCurrentPost,
} from "@/lib/redux/blogSlice";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Loader2,
  Share2,
  ArrowLeft,
  Calendar,
  User,
  ArrowRight,
  Tag,
} from "lucide-react";
import toast from "react-hot-toast";

interface Post {
  _id: string;
  slug: string;
  title: string;
  content: string;
  featuredImage: string;
  category: { name: string };
  author: { fullName: string; avatar: string };
  createdAt: string;
}

const injectIds = (html: string) => {
  if (typeof html !== 'string') return '';
  return html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, content) => {
    if (attrs.includes('id=')) return match;
    const slug = content.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `<${tag} id="${slug}"${attrs}>${content}</${tag}>`;
  });
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const dispatch = useDispatch<AppDispatch>();
  const {
    currentPost: post,
    posts,
    status,
  } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (slug) {
      dispatch(fetchPublicBlogPostBySlug(slug));
      if ((posts ?? []).length === 0) {
        dispatch(fetchPublicBlogPosts({ limit: 4 }));
      }
    }
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, slug, posts.length]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (status === "loading" || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (status === "failed" && !post) {
    notFound();
  }

  const relatedPosts = posts.filter((p: Post) => p._id !== post._id).slice(0, 3);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <main className="bg-slate-50 min-h-screen mt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            image: post.featuredImage,
            datePublished: post.createdAt,
            author: {
              "@type": "Person",
              name: post.author.fullName,
            },
          }),
        }}
      />
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>

          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
                <Tag className="w-3 h-3" />
                {post.category.name}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <span>{post.author.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-8">

            {/* Table of Contents */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200 mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                Table of Contents
              </h3>
              <nav className="space-y-1">
                <a href="#content-start" className="block text-sm text-slate-600 hover:text-blue-600 hover:pl-1 transition-all">
                  Introduction
                </a>
                {/* JavaScript to dynamically generate TOC from H2/H3 would go here, 
                        but for SSR/SEO friendly approach, we'd need to parse content on server or pre-render.
                        For now, adding basic structure. */}
                <a href="#comments" className="block text-sm text-slate-600 hover:text-blue-600 hover:pl-1 transition-all">
                  Comments
                </a>
              </nav>
            </div>

            <article id="content-start" className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="relative aspect-video w-full bg-slate-100 border-b border-slate-100">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-8 md:p-12">
                <div
                  className="prose prose-lg max-w-none prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-img:rounded-xl"
                  dangerouslySetInnerHTML={{ __html: injectIds(post.content) }}
                />
              </div>
            </article>

            <div className="mt-8 pt-8 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Share:
                </span>
                <div className="flex gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-[#1877F2] hover:text-white transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-[#1DA1F2] hover:text-white transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-[#0A66C2] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            {relatedPosts.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-28">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Related Posts
                  </h3>
                </div>
                <div className="space-y-5">
                  {relatedPosts.map((related: Post) => (
                    <Link
                      key={related._id}
                      href={`/blog/${related.slug}`}
                      className="group flex gap-4 items-start"
                    >
                      <div className="w-20 h-20 rounded-xl bg-slate-100 flex-shrink-0 relative overflow-hidden border border-slate-100">
                        <Image
                          src={related.featuredImage}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <span className="text-xs text-slate-400 font-medium">
                          {new Date(related.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/blog"
                  className="mt-6 flex items-center justify-center text-sm font-bold text-blue-600 hover:text-blue-700 pt-4 border-t border-slate-100"
                >
                  View All Posts <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}