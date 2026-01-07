"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Loader2,
  Package,
  Calendar,
  CreditCard,
  ChevronRight,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchMyOrders } from "@/lib/redux/orderSlice";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-50 text-green-700 border-green-100 ring-green-600/20";
    case "Shipped":
      return "bg-blue-50 text-blue-700 border-blue-100 ring-blue-600/20";
    case "Processing":
      return "bg-purple-50 text-purple-700 border-purple-100 ring-purple-600/20";
    case "Confirmed":
      return "bg-indigo-50 text-indigo-700 border-indigo-100 ring-indigo-600/20";
    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-100 ring-red-600/20";
    default:
      return "bg-slate-50 text-slate-600 border-slate-100 ring-slate-500/20";
  }
};

export default function MyOrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, status } = useSelector((state: RootState) => state.orders);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Orders</h1>
          <p className="text-slate-500 mt-1 font-medium">
            Track and manage your recent purchases.
          </p>
        </div>
        {orders.length > 0 && (
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-64 transition-all shadow-sm"
            />
          </div>
        )}
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                      <Package className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Order ID
                      </p>
                      <span className="font-bold text-slate-900 font-mono">
                        #{order.orderId}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                        Date Placed
                      </p>
                    </div>
                    <p className="font-semibold text-slate-700 text-sm">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="md:col-span-3">
                     <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                        Total Amount
                      </p>
                    </div>
                    <p className="font-bold text-slate-900 text-base">
                      ${order.totalAmount.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-end justify-between gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ring-1 ring-inset ${getStatusStyles(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <Link
                      href={`/account/orders/${order._id}`}
                      className="hidden md:flex items-center text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors mt-1"
                    >
                      Details <ChevronRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
                
                <Link href={`/account/orders/${order._id}`} className="md:hidden block border-t border-slate-100 p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between text-sm font-bold text-blue-600">
                        View Order Details
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900">No orders found</h3>
                <p className="text-slate-500 text-sm">Try adjusting your search term.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">
            No Orders Yet
          </h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            It looks like you haven't placed any orders yet. Discover our premium parts and upgrade your ride today.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 hover:shadow-blue-200 hover:-translate-y-1"
          >
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}