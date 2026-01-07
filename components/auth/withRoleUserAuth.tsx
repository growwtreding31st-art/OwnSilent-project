"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/redux/store';
import { Loader2 } from 'lucide-react';

const withRoleUserAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const { user, status } = useSelector((state: RootState) => state.auth);

    const isLoading = status === 'loading' || status === 'idle';

    useEffect(() => {
      if (!isLoading) {
        if (!user) {
          router.replace('/login');
        } else if (user.role !== 'USER') {
          router.replace('/'); 
        }
      }
    }, [isLoading, user, router]);

    if (isLoading || !user || user.role !== 'USER') {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <Loader2 className="w-12 h-12 animate-spin text-slate-500" />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withRoleUserAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withRoleUserAuth;