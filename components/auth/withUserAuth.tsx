"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/redux/store';
import { Loader2 } from 'lucide-react';

const withUserAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const { user, status } = useSelector((state: RootState) => state.auth);

    const isLoading = status === 'loading' || status === 'idle';

    useEffect(() => {
      // यदि लोडिंग पूरी हो गई है और कोई उपयोगकर्ता नहीं है, तो लॉगिन पेज पर रीडायरेक्ट करें।
      if (!isLoading && !user) {
        router.replace('/login');
      }
    }, [isLoading, user, router]);

    // जब तक हम उपयोगकर्ता की स्थिति की जाँच कर रहे हैं, या यदि उपयोगकर्ता नहीं है और हम रीडायरेक्ट करने वाले हैं, तो लोडर दिखाएँ।
    if (isLoading || !user) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <Loader2 className="w-12 h-12 animate-spin text-slate-500" />
        </div>
      );
    }

    // यदि लोडिंग पूरी हो गई है और उपयोगकर्ता मौजूद है, तो संरक्षित कंपोनेंट दिखाएँ।
    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withUserAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withUserAuth;