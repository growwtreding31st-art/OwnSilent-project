"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { logoutUser } from "@/lib/redux/authSlice";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  ShoppingCart,
  User,
  MapPin,
  Heart,
  Star,
  LogOut,
  Store,
  ChevronRight,
} from "lucide-react";

interface MenuItem {
  text: string;
  icon: React.ElementType;
  href: string;
}

const SidebarLink = ({ item }: { item: MenuItem }) => {
  const pathname = usePathname();
  const isActive =
    pathname === item.href ||
    (item.href !== "/account" && pathname.startsWith(item.href));

  return (
    <Link href={item.href} className="block mb-1">
      <li
        className={`
          relative flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer
          transition-all duration-200 group
          ${
            isActive
              ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <item.icon
            className={`w-5 h-5 transition-colors ${
              isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-600"
            }`}
          />
          <span className={`text-sm ${isActive ? "font-bold" : "font-semibold"}`}>
            {item.text}
          </span>
        </div>
        {isActive && <ChevronRight className="w-4 h-4 text-slate-400" />}
      </li>
    </Link>
  );
};

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems: MenuItem[] = [
    { text: "Dashboard", icon: LayoutDashboard, href: "/account" },
    { text: "My Orders", icon: ShoppingCart, href: "/account/orders" },
    { text: "My Profile", icon: User, href: "/account/profile" },
    { text: "Addresses", icon: MapPin, href: "/account/addresses" },
    { text: "Wishlist", icon: Heart, href: "/account/wishlist" },
    { text: "My Reviews", icon: Star, href: "/account/reviews" },
  ];

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      toast.success("Logged out successfully");
      router.push("/");
    } else {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <aside className="h-full w-full bg-white flex flex-col border-r border-slate-100">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full border border-slate-100 bg-slate-50 overflow-hidden relative">
              <Image
                src={user?.avatar || "/images/avatars/default.png"}
                alt="User Avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-900 truncate text-sm">
              {user?.fullName || "Guest User"}
            </h4>
            <p className="text-xs text-slate-500 truncate font-medium">
              {user?.email || "No email"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
        <div className="mb-3 px-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
          Account Menu
        </div>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <SidebarLink key={item.text} item={item} />
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="space-y-1">
          <Link href="/">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all hover:bg-white hover:shadow-sm text-slate-600 hover:text-blue-600 group border border-transparent hover:border-slate-100">
              <Store className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
              <span className="text-sm font-bold">Visit Store</span>
            </div>
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all hover:bg-red-50 text-slate-600 hover:text-red-600 group"
          >
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
            <span className="text-sm font-bold">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}