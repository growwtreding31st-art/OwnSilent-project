"use client";

import { usePathname } from 'next/navigation';

export const useConditionalLayout = () => {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith('/admin');
  const isAccountPage = pathname.startsWith('/account');
  const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(pathname);

  const hideHeaderFooter = isAdminPage || isAccountPage;

  return { hideHeaderFooter, isAuthPage };
};