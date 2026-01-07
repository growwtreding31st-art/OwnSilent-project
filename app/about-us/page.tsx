"use client";
import React from "react";
import Link from "next/link";
import {
  Award,
  Wrench,
  ShieldCheck,
  Check,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Globe,
  Briefcase,
  LucideProps,
  Zap,
  Target,
  HeartHandshake,
  MapPin,
  PackageCheck,
  Phone
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ValueCardProps {
  icon: React.ElementType<LucideProps>;
  title: string;
  description: string;
  className?: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, description, className }) => (
  <div className={`p-8 rounded-sm transition-all duration-300 hover:-translate-y-1 ${className}`}>
    <div className="w-12 h-12 rounded-sm bg-white text-[#176FC0] flex items-center justify-center mb-6 shadow-sm border border-slate-100">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">{description}</p>
  </div>
);

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col p-6 border-r last:border-r-0 border-slate-100 items-center justify-center hover:bg-slate-50/50 transition-colors">
    <span className="text-3xl font-extrabold text-[#176FC0] tracking-tight mb-1">
      {value}
    </span>
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      {label}
    </span>
  </div>
);

export default function AboutUsPage() {
  const { t } = useLanguage();

  const coreValues = [
    {
      icon: Award,
      title: t("aboutPage.value1.t"),
      description: t("aboutPage.value1.d"),
      bg: "bg-blue-50/50 border border-blue-100",
    },
    {
      icon: Wrench,
      title: t("aboutPage.value2.t"),
      description: t("aboutPage.value2.d"),
      bg: "bg-slate-50 border border-slate-200",
    },
    {
      icon: ShieldCheck,
      title: t("aboutPage.value3.t"),
      description: t("aboutPage.value3.d"),
      bg: "bg-indigo-50/50 border border-indigo-100",
    },
  ];

  const whyWorkWithUs = [
    t("aboutPage.careers.why.l1"),
    t("aboutPage.careers.why.l2"),
    t("aboutPage.careers.why.l3"),
    t("aboutPage.careers.why.l4"),
  ];

  const jobCategories = [
    { name: t("aboutPage.careers.cat1"), icon: Briefcase },
    { name: t("aboutPage.careers.cat2"), icon: Users },
    { name: t("aboutPage.careers.cat3"), icon: TrendingUp },
    { name: t("aboutPage.careers.cat4"), icon: Globe },
    { name: t("aboutPage.careers.cat5"), icon: ShieldCheck },
    { name: t("aboutPage.careers.cat6"), icon: Star },
  ];

  return (
    <main className="bg-white font-sans text-slate-900 selection:bg-[#176FC0] selection:text-white">
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-sm blur-[120px] opacity-60 translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-sm blur-[100px] opacity-50 -translate-x-1/3 translate-y-1/4"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-blue-50 border border-blue-100 text-[#176FC0] mb-6 shadow-sm">
                <span className="flex h-2 w-2 rounded-sm bg-[#176FC0] animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {t("aboutPage.meta")}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.15]">
                Powering Industries <br />
                <span className="text-[#176FC0]">Internationally</span>
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-xl font-medium">
                {t("aboutPage.subtitle")}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-[#176FC0] rounded-sm shadow-lg shadow-blue-500/20 hover:bg-[#0F4C85] hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t("aboutPage.exploreBtn")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-4 text-sm font-semibold text-slate-500">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-sm bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] text-slate-400">JP</div>
                  <div className="w-10 h-10 rounded-sm bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] text-slate-500">US</div>
                  <div className="w-10 h-10 rounded-sm bg-slate-300 border-2 border-white flex items-center justify-center text-[10px] text-slate-600">EU</div>
                </div>
                <p>Trusted by clients in 50+ countries</p>
              </div>
            </div>

            <div className="lg:w-1/2 w-full relative">
              <div className="relative z-10 grid grid-cols-2 gap-4 max-w-lg mx-auto lg:ml-auto">
                <div className="space-y-4 mt-8">
                  <div className="bg-white p-6 rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-sm bg-blue-50 text-[#176FC0] flex items-center justify-center mb-3">
                      <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900">Global Reach</h3>
                    <p className="text-xs text-slate-500 mt-1">Shipping to 120+ regions worldwide</p>
                  </div>
                  <div className="bg-white p-6 rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-sm bg-indigo-50 flex items-center justify-center mb-3">
                      <Award className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-slate-900">Premium Quality</h3>
                    <p className="text-xs text-slate-500 mt-1">OEM Certified Parts Only</p>
                  </div>

                </div>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-sm bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                      <PackageCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900">Huge Inventory</h3>
                    <p className="text-xs text-slate-500 mt-1">5000+ Parts in stock now</p>
                  </div>
                  <div className="bg-white p-6 rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-sm bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                      <Phone className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900">24/7 Support</h3>
                    <p className="text-xs text-slate-500 mt-1">Expert assistance anytime</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-sm blur-3xl -z-10 transform scale-110"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-6 relative z-20 mb-10">
        <div className="bg-white rounded-sm shadow-xl shadow-slate-200/50 border border-slate-100 max-w-5xl mx-auto overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <StatItem value="5,000+" label="Products Sold" />
            <StatItem value="98%" label="Satisfaction" />
            <StatItem value="15+" label="Years Active" />
            <StatItem value="24/7" label="Support Team" />
          </div>
        </div>
      </div>

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start max-w-6xl mx-auto">
            <div className="lg:w-1/2 pt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm bg-blue-50 text-[#176FC0] flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-[#176FC0] font-bold tracking-widest text-xs uppercase">
                  {t("aboutPage.story.meta")}
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
                {t("aboutPage.story.title")}
              </h2>
              <div className="prose prose-slate prose-p:text-slate-500 prose-p:font-medium">
                <p className="mb-4">{t("aboutPage.story.p1")}</p>
                <p>{t("aboutPage.story.p2")}</p>
              </div>

              <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#176FC0]">15+</span>
                  <span className="text-xs text-slate-500 uppercase font-bold">Years Experience</span>
                </div>
                <div className="w-px h-10 bg-slate-200 mx-4"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#176FC0]">120+</span>
                  <span className="text-xs text-slate-500 uppercase font-bold">Countries Served</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="relative bg-slate-50 rounded-sm p-8 border border-slate-100 shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Globe className="w-48 h-48 text-[#176FC0]" />
                </div>
                <div className="relative z-10 grid grid-cols-1 gap-6">
                  <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-100 flex items-start gap-4 transition-transform hover:scale-[1.02]">
                    <div className="w-10 h-10 rounded-sm bg-[#176FC0] text-white flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Fast Delivery</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Global logistics network ensuring your parts arrive on time.</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-100 flex items-start gap-4 ml-8 transition-transform hover:scale-[1.02]">
                    <div className="w-10 h-10 rounded-sm bg-[#176FC0] text-white flex items-center justify-center flex-shrink-0">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Customer First</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Dedicated support team available around the clock.</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-100 flex items-start gap-4 transition-transform hover:scale-[1.02]">
                    <div className="w-10 h-10 rounded-sm bg-[#176FC0] text-white flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Quality Assurance</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Every part is rigorously tested before shipment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#176FC0] font-bold tracking-widest text-xs uppercase mb-3 block">
              {t("aboutPage.principles.meta")}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              {t("aboutPage.principles.title")}
            </h2>
            <p className="text-slate-500 font-medium">
              {t("aboutPage.principles.sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coreValues.map((value, index) => (
              <ValueCard key={index} {...value} className={value.bg} />
            ))}
          </div>
        </div>
      </section>

      <section id="careers" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-sm p-10 md:p-16 overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100">
            {/* soft background blobs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-slate-200/40 rounded-sm blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-slate-200/40 rounded-sm blur-3xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-16">
              {/* Left content */}
              <div className="lg:w-1/2 text-slate-800">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-50 border border-slate-200 mb-6">
                  <Briefcase className="w-3 h-3 text-slate-500" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-600">
                    {t("aboutPage.careers.meta")}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-slate-900">
                  {t("aboutPage.careers.title")}
                </h2>

                <p className="text-slate-600 text-base mb-8 max-w-md font-medium leading-relaxed">
                  {t("aboutPage.careers.sub")}
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  {whyWorkWithUs.map((reason, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-sm border border-slate-200"
                    >
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-sm font-semibold text-slate-700">
                        {reason}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact-us"
                  className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-sm text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg"
                >
                  Join Our Team <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              {/* Right content */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-sm p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-slate-900 font-bold text-lg mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    {t("aboutPage.careers.open.t")}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {jobCategories.map((cat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-white rounded-sm border border-slate-200 hover:border-slate-400 transition-all cursor-default group"
                      >
                        <div className="p-2 bg-slate-100 rounded-sm text-slate-500 group-hover:text-slate-900 transition-colors">
                          <cat.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-slate-700">
                          {cat.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}