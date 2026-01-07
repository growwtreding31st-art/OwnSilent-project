"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchUserProfile } from "@/lib/redux/userProfileSlice";
import { fetchMyOrders } from "@/lib/redux/orderSlice";
import {
  ShoppingCart,
  User,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Package,
  Calendar,
  CreditCard,
  ArrowRight,
  UserCircle,
  Clock,
  LayoutDashboard,
} from "lucide-react";

const getStatusClass = (currentStatus: string, targetStatus: string) => {
  const statuses = ["Pending", "Confirmed", "Shipped", "Delivered"];
  const currentIndex = statuses.indexOf(currentStatus);
  const targetIndex = statuses.indexOf(targetStatus);
  if (currentIndex >= targetIndex) {
    return {
      circle: "bg-blue-600 border-blue-600 text-white",
      line: "bg-blue-600",
      text: "text-blue-700 font-bold",
    };
  }
  return {
    circle: "bg-slate-100 border-slate-200 text-slate-300",
    line: "bg-slate-200",
    text: "text-slate-400 font-medium",
  };
};

export default function AccountDashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, status: profileStatus } = useSelector(
    (state: RootState) => state.userProfile
  );
  const { orders, status: orderStatus } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const recentOrder = orders && orders.length > 0 ? orders[0] : null;
  const defaultAddress =
    profile?.addresses?.find((addr: any) => addr.isDefault) ||
    profile?.addresses?.[0];

  const statusTracker = ["Pending", "Confirmed", "Shipped", "Delivered"];

  const quickLinks = [
    { text: "View All Orders", icon: ShoppingCart, href: "/account/orders", desc: "Track, return, or buy again" },
    { text: "Manage Profile", icon: User, href: "/account/profile", desc: "Edit login details & name" },
    { text: "Manage Addresses", icon: MapPin, href: "/account/addresses", desc: "Edit addresses for orders" },
  ];

  if (
    (profileStatus === "loading" && !profile) ||
    (orderStatus === "loading" && !orders.length)
  ) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 text-xs font-extrabold uppercase tracking-widest bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100">
               <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Welcome back, {profile?.fullName?.split(" ")[0]}!
            </h1>
            <p className="text-slate-500 font-medium">
              Here's what's happening with your account today.
            </p>
          </div>

          <div className="flex-shrink-0 bg-white rounded-2xl p-2 pr-6 flex items-center gap-4 border border-slate-100 shadow-lg shadow-slate-100">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-blue-200">
                  {orders?.length || 0}
              </div>
              <div>
                  <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Total Orders</p>
                  <p className="text-sm font-bold text-slate-900">Placed so far</p>
              </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {recentOrder ? (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                      <Package className="w-5 h-5" />
                   </div>
                   <div>
                      <h2 className="font-bold text-slate-900 text-sm">Recent Order</h2>
                      <p className="text-xs text-slate-500 font-medium">#{recentOrder.orderId}</p>
                   </div>
                </div>
                <Link
                  href={`/account/orders/${recentOrder._id}`}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all"
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-8">
                {recentOrder.status !== "Cancelled" ? (
                  <div className="relative mb-8">
                    <div className="absolute top-4 left-0 w-full h-1 bg-slate-100 rounded-full -z-10"></div>
                    <div className="flex justify-between w-full">
                      {statusTracker.map((status, index) => {
                        const style = getStatusClass(recentOrder.status, status);
                        return (
                          <div
                            key={status}
                            className="flex flex-col items-center gap-3 relative group"
                          >
                            <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 bg-white ${style.circle}`}
                            >
                                <CheckCircle2 className={`w-4 h-4 ${style.circle.includes('blue') ? 'opacity-100' : 'opacity-0'}`} />
                            </div>
                            
                            {index < statusTracker.length - 1 && (
                                <div className={`absolute top-4 left-1/2 w-full h-1 -z-20 transition-all duration-500 ${style.line}`}></div>
                            )}

                            <span className={`text-[10px] md:text-xs uppercase tracking-wide ${style.text}`}>{status}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                    <div className="text-center py-4 mb-4">
                        <span className="inline-block px-4 py-2 rounded-full bg-red-50 text-red-600 font-bold text-sm border border-red-100">
                            Order Cancelled
                        </span>
                    </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5"/> Order Date
                        </p>
                        <p className="font-bold text-slate-900 text-sm">
                            {new Date(recentOrder.createdAt).toLocaleDateString("en-US", {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5"/> Total Amount
                        </p>
                        <p className="font-bold text-slate-900 text-sm">${recentOrder.totalAmount.toLocaleString('en-IN')}</p>
                    </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Package className="w-8 h-8" />
              </div>
              <h2 className="font-bold text-slate-900 text-lg mb-2">No Orders Yet</h2>
              <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                Start your journey with us by browsing our premium auto parts collection.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold py-3 px-6 rounded-xl text-sm hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 hover:shadow-blue-200"
              >
                Start Shopping <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <Link key={link.text} href={link.href} className="group h-full">
                <div className="h-full bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 flex flex-col justify-between">
                  <div>
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300 border border-slate-100">
                        <link.icon className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">{link.text}</h3>
                      <p className="text-xs text-slate-500 font-medium">{link.desc}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                     <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                     </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-full">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <UserCircle className="w-5 h-5 text-blue-600" /> Account Details
                    </h3>
                    <Link
                        href="/account/profile"
                        className="text-[10px] font-bold text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-slate-200 hover:border-blue-200"
                    >
                        Edit
                    </Link>
                </div>
                {profile && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-blue-500 to-purple-500 shadow-md">
                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-sm font-black text-slate-700 uppercase">
                                    {profile.fullName.charAt(0)}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-0.5">Name</p>
                                <p className="font-bold text-slate-900 text-sm">{profile.fullName}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                             <div>
                                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-1.5">Email Address</p>
                                <p className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-100 truncate">{profile.email}</p>
                             </div>
                             <div>
                                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-1.5">Phone Number</p>
                                <p className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-100">{profile.mobile}</p>
                             </div>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-full">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <MapPin className="w-5 h-5 text-blue-600" /> Default Address
                    </h3>
                    <Link
                        href="/account/addresses"
                        className="text-[10px] font-bold text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-slate-200 hover:border-blue-200"
                    >
                        Manage
                    </Link>
                </div>
                {defaultAddress ? (
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 relative group hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                        <div className="absolute top-4 right-4 text-blue-600 bg-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-blue-100 shadow-sm">
                            {defaultAddress.label}
                        </div>
                        <p className="font-bold text-slate-900 text-sm mb-2">{defaultAddress.fullName}</p>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">
                            {defaultAddress.street}<br />
                            {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zipCode}<br />
                            {defaultAddress.country}
                        </p>
                        <div className="pt-3 border-t border-slate-200/60">
                            <p className="text-xs font-bold text-slate-600 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {defaultAddress.phone}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                        <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs text-slate-500 font-medium mb-3">No default address set.</p>
                        <Link href="/account/addresses" className="text-xs font-bold text-blue-600 hover:underline">
                            Add New Address
                        </Link>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}