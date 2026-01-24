"use client"
import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicBlogPosts } from '@/lib/redux/blogSlice';
import { ChevronLeft as LucideChevronLeft, ChevronRight as LucideChevronRight, ArrowRight as LucideArrowRight } from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";

// Color Theme from Login Page:
// Primary Blue: #176FC0
// Darker Blue: #0F4C85
// Gradient Mid: #1461A8

const stripHtml = (html) => {
  if (typeof window === "undefined") return html.replace(/<[^>]*>?/gm, "");
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const BlogCard = ({ article }) => {
  const plainTextContent = stripHtml(article.content);
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200/80 h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1.5">
      <Link
        href={`/blog/${article.slug}`}
        className="block aspect-[16/9] overflow-hidden"
      >
        <Image
          src={article.featuredImage}
          alt={article.title}
          width={400}
          height={225}
          className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div>
          {/* Changed category tag color to match the theme */}
          <span className="inline-block bg-[#176FC0]/10 text-[#0F4C85] text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
            {article.category?.name || 'Uncategorized'}
          </span>
          <h3 className="font-bold text-lg text-slate-900 leading-tight">
            <Link
              href={`/blog/${article.slug}`}
              // Changed link hover color to match the theme
              className="hover:text-[#176FC0] transition-colors line-clamp-2"
            >
              {article.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-slate-600 line-clamp-3">
            {plainTextContent.substring(0, 100)}...
          </p>
        </div>
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-3">
          <div>
            <p className="font-semibold text-sm text-slate-800">
              {article.author?.fullName || 'Anonymous'}
            </p>
            <p className="text-xs text-slate-500">
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="overflow-hidden">
    <div className="flex -ml-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex-shrink-0 flex-grow-0 basis-full sm:basis-1/2 lg:basis-1/4 pl-6"
        >
          <div className="bg-white rounded-xl border border-slate-200/80">
            <div className="aspect-[16/9] bg-slate-200"></div>
            <div className="p-5">
              <div className="h-5 w-1/4 bg-slate-200 rounded-full mb-4"></div>
              <div className="h-6 w-full bg-slate-200 rounded mb-2"></div>
              <div className="h-6 w-4/5 bg-slate-200 rounded mb-4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function BlogSection() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.blog);
  const { t } = useLanguage();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    dispatch(fetchPublicBlogPosts({ limit: 6 }));
  }, [dispatch]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="blog" className="bg-white py-2 sm:py-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              {t("blog.title")}{" "}
              {/* Changed highlight color to match the theme */}
              <span className="text-[#176FC0]">{t("blog.highlight")}</span>
            </h2>
            <p className="mt-3 text-lg text-slate-600 max-w-xl">
              {t("blog.subtitle")}
            </p>
          </div>
          <div className="flex space-x-3 mt-6 md:mt-0">
            <button
              onClick={scrollPrev}
              className="h-12 w-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <LucideChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="h-12 w-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <LucideChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {status === "loading" && posts.length === 0 ? (
          <SkeletonLoader />
        ) : (
          <div className="overflow-hidden -mx-3" ref={emblaRef}>
            <div className="flex">
              {(posts ?? []).map((article) => (
                <div
                  key={article._id}
                  className="flex-shrink-0 flex-grow-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-3"
                >
                  <BlogCard article={article} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            href="/blog"
            // Changed button style to match login and hero buttons
            className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-[#176FC0] to-[#1461A8] hover:to-[#0F4C85] shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
          >
            {t("blog.viewAll")}{" "}
            <LucideArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}