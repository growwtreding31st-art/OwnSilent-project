"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchUserProfile, addAddress } from "@/lib/redux/userProfileSlice";
import { fetchCart } from "@/lib/redux/cartSlice";
import { placeOrder } from "@/lib/redux/orderSlice";
import toast from "react-hot-toast";
import {
  Loader2,
  Lock,
  MapPin,
  Plus,
  ShoppingCart,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Truck,
} from "lucide-react";
import withUserAuth from "@/components/auth/withUserAuth";
import { AddressModal, Address } from "@/components/shared/AddressModal";
import Image from "next/image";
import { useCurrency } from "@/context/CurrencyContext"; // IMPORT

interface AddressData {
  _id: string;
  label: string;
  isDefault: boolean;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

function CheckoutPageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { profile, status: profileStatus } = useSelector(
    (state: RootState) => state.userProfile
  );
  const { items: cartItems, status: cartStatus } = useSelector(
    (state: RootState) => state.cart
  );
  const { status: orderStatus } = useSelector(
    (state: RootState) => state.orders
  );
  const { symbol, rate } = useCurrency(); // GET CURRENCY

  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.addresses) {
      const defaultAddress = profile.addresses.find(
        (addr: AddressData) => addr.isDefault
      );
      setSelectedAddressId(
        defaultAddress?._id || profile.addresses[0]?._id || ""
      );
    }
  }, [profile]);

  const subtotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => acc + item.part.price * item.quantity, 0),
    [cartItems]
  );
  const convertedSubtotal = subtotal * rate;

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return toast.error("Please select an address.");
    toast.promise(dispatch(placeOrder(selectedAddressId)).unwrap(), {
      loading: "Placing order...",
      success: (data) => {
        router.push(`/account/orders/${data.order._id}`);
        return "Order placed!";
      },
      error: (err) => err || "Failed to place order.",
    });
  };

  const handleSaveAddress = (
    addressData: Omit<Address, "_id" | "isDefault">
  ) => {
    dispatch(addAddress(addressData))
      .unwrap()
      .then(() => {
        toast.success("Address added!");
        setIsModalOpen(false);
      });
  };

  if (
    (profileStatus === "loading" && !profile) ||
    (cartStatus === "loading" && cartItems.length === 0)
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen text-center flex flex-col justify-center">
        <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
        <p className="my-4">Add items to your cart to checkout.</p>
        <Link
          href="/shop"
          className="bg-slate-900 text-white py-3 px-6 rounded-xl"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
        address={null}
      />
      <main className="bg-slate-50 min-h-screen pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900">
              Checkout
            </h1>
            <p className="text-slate-500 mt-2">
              Complete your order by confirming your shipping details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border">
                <h2 className="text-xl font-bold mb-6">
                  1. Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile?.addresses?.map((address: AddressData) => (
                    <div
                      key={address._id}
                      onClick={() => setSelectedAddressId(address._id)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer ${selectedAddressId === address._id ? "border-blue-600" : "hover:border-slate-300"}`}
                    >
                      <h3 className="font-bold text-lg">{address.label}</h3>
                      <p className="text-sm text-slate-600">
                        {address.fullName}, {address.street}, {address.city},{" "}
                        {address.state} {address.zipCode}
                      </p>
                    </div>
                  ))}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed hover:border-blue-500"
                  >
                    <Plus />{" "}
                    <span className="font-bold text-sm mt-2">
                      Add New Address
                    </span>
                  </button>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border">
                <h2 className="text-xl font-bold mb-6">2. Order Items</h2>
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                  {cartItems.map((item) => {
                    const itemTotal = item.part.price * item.quantity * rate;
                    return (
                      <div
                        key={item.part._id}
                        className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50 border"
                      >
                        <div className="w-20 h-20 bg-white rounded-xl border relative">
                          <Image
                            src={item.part.images[0]}
                            alt={item.part.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold truncate">
                            {item.part.name}
                          </h3>
                          <p className="text-sm">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold">
                          {symbol}
                          {itemTotal.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="bg-white p-8 rounded-3xl shadow-lg sticky top-28">
                <h2 className="text-xl font-bold mb-6">Payment Summary</h2>
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
                    <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                      Calculated Later
                    </span>
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
                <button
                  onClick={handlePlaceOrder}
                  disabled={orderStatus === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 disabled:bg-slate-400"
                >
                  {orderStatus === "loading" ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Lock size={16} /> Confirm Order
                    </>
                  )}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

export default withUserAuth(CheckoutPageContent);