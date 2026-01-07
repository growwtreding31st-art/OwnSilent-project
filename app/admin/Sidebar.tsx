"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { logoutUser } from '@/lib/redux/authSlice';
import {
  LayoutDashboard, Wrench, ShoppingCart, Users, Newspaper, Settings, LogOut,
  X, MessageSquare, Home, Image as ImageIcon,
  Layers, ChevronRight, ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

const SidebarLink = ({ item }: { item: any }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

  return (
    <Link href={item.href} className="block mb-1.5">
      <li className={`
        relative flex items-center justify-between py-3 px-3.5 rounded-xl cursor-pointer
        transition-all duration-200 group overflow-hidden
        ${isActive
          ? 'bg-[#176FC0] text-white shadow-lg shadow-blue-900/20'
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
        }
      `}>
        <div className="flex items-center gap-3 z-10">
          <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span className="font-medium text-sm tracking-wide">
            {item.text}
          </span>
        </div>
        
        {item.alert && !isActive && (
           <span className="relative flex h-2 w-2 z-10">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
           </span>
        )}

        {isActive && (
            <ChevronRight className="w-4 h-4 text-white/50 z-10" />
        )}
        
        {isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
        )}
      </li>
    </Link>
  );
};

export default function Sidebar({ setExpanded }: { setExpanded: (expanded: boolean) => void }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const menuItems = [
    { text: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard', alert: false },
    { text: 'Products', icon: Wrench, href: '/admin/products', alert: false },
    { text: 'Collections', icon: Layers, href: '/admin/collections', alert: false },
    { text: 'Orders', icon: ShoppingCart, href: '/admin/orders', alert: true },
    { text: 'Customers', icon: Users, href: '/admin/customers', alert: false },
    { text: 'Enquiries', icon: MessageSquare, href: '/admin/enquiries', alert: true },
    { text: 'Blog', icon: Newspaper, href: '/admin/blog', alert: false },
    { text: 'News', icon: Newspaper, href: '/admin/news', alert: false },
    { text: 'Appearance', icon: ImageIcon, href: '/admin/appearance', alert: false },
    { text: 'Settings', icon: Settings, href: '/admin/settings', alert: false },
  ];

  const handleLogout = async () => {
      const result = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(result)) {
        toast.success("Logged out successfully");
        router.push('/login');
      } else {
        toast.error("Logout failed. Please try again.");
      }
  };

  return (
    <aside className="h-full w-64 bg-[#0B1120] border-r border-slate-800 flex flex-col text-slate-300 font-sans shadow-2xl relative z-50">
      
      <div className="p-6 pb-2 flex justify-between items-center">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-[#176FC0] to-[#0F4C85] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:shadow-blue-500/30 transition-all duration-300">
             <span className="text-white font-bold text-lg">O</span>
          </div>
          <div className="flex flex-col">
             <h1 className="font-bold text-xl text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">
               OwnSilent
             </h1>
             <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-1">Admin Panel</span>
          </div>
        </Link>
        <button 
          onClick={() => setExpanded(false)} 
          className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors lg:hidden border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 py-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Menu</p>
          <ul>
            {menuItems.map(item => (
              <SidebarLink key={item.text} item={item} />
            ))}
          </ul>
      </div>

      <div className="p-4 space-y-3">
        <div className="p-3 bg-[#111A2D] rounded-xl border border-slate-800/50">
             <Link href="/" target="_blank" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-slate-800 hover:bg-[#176FC0] text-slate-300 hover:text-white transition-all duration-300 text-sm font-medium group">
                <Home className="w-4 h-4 group-hover:animate-pulse" />
                <span>Visit Live Store</span>
             </Link>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#111A2D] border border-slate-800 relative group">
          <div className="relative">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-[#0B1120]">
                AD
             </div>
             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#111A2D] rounded-full"></div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <h4 className="font-semibold text-white text-sm truncate">Administrator</h4>
            <p className="text-xs text-slate-400 truncate">admin@ownsilent.com</p>
          </div>

          <button 
             onClick={handleLogout} 
             className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-slate-400 transition-colors" 
             title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}