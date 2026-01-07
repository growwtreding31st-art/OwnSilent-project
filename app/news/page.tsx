"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchPublicNews } from "@/lib/redux/newsSlice";
import { fetchPublicBrands } from "@/lib/redux/productSlice";
import { ChevronDown, SearchX, ArrowRight, Loader2, Calendar, Newspaper, Filter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsPage() {
  const { t } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  const { articles, status } = useSelector((state: RootState) => state.news);
  const { brands } = useSelector((state: RootState) => state.products);

  // Sirf Brand ka state rakha hai
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    // Models fetch karne ki call hata di gayi hai
    // Jab brand change ho, hum news ko filter karke fetch karenge
    dispatch(fetchPublicNews({ brand: selectedBrand }));
    
    // Sirf ek baar brands load karenge
    if(brands.length === 0) {
        dispatch(fetchPublicBrands());
    }
  }, [dispatch, selectedBrand, brands.length]);

  const handleResetFilters = () => {
    setSelectedBrand("");
    // Reset hone par bina filter ke fetch karein
    dispatch(fetchPublicNews({})); 
  };

  if (status === "loading" && articles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-sm font-medium text-slate-500">{t("newsPage.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
            <Newspaper className="w-3 h-3" />
            {t("newsPage.subtitle")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
            {t("newsPage.title")}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Stay informed with the latest updates, automotive trends, and company announcements.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar Filter - Ab sirf Brand hai */}
          <aside className="lg:col-span-3">
            <div className="bg-white p-6 rounded-2xl sticky top-28 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <Filter className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {t("newsPage.filter.title")}
                </h3>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-xs font-bold text-slate-500 uppercase mb-2"
                  >
                    {t("newsPage.filter.brand")}
                  </label>
                  <div className="relative group">
                    <select
                      id="brand"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="appearance-none w-full pl-4 pr-10 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer hover:bg-slate-100"
                    >
                      <option value="">{t("newsPage.filter.allBrands")}</option>
                      {brands.map((brand: any) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>

                {/* Model Dropdown Remove Kar Diya Gaya Hai */}

                <button
                  onClick={handleResetFilters}
                  className="w-full mt-2 py-3 px-4 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900 transition-all"
                >
                  {t("newsPage.filter.reset")}
                </button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="space-y-6">
              {articles.length > 0 ? (
                articles.map((article: any) => (
                  <article
                    key={article._id}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-100 transition-all duration-300 flex flex-col md:flex-row h-full md:h-64"
                  >
                    <div className="md:w-2/5 lg:w-1/3 overflow-hidden relative">
                      <Link href={`/news/${article.slug}`} className="block h-full">
                        <Image
                          src={article.image || '/placeholder.png'}
                          alt={article.title}
                          width={400}
                          height={300}
                          className="w-full h-56 md:h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
                      </Link>
                    </div>
                    
                    <div className="p-6 md:p-8 md:w-3/5 lg:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{new Date(article.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            {/* Brand Badge */}
                            {article.brand && (
                                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                                    {article.brand.name}
                                </span>
                            )}
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                          <Link href={`/news/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h2>
                        
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/news/${article.slug}`}
                          className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 group/link"
                        >
                          {t("newsPage.readMore")}
                          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <SearchX className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {t("newsPage.noArticles.title")}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                    {t("newsPage.noArticles.sub")}
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
                  >
                    {t("newsPage.noArticles.resetBtn")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}