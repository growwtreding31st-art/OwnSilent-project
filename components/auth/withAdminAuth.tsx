"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/redux/store';
import { Loader2 } from 'lucide-react';

const withAdminAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const { user, status } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      if (status === 'succeeded' || status === 'failed' || status === 'idle') {
        if (!user) {
          router.replace('/login');
        } else if (user.role !== 'ADMIN') {
          router.replace('/'); 
        }
      }
    }, [user, status, router]);

    if (status === 'loading' || !user || user.role !== 'ADMIN') {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
          <Loader2 className="w-12 h-12 animate-spin text-slate-500" />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAdminAuth;