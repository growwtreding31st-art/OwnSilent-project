import React from "react";

export default function PaymentTermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
}
