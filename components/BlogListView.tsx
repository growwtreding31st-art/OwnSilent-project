"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowRight,
  Star,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchPublicBlogPosts } from "@/lib/redux/blogSlice";
import useEmblaCarousel from "embla-carousel-react";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TrustedBrandsSection from "@/components/TrustedBrandsSection";
import InstagramFeedSection from "@/components/InstagramFeedSection";

// Color Theme: #176FC0, #0F4C85

interface Post {
  _id: string;
  slug: string;
  title: string;
  featuredImage: string;
  category: { name: string } | null;
  author: { fullName: string; avatar?: string } | null;
  createdAt: string;
  content: string;
}

const stripHtml = (html: string | undefined): string => {
  if (!html) return "";
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>?/gm, "");
  }
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const getInitials = (name: string | undefined): string => {
  if (!name) return "A";
  const names = name.split(" ");
  const initials = names.map((n) => n[0]).join("");
  return initials.toUpperCase().substring(0, 2);
};

const BlogCard = ({ post }: { post: Post }) => {
  const plainTextContent = stripHtml(post.content);

  return (
    <article className="group h-full bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-[#176FC0]/10 transition-all duration-300 flex flex-col hover:-translate-y-1.5 hover:border-[#176FC0]/40">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      >
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-[#176FC0]/10 border border-[#176FC0]/20 text-[#0F4C85] text-xs font-bold rounded-full shadow-sm">
            {post.category?.name || "General"}
          </span>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#176FC0] transition-colors line-clamp-2">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
            {plainTextContent}
          </p>
        </div>

        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-full overflow-hidden bg-slate-100 ring-2 ring-white">
              {post.author?.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author?.fullName || "Author"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-slate-200 text-slate-500 text-xs font-bold">
                  {getInitials(post.author?.fullName)}
                </div>
              )}
            </div>
            <span className="text-sm font-semibold text-slate-800">
              {post.author?.fullName || "Editor"}
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-500 group-hover:bg-[#176FC0] group-hover:text-white transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

const BlogPostsDisplay = ({ posts }: { posts: Post[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <div className="relative md:hidden -mx-4 px-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 py-4">
            {(posts ?? []).map((post) => (
              <div
                key={post._id}
                className="flex-[0_0_85%] sm:flex-[0_0_60%] pl-4 min-w-0"
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
        {(canScrollPrev || canScrollNext) && (
          <div className="flex justify-end gap-2 mt-2 px-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="h-10 w-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shadow-sm hover:border-[#176FC0]/50 hover:text-[#176FC0]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="h-10 w-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shadow-sm hover:border-[#176FC0]/50 hover:text-[#176FC0]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(posts ?? []).map((post: Post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

const SkeletonLoader = () => (
  <div className="bg-slate-50 min-h-screen">
    <div className="relative bg-white border-b border-slate-100 pt-32 pb-20">
      <div className="container mx-auto px-4 text-center">
        <div className="h-10 w-64 bg-slate-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 w-96 bg-slate-200 rounded-lg mx-auto animate-pulse"></div>
      </div>
    </div>
    <div className="container mx-auto px-4 py-16">
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden h-[450px] animate-pulse"
          >
            <div className="h-48 bg-slate-200 w-full"></div>
            <div className="p-6">
              <div className="h-4 w-20 bg-slate-200 rounded-full mb-4"></div>
              <div className="h-6 w-full bg-slate-200 rounded mb-3"></div>
              <div className="h-6 w-2/3 bg-slate-200 rounded mb-6"></div>
              <div className="space-y-2 mb-8">
                <div className="h-3 w-full bg-slate-200 rounded"></div>
                <div className="h-3 w-full bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="h-9 w-9 rounded-full bg-slate-200"></div>
                <div className="h-3 w-24 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function BlogPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(fetchPublicBlogPosts({}));
  }, [dispatch]);

  if (status === "loading" && (posts ?? []).length === 0) {
    return <SkeletonLoader />;
  }

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="relative bg-white pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-40 z-0">
          <div className="absolute top-[-20%] left-[-15%] w-[40%] h-[50%] rounded-full bg-blue-100 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-15%] w-[40%] h-[50%] rounded-full bg-indigo-100 blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-slate-200 text-[#176FC0] text-sm font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Star className="w-4 h-4" />
            Our Blog
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            Latest News & Articles
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Dive into the world of automotive excellence with our expert guides,
            industry news, and product updates.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20 pb-24">
        {(posts ?? []).length > 0 ? (
          <BlogPostsDisplay posts={posts} />
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No Articles Found
            </h3>
            <p className="text-slate-500">
              We couldn't find any posts at the moment. Please check back later.
            </p>
          </div>
        )}

        <div className="mt-24 space-y-24">
          <WhyChooseUsSection />
          <TrustedBrandsSection />
          <InstagramFeedSection />
        </div>
      </div>
    </main>
  );
}