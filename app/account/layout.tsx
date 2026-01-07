"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import {
  LayoutDashboard,
  ShoppingCart,
  Heart,
  User,
  Star,
  Menu
} from "lucide-react";
import withRoleUserAuth from "@/components/auth/withRoleUserAuth";

const mobileBottomNavLinks = [
    { name: "Dashboard", href: "/account", icon: LayoutDashboard },
    { name: "Orders", href: "/account/orders", icon: ShoppingCart },
    { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    { name: "Profile", href: "/account/profile", icon: User },
    { name: "My Reviews", icon: Star, href: "/account/reviews" },
];

function AccountLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex bg-slate-50 lg:h-screen lg:overflow-y-hidden">
      
      <div className="hidden lg:block w-64 flex-shrink-0">
        <Sidebar />
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col w-full">
        <header className="sticky top-0 z-30 lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <h1 className="font-bold text-xl text-slate-800">My Account</h1>
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2"
            >
                <Menu className="w-6 h-6 text-slate-700" />
            </button>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white z-40 border-t border-gray-200 lg:hidden">
        <nav className="grid grid-cols-5">
          {mobileBottomNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} className={`flex flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors ${isActive ? "text-amber-600" : "text-slate-500 hover:text-slate-800"}`}>
                <link.icon className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default withRoleUserAuth(AccountLayoutContent);