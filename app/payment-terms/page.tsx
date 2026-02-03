"use client";
import React from "react";
import { CreditCard, Bank, Paypal, Info, CheckCircle2, AlertTriangle } from "lucide-react";

const PaymentTermsPage: React.FC = () => {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-blue-50 selection:text-blue-900">
      {/* Header Section */}
      <div className="relative bg-slate-50 pt-32 pb-20 border-b border-slate-200 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-600 uppercase tracking-wider mb-6">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            Payment Information
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Payment Terms
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Please read the payment terms carefully before placing your order with Own Silent International Limited.
          </p>
        </div>
      </div>

      {/* Content Cards */}
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Card 1 - Introduction */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Introduction
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              At Own Silent International Limited, we ensure a secure, smooth, and transparent payment process. Orders will only be processed once payment is confirmed.
            </p>
          </div>
        </div>

        {/* Card 2 - Accepted Payment Methods */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-500" />
              Accepted Payment Methods
            </h2>
            <ul className="space-y-2 text-gray-600 text-sm pl-5 list-disc">
              <li>Credit Cards (Visa, MasterCard, American Express)</li>
              <li>Debit Cards</li>
              <li>PayPal</li>
              <li>Bank Transfers</li>
            </ul>
          </div>
        </div>

        {/* Card 3 - Transaction Charges */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Bank className="w-5 h-5 text-blue-500" />
              Transaction Charges
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Customers are responsible for any transaction fees, bank charges, or PayPal fees incurred during the payment process.
            </p>
          </div>
        </div>

        {/* Card 4 - Payment Confirmation */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              Payment Confirmation
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              After successful payment, you will receive an email confirmation. Orders will only be processed and shipped once payment is verified.
            </p>
          </div>
        </div>

        {/* Card 5 - Disclaimer */}
        <div className="bg-red-50 rounded-3xl shadow-md border border-red-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              Limitation of Liability
            </h2>
            <p className="text-red-800 text-sm leading-relaxed">
              Own Silent International Limited assumes no responsibility for delays, transaction errors, or banking issues during the payment process. Customers accept full responsibility for any risks involved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentTermsPage;
