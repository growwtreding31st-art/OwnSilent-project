"use client"
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import api from '@/lib/api/axiosConfig';
import toast from 'react-hot-toast';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }
        if (!token) {
            return toast.error("Invalid or missing reset token.");
        }
        setLoading(true);
        try {
            const response = await api.post(`/auth/reset-password?token=${token}`, { password });
            toast.success(response.data.message);
            router.push('/login');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to reset password. The link may have expired.');
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-center">
                 <h1 className="text-3xl font-bold text-slate-900">Invalid Link</h1>
                 <p className="mt-4 text-slate-600">
                    The password reset link is invalid or has expired. Please request a new one.
                 </p>
                 <Link href="/forgot-password">
                    <span className="mt-8 inline-block w-full py-3 px-4 text-center font-semibold bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400">
                        Request a New Link
                    </span>
                </Link>
            </div>
        );
    }

    return (
        <>
            <div>
                <h1 className="text-4xl font-bold text-slate-900">Set a New Password</h1>
                <p className="mt-2 text-slate-600">
                    Create a new, strong password for your account.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer w-full bg-slate-100 border border-slate-300 rounded-lg text-slate-900 placeholder-transparent h-12 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="New Password"
                        required
                    />
                    <label 
                        htmlFor="password" 
                        className="absolute left-3 -top-2.5 bg-white px-1 text-slate-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-amber-600"
                    >
                        New Password
                    </label>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-500 hover:text-amber-600">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                <div className="relative">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="peer w-full bg-slate-100 border border-slate-300 rounded-lg text-slate-900 placeholder-transparent h-12 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Confirm New Password"
                        required
                    />
                    <label 
                        htmlFor="confirmPassword" 
                        className="absolute left-3 -top-2.5 bg-white px-1 text-slate-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-amber-600"
                    >
                        Confirm New Password
                    </label>
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-3.5 text-slate-500 hover:text-amber-600">
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-sexport default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordFormWrapper />
    </Suspense>
  )
}
5" />}
                    </button>
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-slate-900 bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-300"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Reset Password'}
                    </button>
                </div>
            </form>
        </>
    );
}

function ResetPasswordPageWrapper() {
    return (
        <main className="w-full min-h-screen bg-slate-50 grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-center bg-white p-6 md:p-12">
                <div className="w-full max-w-md space-y-8">
                    <Suspense fallback={<div className="text-center"><Loader2 className="animate-spin h-8 w-8 mx-auto"/></div>}>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>
            <div className="relative flex-col items-center justify-center hidden h-full bg-slate-100 md:flex">
                <Image src="/images/login/auth-image-light.jpg" alt="Car dashboard" layout="fill" objectFit="cover" />
            </div>
        </main>
    )
}

export default function ResetPasswordPage() {
    return (
        <Suspense>
            <ResetPasswordPageWrapper />
        </Suspense>
    )
}