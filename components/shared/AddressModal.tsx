"use client";
import React from "react";
import { X, MapPin, Save, ArrowRight } from "lucide-react";

export interface Address {
  _id?: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (addressData: Omit<Address, "_id" | "isDefault">) => void;
  address: Address | null;
}

export const AddressModal = ({
  isOpen,
  onClose,
  onSave,
  address,
}: AddressModalProps) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const addressData = {
      label: formData.get("label") as string,
      fullName: formData.get("fullName") as string,
      street: formData.get("street") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipCode: formData.get("zipCode") as string,
      country: formData.get("country") as string,
      phone: formData.get("phone") as string,
    };
    onSave(addressData);
  };

  const inputClasses =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium hover:border-slate-300";
  const labelClasses =
    "block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <header className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                {address ? "Edit Address" : "Add New Address"}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {address ? "Update your shipping details" : "Where should we send your order?"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 overflow-y-auto custom-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label htmlFor="label" className={labelClasses}>
                Address Type
              </label>
              <div className="relative">
                <select
                  id="label"
                  name="label"
                  defaultValue={address?.label || "Home"}
                  required
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none rotate-90" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="fullName" className={labelClasses}>
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                defaultValue={address?.fullName}
                placeholder="e.g. John Doe"
                required
                className={inputClasses}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="phone" className={labelClasses}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue={address?.phone}
                placeholder="+1 (555) 000-0000"
                required
                className={inputClasses}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="street" className={labelClasses}>
                Street Address
              </label>
              <input
                type="text"
                id="street"
                name="street"
                defaultValue={address?.street}
                placeholder="e.g. 123 Main St, Apt 4B"
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="city" className={labelClasses}>
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={address?.city}
                placeholder="New York"
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="state" className={labelClasses}>
                State / Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                defaultValue={address?.state}
                placeholder="NY"
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="zipCode" className={labelClasses}>
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                defaultValue={address?.zipCode}
                placeholder="10001"
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="country" className={labelClasses}>
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                defaultValue={address?.country || "India"}
                placeholder="India"
                required
                className={inputClasses}
              />
            </div>
          </div>
        </form>

        <footer className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              const form = e.currentTarget.closest(".bg-white")?.querySelector("form");
              form?.requestSubmit();
            }}
            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-slate-200 hover:shadow-blue-200 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Address
          </button>
        </footer>
      </div>
    </div>
  );
};