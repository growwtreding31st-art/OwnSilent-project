"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
export default function Footer() {
  const { t } = useLanguage();
  const companyLinks = [
    { href: "/carbon-ceramic-rotors", label: t("footer.link.rotors") },
    { href: "/shop", label: t("footer.link.shop") },
    { href: "/about-us", label: t("footer.link.about") },
    { href: "/blog", label: t("footer.link.blog") },
    { href: "/news", label: t("footer.link.news") },
    { href: "/contact-us", label: t("footer.link.contact") },
  ];
  const supportLinks = [
    { href: "/shipping-returns", label: t("footer.link.shipping") },
    { href: "/privacy-policy", label: t("footer.link.privacy") },
    { href: "/become-dealer", label: t("footer.link.dealer") },
    { href: "/full-desclaimer", label: t("footer.link.disclaimer") },
  ];
  const categoryLinks = [
    { href: "/shop?category=engine", label: t("footer.cat.engine") },
    { href: "/shop?category=suspension", label: t("footer.cat.suspension") },
    { href: "/shop?category=brakes", label: t("footer.cat.brakes") },
    { href: "/shop?category=exhaust", label: t("footer.cat.exhaust") },
    { href: "/shop?category=body-kits", label: t("footer.cat.body") },
    { href: "/shop?category=lighting", label: t("footer.cat.lighting") },
  ];
  const vehicleBrandLinks = [
    { href: "/shop?brand=porsche", label: "Porsche" },
    { href: "/shop?brand=lamborghini", label: "Lamborghini" },
    { href: "/shop?brand=ferrari", label: "Ferrari" },
    { href: "/shop?brand=mclaren", label: "McLaren" },
    { href: "/shop?brand=audi-rs", label: "Audi RS" },
  ];
  const socialLinks = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: Linkedin, label: "LinkedIn" },
  ];
  return (
    <footer className="bg-white border-t border-slate-100 font-sans">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8 mb-16">
          <div className="col-span-2 md:col-span-12 lg:col-span-3 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/home/logo.png"
                alt="OwnSilent Logo"
                width={160}
                height={45}
                className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <div className="text-slate-500 text-sm leading-relaxed space-y-5 max-w-sm">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <strong className="text-slate-900 block mb-1 text-xs uppercase tracking-wide">
                  Headquarters
                </strong>
                <p>
                  2/F, Tower 1, Tern Centre, 237 Queen’s Road Central, Sheung
                  Wan, Hong Kong
                </p>
              </div>
              <div className="space-y-3 pl-1">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 text-[10px] uppercase tracking-wider mb-0.5">
                    {t("footer.email")}
                  </span>
                  <a
                    href="mailto:sales@ownsilent.international"
                    className="text-slate-600 hover:text-[#176FC0] transition-colors font-medium break-all"
                  >
                    sales@ownsilent.international
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 text-[10px] uppercase tracking-wider mb-0.5">
                    {t("footer.website")}
                  </span>
                  <a
                    href="https://www.ownsilent.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-[#176FC0] transition-colors font-medium"
                  >
                    www.ownsilent.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h3 className="font-bold text-slate-900 mb-5 text-sm uppercase tracking-wider">
              {t("footer.company")}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-[#176FC0] transition-colors hover:pl-1 inline-block duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h3 className="font-bold text-slate-900 mb-5 text-sm uppercase tracking-wider">
              {t("footer.support")}
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-[#176FC0] transition-colors hover:pl-1 inline-block duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h3 className="font-bold text-slate-900 mb-5 text-sm uppercase tracking-wider">
              {t("footer.categories")}
            </h3>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-[#176FC0] transition-colors hover:pl-1 inline-block duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-3 space-y-10">
            <div>
              <h3 className="font-bold text-slate-900 mb-5 text-sm uppercase tracking-wider">
                Vehicle Brands
              </h3>
              <ul className="space-y-3">
                {vehicleBrandLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-[#176FC0] transition-colors hover:pl-1 inline-block duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                Exclusive Launches & Builds
              </h3>
              <form className="flex items-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-slate-50 border border-slate-200 rounded-l-lg text-slate-900 h-11 px-4 focus:bg-white focus:outline-none focus:border-[#176FC0] focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder:text-slate-400 text-sm"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex-shrink-0 h-11 w-11 flex items-center justify-center rounded-r-lg text-white bg-[#176FC0] hover:bg-[#0F4C85] transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-10 pb-10">
          <div className="w-full mb-10">
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">
              {t("footer.disclaimer")}
            </h3>
            <div className="text-xs text-slate-500 leading-relaxed text-justify lg:text-left space-y-3 bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50">
              <p>{t("footer.disclaimer.p1")}</p>
              <p>{t("footer.disclaimer.p2")}</p>
              <p>
                {t("footer.disclaimer.p3")}{" "}
                <Link
                  href="/full-desclaimer"
                  className="font-bold text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-[#176FC0] hover:decoration-blue-400 transition-all"
                >
                  {t("footer.disclaimer.link")}
                </Link>
              </p>
            </div>
          </div>

          {/* Enhanced Payment Methods Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full mb-10"
          >
            <div className="relative bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-blue-50/70 p-8 sm:p-10 rounded-3xl border border-blue-200/50 shadow-xl shadow-blue-500/5 overflow-hidden">
              {/* Animated Background Elements */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
              />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left Side - Title & Description */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#176FC0] to-[#0F4C85] text-white shadow-2xl shadow-blue-500/40"
                  >
                    <ShieldCheck className="w-8 h-8" strokeWidth={2.5} />
                  </motion.div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base sm:text-lg uppercase tracking-wide mb-2 flex items-center gap-2">
                      {t("footer.payment.title")}
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-flex h-2 w-2 rounded-full bg-green-500"
                      />
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-md">
                      {t("footer.payment.subtitle")}
                    </p>
                  </div>
                </motion.div>

                {/* Right Side - Payment Badges */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap items-center justify-center gap-3"
                >
                  {/* PayPal */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group relative px-5 py-3 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 hover:border-[#0070BA] shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <Image
                        src="/images/banking/paypal.png"
                        alt="PayPal"
                        width={80}
                        height={24}
                        className="h-6 w-auto group-hover:scale-110 transition-transform object-contain"
                      />
                      <span className="text-xs font-black text-[#0070BA] group-hover:scale-110 inline-block transition-transform">
                        PayPal
                      </span>
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0070BA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </motion.div>

                  {/* Visa */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group relative px-5 py-3 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 hover:border-blue-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <Image
                        src="/images/banking/visa.png"
                        alt="Visa"
                        width={60}
                        height={24}
                        className="h-6 w-auto object-contain"
                      />
                      <span className="text-xs font-black text-slate-700 group-hover:text-blue-600 transition-colors">
                        Visa
                      </span>
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </motion.div>

                  {/* Mastercard */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group relative px-5 py-3 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 hover:border-orange-500 shadow-lg hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <Image
                        src="/images/banking/mastercard.svg.png"
                        alt="Mastercard"
                        width={60}
                        height={24}
                        className="h-6 w-auto object-contain"
                      />
                      <span className="text-xs font-black text-slate-700 group-hover:text-orange-600 transition-colors">
                        Mastercard
                      </span>
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </motion.div>

                  {/* Amex */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group relative px-5 py-3 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 hover:border-indigo-500 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <Image
                        src="/images/banking/american-express.png"
                        alt="American Express"
                        width={60}
                        height={24}
                        className="h-6 w-auto object-contain"
                      />
                      <span className="text-xs font-black text-slate-700 group-hover:text-indigo-600 transition-colors">
                        Amex
                      </span>
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </motion.div>

                  {/* Bank Transfer */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group relative px-5 py-3 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 hover:border-green-500 shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <Image
                        src="/images/banking/banktransfer.png"
                        alt="Bank Transfer"
                        width={60}
                        height={24}
                        className="h-6 w-auto object-contain"
                      />
                      <span className="text-xs font-black text-slate-700 group-hover:text-green-600 transition-colors">
                        {t("footer.payment.bank")}
                      </span>
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-blue-300/30 rounded-tr-3xl" />
            </div>
          </motion.div>

          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-6">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span className="font-medium">TÜV Certified Materials</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium">ISO 9001 Standards</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 pt-2">
                {t("footer.rights", { year: new Date().getFullYear() })}
              </p>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-500 border border-slate-200 hover:bg-[#176FC0] hover:text-white hover:border-[#176FC0] hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
