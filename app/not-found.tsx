'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-16">
      <div className="text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 bg-amber-100 rounded-full mb-8">
          <AlertTriangle className="h-8 w-8 text-amber-600" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tighter">
          404
        </h1>
        
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-900">
          Page Not Found
        </h2>
        
        <p className="mt-4 text-slate-600 max-w-md mx-auto">
          We're sorry, but the page you were looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-10">
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-lg bg-slate-900 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:bg-slate-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}