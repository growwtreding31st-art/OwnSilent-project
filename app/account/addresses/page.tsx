"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchUserProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/lib/redux/userProfileSlice";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  Home,
  X,
  Loader2,
  ArrowRight,
  Save,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

interface Address {
  _id: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

const AddressModal = ({
  isOpen,
  onClose,
  onSave,
  address,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (addressData: any) => void;
  address: Address | null;
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const addressData = {
      label: formData.get("label"),
      fullName: formData.get("fullName"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      country: formData.get("country"),
      phone: formData.get("phone"),
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
                {address
                  ? "Update your shipping details"
                  : "Where should we send your order?"}
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
              const form = e.currentTarget
                .closest(".bg-white")
                ?.querySelector("form");
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

export default function SavedAddressesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, status } = useSelector(
    (state: RootState) => state.userProfile
  );
  const addresses = profile?.addresses || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, profile]);

  const handleOpenModal = (address: Address | null = null) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleSaveAddress = (
    addressData: Omit<Address, "_id" | "isDefault">
  ) => {
    const action = editingAddress
      ? dispatch(
          updateAddress({ addressId: editingAddress._id, addressData })
        ).unwrap()
      : dispatch(addAddress(addressData)).unwrap();

    toast
      .promise(action, {
        loading: "Saving address...",
        success: `Address ${editingAddress ? "updated" : "added"} successfully!`,
        error: `Failed to ${editingAddress ? "update" : "add"} address.`,
      })
      .then(() => handleCloseModal());
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      toast.promise(dispatch(deleteAddress(id)).unwrap(), {
        loading: "Deleting address...",
        success: "Address deleted successfully!",
        error: "Failed to delete address.",
      });
    }
  };

  const handleSetDefault = (id: string) => {
    toast.promise(dispatch(setDefaultAddress(id)).unwrap(), {
      loading: "Setting default address...",
      success: "Default address updated!",
      error: "Failed to set default address.",
    });
  };

  if (status === "loading" && !profile) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <AddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAddress}
        address={editingAddress}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Saved Addresses
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Manage your shipping addresses for a faster checkout.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal(null)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 hover:shadow-blue-200"
        >
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map((address: Address) => (
          <div
            key={address._id}
            className={`group bg-white p-6 rounded-3xl shadow-sm border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[220px] ${
              address.isDefault
                ? "border-blue-500 shadow-md ring-1 ring-blue-500/20"
                : "border-slate-100 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
            }`}
          >
            {address.isDefault && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-sm z-10">
                Default Address
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    address.isDefault
                      ? "bg-blue-50 text-blue-600"
                      : "bg-slate-50 text-slate-500"
                  }`}
                >
                  {address.label === "Home" ? (
                    <Home className="w-5 h-5" />
                  ) : (
                    <MapPin className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {address.label}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {address.fullName}
                  </p>
                </div>
              </div>

              <div className="pl-[52px] space-y-1">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {address.street}
                  <br />
                  {address.city}, {address.state} {address.zipCode}
                  <br />
                  {address.country}
                </p>
                <p className="text-xs font-medium text-slate-500 pt-2 flex items-center gap-1.5">
                  Phone: <span className="text-slate-700">{address.phone}</span>
                </p>
              </div>
            </div>

            <div className="pl-[52px] mt-6 pt-4 border-t border-slate-100 flex items-center gap-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => handleOpenModal(address)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => handleDelete(address._id)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address._id)}
                  className="ml-auto text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Set Default
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={() => handleOpenModal(null)}
          className="flex flex-col items-center justify-center bg-slate-50/50 p-6 rounded-3xl border-2 border-dashed border-slate-300 text-slate-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/30 transition-all min-h-[220px] group"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-200 group-hover:border-blue-200 group-hover:scale-110 transition-all">
            <Plus className="w-8 h-8" />
          </div>
          <span className="font-bold text-sm">Add New Address</span>
        </button>
      </div>
    </div>
  );
}