"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchOrderById } from "@/lib/redux/orderSlice";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  MapPin,
  CreditCard,
  Loader2,
  Clock,
  Calendar,
  Truck,
  Box,
  FileText,
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

export default function OrderDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const orderId = params.orderId as string;

  const { currentOrder: order, status } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  if (status === "loading" || !order) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  const statusTracker = ["Pending", "Confirmed", "Shipped", "Delivered"];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <Link
          href="/account/orders"
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to Orders
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Order Details
            </h1>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
              <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-bold border border-slate-200">
                #{order.orderId}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          {/* <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
             <FileText className="w-4 h-4" /> Invoice
          </button> */}
        </div>
      </div>

      {order.status !== "Cancelled" ? (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <h2 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
             <Truck className="w-5 h-5 text-blue-600" /> Order Status
          </h2>
          <div className="relative">
            <div className="absolute top-4 left-0 w-full h-1 bg-slate-100 rounded-full -z-10"></div>
            <div className="flex justify-between w-full">
              {statusTracker.map((status, index) => {
                const style = getStatusClass(order.status, status);
                return (
                  <div
                    key={status}
                    className="flex flex-col items-center gap-3 relative group"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 bg-white ${style.circle}`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          style.circle.includes("blue")
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    </div>

                    {index < statusTracker.length - 1 && (
                      <div
                        className={`absolute top-4 left-1/2 w-full h-1 -z-20 transition-all duration-500 ${style.line}`}
                      ></div>
                    )}

                    <span className={`text-[10px] md:text-xs uppercase tracking-wide ${style.text}`}>
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 p-6 rounded-3xl border border-red-100 text-center">
            <p className="text-red-700 font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> This order has been cancelled.
            </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Box className="w-5 h-5 text-blue-600" /> Order Items
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {order.items.map((item: any) => (
                <div
                  key={item.part._id}
                  className="flex items-start sm:items-center gap-5 pb-6 border-b border-slate-100 last:pb-0 last:border-0"
                >
                  <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 flex-shrink-0 relative overflow-hidden">
                    <Image
                      src={item.part.images[0]}
                      alt={item.part.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-slate-900 text-base mb-1 truncate">
                      {item.part.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <p className="text-sm text-slate-500 font-medium bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 inline-block w-fit">
                        Qty: <span className="text-slate-900">{item.quantity}</span>
                      </p>
                      <p className="font-bold text-slate-900">
                        ${item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2 pb-3 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-blue-600" /> Shipping Details
            </h3>
            <div className="space-y-1 text-sm text-slate-600">
              <p className="font-bold text-slate-900 text-base mb-1">
                {order.shippingAddress.fullName}
              </p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p>{order.shippingAddress.zipCode}</p>
              <p className="pt-2 font-medium text-slate-500">
                Phone: <span className="text-slate-700">{order.shippingAddress.phone}</span>
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2 pb-3 border-b border-slate-100">
              <CreditCard className="w-4 h-4 text-blue-600" /> Payment Summary
            </h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">
                  ${order.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Shipping</span>
                <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  Calculated Later
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-xl font-black text-slate-900">
                  ${order.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[10px] text-center bg-slate-50 text-slate-500 p-2 rounded-lg border border-slate-100">
                Manual order. Payment settled offline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}