"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchUserProfile,
  updateUserProfile,
  changeUserPassword,
  updateUserAvatar,
} from "@/lib/redux/userProfileSlice";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Camera,
  Check,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function MyProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, status } = useSelector(
    (state: RootState) => state.userProfile
  );

  const [profileData, setProfileData] = useState({
    fullName: "",
    mobile: "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setProfileData({
        fullName: profile.fullName || "",
        mobile: profile.mobile || "",
      });
      setAvatarPreview(profile.avatar || null);
    }
  }, [profile]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(dispatch(updateUserProfile(profileData)).unwrap(), {
      loading: "Updating profile...",
      success: "Profile updated successfully!",
      error: (err) => err || "Failed to update profile.",
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    toast
      .promise(
        dispatch(
          changeUserPassword({
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
          })
        ).unwrap(),
        {
          loading: "Changing password...",
          success: "Password changed successfully!",
          error: (err) => err || "Failed to change password.",
        }
      )
      .then(() => {
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      });
  };

  const handleAvatarSubmit = () => {
    if (avatarFile) {
      toast
        .promise(dispatch(updateUserAvatar(avatarFile)).unwrap(), {
          loading: "Uploading avatar...",
          success: "Avatar updated successfully!",
          error: (err) => err || "Failed to update avatar.",
        })
        .then(() => {
          setAvatarFile(null);
        });
    }
  };

  if (status === "loading" && !profile) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  const inputClasses =
    "w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
  const iconClasses =
    "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400";
  const labelClasses =
    "block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-slate-200/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-500">
              <div className="w-full h-full rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden relative">
                <Image
                  src={avatarPreview || "/images/avatars/default.png"}
                  alt="User Avatar"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <input
              type="file"
              ref={avatarInputRef}
              onChange={handleAvatarChange}
              className="hidden"
              accept="image/*"
            />
            <button
              onClick={() => avatarInputRef.current?.click()}
              className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 transition-all shadow-lg border-2 border-slate-900"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center md:text-left space-y-2 flex-1">
            <h1 className="text-3xl font-black text-white tracking-tight">
              {profile?.fullName}
            </h1>
            <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4" /> {profile?.email}
            </p>
            {avatarFile && (
              <button
                onClick={handleAvatarSubmit}
                className="mt-3 inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-1.5 px-4 rounded-full text-xs hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/50"
              >
                <Check className="w-3 h-3" /> Save New Avatar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-full">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Personal Information
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Update your personal details
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className={labelClasses}>
                Full Name
              </label>
              <div className="relative group">
                <User
                  className={`${iconClasses} group-focus-within:text-blue-500 transition-colors`}
                />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  className={inputClasses}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="mobile" className={labelClasses}>
                Phone Number
              </label>
              <div className="relative group">
                <Phone
                  className={`${iconClasses} group-focus-within:text-blue-500 transition-colors`}
                />
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={profileData.mobile}
                  onChange={handleProfileChange}
                  className={inputClasses}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={iconClasses} />
                <input
                  id="email"
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-500 cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 ml-1">
                Email address cannot be changed.
              </p>
            </div>

            <div>
              <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={profile?.isSubscribed || false}
                  onChange={async () => {
                    try {
                      // Direct API call for immediate feedback or we can dispatch an action if we added it to slice
                      // For simplicity, let's assume we dispatch an update or call API directly. 
                      // Since I haven't updated the slice, I'll direct call here or dispatch a generic update? 
                      // Better to just use the api instance directly for this small toggle.
                      const { default: api } = await import('@/lib/api/axiosConfig');
                      const res = await api.post('/user/subscription');
                      toast.success(res.data.isSubscribed ? "Subscribed to newsletter!" : "Unsubscribed from newsletter.");
                      dispatch(fetchUserProfile()); // Refresh profile to update state
                    } catch (error) {
                      toast.error("Failed to update subscription.");
                    }
                  }}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <div>
                  <span className="block text-sm font-bold text-slate-700">Subscribe to Newsletter</span>
                  <span className="block text-xs text-slate-500">Receive updates about new products and special offers.</span>
                </div>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 hover:shadow-blue-200 hover:-translate-y-0.5"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-full">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Security Settings
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Change your account password
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="oldPassword" className={labelClasses}>
                Current Password
              </label>
              <div className="relative group">
                <Lock
                  className={`${iconClasses} group-focus-within:text-blue-500 transition-colors`}
                />
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type={showPasswords.old ? "text" : "password"}
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className={inputClasses}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((p) => ({ ...p, old: !p.old }))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPasswords.old ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className={labelClasses}>
                New Password
              </label>
              <div className="relative group">
                <Lock
                  className={`${iconClasses} group-focus-within:text-blue-500 transition-colors`}
                />
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={inputClasses}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((p) => ({ ...p, new: !p.new }))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClasses}>
                Confirm New Password
              </label>
              <div className="relative group">
                <Lock
                  className={`${iconClasses} group-focus-within:text-blue-500 transition-colors`}
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={inputClasses}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}