"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchCurrentUser } from '@/lib/redux/authSlice';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const PUBLIC_ROUTES = ['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'];

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useSelector((state: RootState) => state.auth);
  const [authChecked, setAuthChecked] = useState(false);

  const isAuthPage = PUBLIC_ROUTES.includes(pathname) || pathname.startsWith('/login/success');
  const isAdminPage = pathname.startsWith('/admin');
  const isAccountPage = pathname.startsWith('/account');
  const hideHeaderFooter = isAdminPage || isAccountPage || isAuthPage;

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window !== 'undefined' && localStorage.getItem('token') && !user) {
        await dispatch(fetchCurrentUser());
      }
      setAuthChecked(true);
    };
    checkAuth();
  }, [dispatch, user]);

  useEffect(() => {
    if (authChecked) {
      if (user && isAuthPage) {
        // If user is logged in and tries to access login/signup pages, send them home
        router.replace('/');
      } else if (!user && (isAdminPage || isAccountPage)) {
        // Only redirect to login if the user is not logged in and tries to access admin or account pages
        router.replace('/login');
      }
    }
  }, [authChecked, user, isAuthPage, isAdminPage, isAccountPage, router]);

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-[#176FC0]" />
      </div>
    );
  }

  if (hideHeaderFooter) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}