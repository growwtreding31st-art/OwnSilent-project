"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchWishlist,
  toggleWishlist,
  addToCart,
} from "@/lib/redux/cartSlice";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Loader2,
  ArrowRight,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";
import withUserAuth from "@/components/auth/withUserAuth";

function WishlistPageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist, status } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = async (id: string) => {
    const result = await dispatch(toggleWishlist(id));
    if (toggleWishlist.fulfilled.match(result)) {
      toast.success("Removed from wishlist");
    } else {
      toast.error((result.payload as string) || "Failed to remove item.");
    }
  };

  const handleAddToCart = async (product: any) => {
    const result = await dispatch(
      addToCart({
        partId: product._id,
        quantity: 1,
      })
    );
    if (addToCart.fulfilled.match(result)) {
      toast.success("Added to cart successfully!");
    } else {
      toast.error((result.payload as string) || "Failed to add to cart.");
    }
  };

  if (status === "loading" && wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">
          Loading your favorites...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Wishlist
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Your curated collection of favorite parts.
          </p>
        </div>
        <Link
          href="/shop"
          className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Explore More Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item: any) => (
            <div
              key={item._id}
              className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="relative aspect-square w-full bg-slate-50 border-b border-slate-100 p-6 flex items-center justify-center overflow-hidden">
                <Link href={`/product/${item.slug}`} className="w-full h-full relative">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
                <button
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow mb-4">
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-bold text-slate-900 text-base leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-lg font-black text-slate-900">
                    ${item.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 hover:shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">
            Your Wishlist is Empty
          </h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            It looks like you haven't saved any items yet. Start exploring and add your favorites here.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 hover:shadow-blue-200 hover:-translate-y-1"
          >
            Start Discovering <Search className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default withUserAuth(WishlistPageContent);