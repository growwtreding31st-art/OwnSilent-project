"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Globe,
  Check,
  ShoppingCart,
  User,
  Home,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  X,
  Disc,
  Info,
  Phone,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { logoutUser } from "@/lib/redux/authSlice";
import toast from "react-hot-toast";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const { t, language, setLanguage, availableLanguages, dir } = useLanguage();
  const { currency, setCurrency, availableCurrencies } = useCurrency();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        if (
          profileMenuRef.current &&
          !profileMenuRef.current.contains(event.target as Node)
        ) {
          setIsProfileMenuOpen(false);
        }
        if (
          settingsMenuRef.current &&
          !settingsMenuRef.current.contains(event.target as Node)
        ) {
          setIsSettingsMenuOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: t("nav.rotors"), href: "/carbon-ceramic-rotors" },
    { name: t("nav.about"), href: "/about-us" },
    { name: t("nav.blogs"), href: "/blog" },
    { name: t("nav.news"), href: "/news" },
    { name: t("nav.contact"), href: "/contact-us" },
  ];

  const getAccountLink = (): string => {
    if (!user) return "/login";
    return user.role === "ADMIN" ? "/admin/dashboard" : "/account";
  };

  const mobileBottomNavLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Rotors", href: "/carbon-ceramic-rotors", icon: Disc },
    { name: "About", href: "/about-us", icon: Info },
    { name: "Contact", href: "/contact-us", icon: Phone },
  ];

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await dispatch(logoutUser());
      toast.success("Logged out successfully");
      router.push("/login");
    }
  };

  const cartItemCount = cartItems?.length || 0;

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-2xl z-40 border-b border-slate-100/50 hidden lg:block transition-all duration-300"
        dir={dir}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-x-10">
              <Link href="/" aria-label="Home" className="shrink-0 group">
                <Image
                  src="/images/home/logo2.png"
                  alt="Logo"
                  width={140}
                  height={38}
                  className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <nav>
                <ul className="flex items-center gap-x-8 text-sm font-semibold tracking-wide">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`relative py-2 transition-colors duration-200 group ${
                          pathname.startsWith(link.href)
                            ? "text-blue-600"
                            : "text-slate-600 hover:text-blue-600"
                        }`}
                      >
                        {link.name}
                        <span
                          className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
                            pathname.startsWith(link.href)
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        ></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-x-4">
              <div className="relative" ref={settingsMenuRef}>
                <button
                  onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
                  className="px-3 py-2 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center gap-2 group"
                >
                  <Globe className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                  <span className="text-xs font-bold text-slate-700">
                    {language.toUpperCase()} / {currency}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isSettingsMenuOpen && (
                  <div className="absolute top-full right-0 mt-3 w-[28rem] bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-2">
                          {t("common.language")}
                        </h3>
                        <div className="space-y-1">
                          {availableLanguages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => setLanguage(lang.code)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                                language === lang.code
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <span>{lang.nativeName}</span>
                              {language === lang.code && (
                                <Check className="w-4 h-4 text-blue-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="border-l border-slate-100 pl-6">
                        <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-2">
                          {t("common.currency")}
                        </h3>
                        <div className="space-y-1 max-h-[250px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                          {availableCurrencies.map((curr) => (
                            <button
                              key={curr.code}
                              onClick={() => setCurrency(curr.code)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                                currency === curr.code
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <span>
                                {curr.code} ({curr.symbol})
                              </span>
                              {currency === curr.code && (
                                <Check className="w-4 h-4 text-blue-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/cart"
                aria-label="Shopping Cart"
                className="relative p-2.5 rounded-full hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-all group"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-white">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              <div className="h-6 w-px bg-slate-200 mx-1"></div>

              {user ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                  >
                    <Image
                      src={user.avatar || "/images/avatars/default.png"}
                      alt="User Avatar"
                      width={34}
                      height={34}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  {isProfileMenuOpen && (
                    <div className="absolute top-full right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-3 py-3 mb-2 bg-slate-50 rounded-xl">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Signed in as
                        </p>
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href={getAccountLink()}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <div className="my-1.5 h-px bg-slate-100"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> {t("auth.logout")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-x-3">
                  <Link
                    href="/login"
                    className="text-sm font-bold text-slate-600 px-5 py-2.5 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    {t("auth.login")}
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm font-bold text-white bg-slate-900 px-6 py-2.5 rounded-full hover:bg-blue-600 transition-all shadow-md shadow-slate-200 hover:shadow-blue-200"
                  >
                    {t("auth.signup")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <header className="fixed top-0 left-0 w-full bg-white z-40 border-b border-slate-100 lg:hidden transition-all">
        <div className="px-4 py-3 flex justify-between items-center">
          <Link href="/" aria-label="Home" className="relative z-10">
            <Image
              src="/images/home/logo.png"
              alt="Logo"
              width={110}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSettingsMenuOpen(true);
              }}
              className="px-3 py-1.5 text-[11px] font-extrabold text-slate-600 bg-slate-50 border border-slate-200 rounded-full flex items-center gap-1 active:scale-95 transition-transform"
            >
              {currency}
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            <Link
              href={getAccountLink()}
              className="p-2 text-slate-700 active:scale-95 transition-transform rounded-full hover:bg-slate-100"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative p-2 text-slate-700 active:scale-95 transition-transform rounded-full hover:bg-slate-100"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white ring-2 ring-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 w-full bg-white z-50 border-t border-slate-200 pb-safe lg:hidden">
        <div className="grid grid-cols-4 px-1 pb-1 pt-1">
          {mobileBottomNavLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center justify-center gap-1 py-2.5 transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <div
                  className={`relative ${
                    isActive ? "-translate-y-0.5" : ""
                  } transition-transform`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "fill-blue-600/10 stroke-[2.5]" : "stroke-2"
                    }`}
                  />
                </div>
                <span
                  className={`text-[9px] font-bold tracking-tight text-center leading-none ${
                    isActive ? "opacity-100" : "opacity-80"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {isSettingsMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsSettingsMenuOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Settings
              </h2>
              <button
                onClick={() => setIsSettingsMenuOpen(false)}
                className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  {t("common.currency")}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {availableCurrencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr.code);
                        setIsSettingsMenuOpen(false);
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                        currency === curr.code
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 transform scale-[1.02]"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 active:scale-95"
                      }`}
                    >
                      <span className="text-sm font-bold">{curr.code}</span>
                      <span
                        className={`text-[10px] opacity-80 ${
                          currency === curr.code
                            ? "text-blue-100"
                            : "text-slate-400"
                        }`}
                      >
                        {curr.symbol}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  {t("common.language")}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsSettingsMenuOpen(false);
                      }}
                      className={`flex items-center justify-center px-4 py-3.5 rounded-xl border font-bold text-sm transition-all ${
                        language === lang.code
                          ? "bg-slate-900 border-slate-900 text-white shadow-lg transform scale-[1.02]"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95"
                      }`}
                    >
                      {lang.nativeName}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
