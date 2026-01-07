"use client";
import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchCart, removeFromCart } from "@/lib/redux/cartSlice";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Lock,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import withUserAuth from "@/components/auth/withUserAuth";
import { useCurrency } from "@/context/CurrencyContext"; // IMPORT

interface CartItem {
  part: {
    _id: string;
    slug: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
}

function CartPageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems, status } = useSelector(
    (state: RootState) => state.cart
  );
  const { symbol, rate } = useCurrency(); // GET CURRENCY

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemoveItem = async (partId: string) => {
    await dispatch(removeFromCart(partId));
    toast.success("Item removed");
  };

  const subtotal = useMemo(() => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce(
      (acc: number, item: CartItem) => acc + item.part.price * item.quantity,
      0
    );
  }, [cartItems]);

  const convertedSubtotal = subtotal * rate;

  if (status === "loading" && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900">
            Shopping Cart
          </h1>
          <p className="text-slate-500 mt-2">
            {cartItems.length > 0
              ? `You have ${cartItems.length} items.`
              : "Your cart is empty."}
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl shadow-sm border">
                {cartItems.map((item: CartItem) => {
                  const itemPrice = item.part.price * rate;
                  const itemTotal = itemPrice * item.quantity;
                  return (
                    <div
                      key={item.part._id}
                      className="grid grid-cols-12 gap-6 items-center p-6 border-b"
                    >
                      <div className="col-span-6 flex items-center gap-5">
                        <Link
                          href={`/product/${item.part.slug}`}
                          className="w-24 h-24 bg-slate-100 rounded-xl relative"
                        >
                          <Image
                            src={item.part.images[0]}
                            alt={item.part.name}
                            fill
                            className="object-contain p-2"
                          />
                        </Link>
                        <div>
                          <Link
                            href={`/product/${item.part.slug}`}
                            className="font-bold text-slate-900 line-clamp-2"
                          >
                            {item.part.name}
                          </Link>
                          <p className="text-sm text-slate-500">
                            {symbol}
                            {itemPrice.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <div className="flex items-center border rounded-xl h-10">
                          <button className="w-10 h-full">
                            <Minus size={14} />
                          </button>
                          <span className="w-12 text-center text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button className="w-10 h-full">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2 text-right">
                        <p className="text-lg font-black">
                          {symbol}
                          {itemTotal.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="col-span-1 text-right">
                        <button onClick={() => handleRemoveItem(item.part._id)}>
                          <Trash2
                            className="text-slate-400 hover:text-red-500"
                            size={18}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <aside className="lg:col-span-4">
              <div className="bg-white p-8 rounded-3xl shadow-lg sticky top-28">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">
                      {symbol}
                      {convertedSubtotal.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-sm">Calculated at checkout</span>
                  </div>
                  <div className="pt-4 border-t flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-black">
                      {symbol}
                      {convertedSubtotal.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600"
                >
                  <Lock size={16} /> Proceed to Checkout
                </Link>
              </div>
            </aside>
          </div>
        ) : (
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
            <p className="text-slate-500 my-4">
              Explore our collection to find parts you'll love.
            </p>
            <Link
              href="/shop"
              className="bg-slate-900 text-white font-bold py-3 px-6 rounded-xl"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default withUserAuth(CartPageContent);