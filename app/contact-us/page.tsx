"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { submitEnquiry } from "@/lib/redux/enquirySlice";
import toast from "react-hot-toast";
import {
  Loader2,
  CheckCircle2,
  Wrench,
  LifeBuoy,
  Mail,
  MessageCircle,
  ArrowRight,
  Send,
  LucideProps,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// Color Theme: #176FC0, #0F4C85, #1461A8

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType<LucideProps>;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({
  active,
  onClick,
  icon: Icon,
  label,
}) => (
  <button
    onClick={onClick}
    type="button"
    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold transition-all duration-300 rounded-lg ${active
        ? "bg-[#176FC0] text-white shadow-md shadow-blue-600/20"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
      }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#176FC0] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#176FC0]/10 transition-all duration-200 hover:border-slate-300";
const labelClasses =
  "mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600";

export default function ContactUsPage() {
  const { t } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.enquiry);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"request" | "support">("request");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    toast
      .promise(dispatch(submitEnquiry(data)).unwrap(), {
        loading: t("contact.form.submitting"),
        success: "Message sent successfully!",
        error: (err: any) => err || "Failed to submit.",
      })
      .then(() => setSubmitted(true));
  };

  if (submitted) {
    return (
      <main className="min-h-[80vh] bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 max-w-md w-full animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {t("contact.form.success.title")}
          </h1>
          <p className="text-base text-slate-500 mb-8 leading-relaxed">
            {t("contact.form.success.sub")}
          </p>
          <Link
            href="/shop"
            className="inline-flex w-full items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#176FC0] to-[#1461A8] hover:to-[#0F4C85] rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
          >
            {t("contact.form.success.btn")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100/50 selection:text-[#176FC0]">
      <div className="relative bg-white pt-28 pb-24 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-40 z-0">
          <div className="absolute top-[-20%] left-[-15%] w-[40%] h-[50%] rounded-full bg-blue-100 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-15%] w-[40%] h-[50%] rounded-full bg-indigo-100 blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-slate-200 text-[#176FC0] text-sm font-bold uppercase tracking-wider mb-2 shadow-sm">
              {t("contact.hero.meta")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {t("contact.hero.title")}
            </h1>
            <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
              {t("contact.hero.sub")}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 pb-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
              <h2 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">
                {t("contact.info.title")}
              </h2>
              <div className="space-y-4">
                <a
                  href="mailto:sales@ownsilent.international"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all group border border-slate-200/70 hover:border-[#176FC0]/40 hover:shadow-md"
                >
                  <div className="w-12 h-12 bg-[#176FC0]/10 rounded-xl flex items-center justify-center text-[#176FC0] shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 mb-0.5">
                      {t("contact.info.email.title")}
                    </h3>
                    <p className="text-xs text-slate-500 truncate font-medium">
                      sales@ownsilent.international
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/918295463421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-green-50/50 transition-all group border border-slate-200/70 hover:border-green-300/50 hover:shadow-md"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 mb-0.5">
                      WhatsApp Us
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Instant support & sales
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-green-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-200 text-slate-800 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-200/50 rounded-full blur-[60px]"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-5 ring-1 ring-slate-200">
                  <ShieldCheck className="w-6 h-6 text-[#176FC0]" />
                </div>

                <h3 className="text-base font-bold mb-2 text-slate-900">
                  {t("contact.help.title")}
                </h3>

                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  {t("contact.help.sub")}
                </p>

                <Link
                  href="/shipping-returns"
                  className="inline-flex items-center text-sm font-bold text-[#176FC0] hover:text-blue-600 transition-colors"
                >
                  {t("contact.help.btn")}
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
              <div className="bg-slate-50/50 p-2 border-b border-slate-200/70 backdrop-blur-sm">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <TabButton
                    active={activeTab === "request"}
                    onClick={() => setActiveTab("request")}
                    icon={Wrench}
                    label={t("contact.tab.request")}
                  />
                  <TabButton
                    active={activeTab === "support"}
                    onClick={() => setActiveTab("support")}
                    icon={LifeBuoy}
                    label={t("contact.tab.support")}
                  />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#176FC0]/10 text-[#176FC0] border border-[#176FC0]/20 text-sm font-bold">1</span>
                      <h3 className="text-base font-bold text-slate-900">{t("contact.form.s1.title")}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>
                          {t("contact.form.fullName")} <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="fullName" required className={inputClasses} placeholder="John Doe" />
                      </div>
                      <div>
                        <label className={labelClasses}>
                          {t("contact.form.email")} <span className="text-red-500">*</span>
                        </label>
                        <input type="email" name="email" required className={inputClasses} placeholder="john@company.com" />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>{t("contact.form.phone")}</label>
                        <input type="tel" name="phone" className={inputClasses} placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 w-full my-4"></div>

                  {activeTab === "request" && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#176FC0]/10 text-[#176FC0] border border-[#176FC0]/20 text-sm font-bold">2</span>
                        <h3 className="text-base font-bold text-slate-900">{t("contact.form.s2.request.title")}</h3>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <label className={labelClasses}>{t("contact.form.partName")} <span className="text-red-500">*</span></label>
                          <input type="text" name="partName" required className={inputClasses} placeholder="e.g. Ceramic Brake Kit" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                          <div>
                            <label className={labelClasses}>{t("contact.form.brand")}</label>
                            <input type="text" name="carBrand" className={inputClasses} placeholder="Porsche" />
                          </div>
                          <div>
                            <label className={labelClasses}>{t("contact.form.model")}</label>
                            <input type="text" name="carModel" className={inputClasses} placeholder="911 GT3" />
                          </div>
                          <div>
                            <label className={labelClasses}>{t("contact.form.year")}</label>
                            <input type="text" name="carYear" className={inputClasses} placeholder="2024" />
                          </div>
                        </div>

                        <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-200/70">
                          <label className={`${labelClasses} text-slate-700 mb-4`}>{t("contact.form.address")}</label>
                          <div className="space-y-4">
                            <input type="text" name="street" className={inputClasses} placeholder={t("contact.form.street")} />
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <input type="text" name="city" className={inputClasses} placeholder={t("contact.form.city")} />
                              <input type="text" name="state" className={inputClasses} placeholder={t("contact.form.state")} />
                              <input type="text" name="zipCode" className={inputClasses} placeholder={t("contact.form.zip")} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "support" && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#176FC0]/10 text-[#176FC0] border border-[#176FC0]/20 text-sm font-bold">2</span>
                        <h3 className="text-base font-bold text-slate-900">{t("contact.form.s2.support.title")}</h3>
                      </div>
                      <div>
                        <label className={labelClasses}>{t("contact.form.subject")} <span className="text-red-500">*</span></label>
                        <input type="text" name="subject" required className={inputClasses} placeholder="Order #12345 Status" />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className={labelClasses}>{t("contact.form.message")} <span className="text-red-500">*</span></label>
                    <textarea name="message" rows={4} required className={`${inputClasses} resize-none`} placeholder="Tell us more details..." />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full h-12 flex justify-center items-center gap-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#176FC0] to-[#1461A8] hover:to-[#0F4C85] shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {status === "loading" ? (
                        <Loader2 className="animate-spin w-5 h-5" />
                      ) : (
                        <>
                          {t("contact.form.submitBtn")}{" "}
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}