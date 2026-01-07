"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, CheckCircle } from 'lucide-react';
import api from '@/lib/api/axiosConfig';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/auth/forgot-password', { email });
            setSubmitted(true);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full min-h-screen bg-slate-50 grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-center bg-white p-6 md:p-12">
                <div className="w-full max-w-md space-y-8">
                    {submitted ? (
                        <div className="text-center">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h1 className="text-3xl font-bold text-slate-900">Request Sent</h1>
                            <p className="mt-4 text-slate-600">
                                If an account with the email <strong className="text-slate-800">{email}</strong> exists, we have sent a link to reset your password. Please check your inbox (and spam folder).
                            </p>
                            <Link href="/login">
                                <span className="mt-8 inline-block w-full py-3 px-4 text-center font-semibold bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400">
                                    Back to Login
                                </span>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h1 className="text-4xl font-bold text-slate-900">Forgot Your Password?</h1>
                                <p className="mt-2 text-slate-600">
                                    No problem! Enter your email address below and we'll send you a link to reset it.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="peer w-full bg-slate-100 border border-slate-300 rounded-lg text-slate-900 placeholder-transparent h-12 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        placeholder="you@example.com"
                                        required
                                    />
                                    <label 
                                        htmlFor="email" 
                                        className="absolute left-3 -top-2.5 bg-white px-1 text-slate-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-amber-600 peer-focus:text-sm"
                                    >
                                        Email Address
                                    </label>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-slate-900 bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-300"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
                                    </button>
                                </div>
                            </form>
                             <div className="text-center text-slate-600">
                                Remember your password?
                                <Link href="/login" className="font-bold text-amber-600 hover:underline ml-1">
                                    Sign In
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="relative flex-col items-center justify-center hidden h-full bg-slate-100 md:flex">
                <Image src="/images/login/auth-image-light.jpg" alt="Car dashboard" layout="fill" objectFit="cover" />
            </div>
        </main>
    );
}