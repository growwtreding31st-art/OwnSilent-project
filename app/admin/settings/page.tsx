"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchAdminProfile, updateAdminProfile, changeAdminPassword, updateAdminAvatar } from '@/lib/redux/adminProfileSlice';
import { Settings, User, Mail, Phone, Lock, Eye, EyeOff, Loader2, Camera, Shield, Save, CheckCircle2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { profile, status } = useSelector((state: RootState) => state.adminProfile);
    
    const [profileData, setProfileData] = useState({ fullName: '', mobile: '' });
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirm: false });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const avatarInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!profile) {
            dispatch(fetchAdminProfile());
        }
    }, [dispatch, profile]);

    useEffect(() => {
        if (profile) {
            setProfileData({
                fullName: profile.fullName || '',
                mobile: profile.mobile || ''
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
        toast.promise(
            dispatch(updateAdminProfile(profileData)).unwrap(),
            {
                loading: 'Updating profile...',
                success: 'Profile updated successfully!',
                error: (err) => err || 'Failed to update profile.',
            }
        );
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }
        toast.promise(
            dispatch(changeAdminPassword({ oldPassword: passwordData.oldPassword, newPassword: passwordData.newPassword })).unwrap(),
            {
                loading: 'Changing password...',
                success: 'Password changed successfully!',
                error: (err) => err || 'Failed to change password.',
            }
        ).then(() => {
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        });
    };
    
    const handleAvatarSubmit = () => {
        if (avatarFile) {
            toast.promise(
                dispatch(updateAdminAvatar(avatarFile)).unwrap(),
                {
                    loading: 'Uploading avatar...',
                    success: 'Avatar updated successfully!',
                    error: (err) => err || 'Failed to update avatar.',
                }
            ).then(() => {
                setAvatarFile(null);
            });
        }
    };
    
    if (status === 'loading' && !profile) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8FAFC]">
                <Loader2 className="w-12 h-12 animate-spin text-[#176FC0]" />
                <p className="mt-4 text-slate-500 font-medium">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <Settings className="w-6 h-6 text-[#176FC0]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Manage your profile and account security.</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-[#176FC0] to-[#0F4C85] relative"></div>
                        <div className="px-6 pb-6 text-center relative">
                            <div className="relative inline-block -mt-16 mb-3">
                                <div className="p-1.5 bg-white rounded-full">
                                    <div className="w-32 h-32 rounded-full overflow-hidden relative group border border-slate-100">
                                        <Image 
                                            src={avatarPreview || '/placeholder.png'} 
                                            alt="Admin Avatar" 
                                            width={128} 
                                            height={128} 
                                            className="w-full h-full object-cover" 
                                        />
                                        <div 
                                            onClick={() => avatarInputRef.current?.click()}
                                            className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                                        >
                                            <Camera className="w-8 h-8 mb-1" />
                                            <span className="text-xs font-semibold">Change Photo</span>
                                        </div>
                                    </div>
                                </div>
                                <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                                {avatarFile && (
                                    <button 
                                        onClick={handleAvatarSubmit} 
                                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#176FC0] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg hover:bg-blue-700 transition-colors animate-in zoom-in"
                                    >
                                        <Upload className="w-3 h-3" /> Save
                                    </button>
                                )}
                            </div>
                            
                            <h2 className="text-xl font-bold text-slate-900">{profile?.fullName}</h2>
                            <p className="text-slate-500 text-sm mb-4">{profile?.email}</p>
                            
                            <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-50 text-[#176FC0] text-xs font-bold rounded-full w-fit mx-auto border border-blue-100">
                                <Shield className="w-3 h-3" /> Administrator
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Contact Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs">Email Address</p>
                                    <p className="font-semibold text-slate-800">{profile?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs">Phone Number</p>
                                    <p className="font-semibold text-slate-800">{profile?.mobile || 'Not set'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 rounded-xl">
                                <User className="w-5 h-5 text-[#176FC0]" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Personal Information</h3>
                        </div>
                        
                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <input 
                                            id="fullName" 
                                            name="fullName" 
                                            type="text" 
                                            value={profileData.fullName} 
                                            onChange={handleProfileChange} 
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="mobile" className="block text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Phone className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <input 
                                            id="mobile" 
                                            name="mobile" 
                                            type="tel" 
                                            value={profileData.mobile} 
                                            onChange={handleProfileChange} 
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pt-2">
                                <button type="submit" className="flex items-center gap-2 bg-[#176FC0] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all">
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 rounded-xl">
                                <Shield className="w-5 h-5 text-[#176FC0]" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Security</h3>
                        </div>
                        
                        <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-2xl">
                            <div className="space-y-2">
                                <label htmlFor="oldPassword" className="block text-sm font-semibold text-slate-700 ml-1">Current Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Lock className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <input 
                                        id="oldPassword" 
                                        name="oldPassword" 
                                        type={showPasswords.old ? 'text' : 'password'} 
                                        value={passwordData.oldPassword} 
                                        onChange={handlePasswordChange} 
                                        className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                                        placeholder="••••••••"
                                    />
                                    <button type="button" onClick={() => setShowPasswords(p => ({...p, old: !p.old}))} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#176FC0]">
                                        {showPasswords.old ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="newPassword" className="block text-sm font-semibold text-slate-700 ml-1">New Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <input 
                                            id="newPassword" 
                                            name="newPassword" 
                                            type={showPasswords.new ? 'text' : 'password'} 
                                            value={passwordData.newPassword} 
                                            onChange={handlePasswordChange} 
                                            className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                                            placeholder="••••••••"
                                        />
                                        <button type="button" onClick={() => setShowPasswords(p => ({...p, new: !p.new}))} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#176FC0]">
                                            {showPasswords.new ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 ml-1">Confirm New Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <input 
                                            id="confirmPassword" 
                                            name="confirmPassword" 
                                            type={showPasswords.confirm ? 'text' : 'password'} 
                                            value={passwordData.confirmPassword} 
                                            onChange={handlePasswordChange} 
                                            className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                                            placeholder="••••••••"
                                        />
                                        <button type="button" onClick={() => setShowPasswords(p => ({...p, confirm: !p.confirm}))} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#176FC0]">
                                            {showPasswords.confirm ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button type="submit" className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-xl hover:bg-slate-50 hover:text-[#176FC0] transition-colors shadow-sm">
                                    <CheckCircle2 className="w-4 h-4" /> Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}