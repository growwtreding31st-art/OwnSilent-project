"use client"
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { fetchCurrentUser } from '@/lib/redux/authSlice';
import { Loader2 } from 'lucide-react';

export default function LoginSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            localStorage.setItem('token', token);
            dispatch(fetchCurrentUser()).finally(() => {
                router.replace('/');
            });
        } else {
            router.replace('/login?error=authentication-failed');
        }
    }, [searchParams, router, dispatch]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-[#176FC0] mx-auto" />
                <p className="mt-4 text-slate-600 font-semibold">
                    Finalizing your login, please wait...
                </p>
            </div>
        </div>
    );
}