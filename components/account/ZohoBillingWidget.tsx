"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, CreditCard, Loader2, AlertCircle, TrendingUp, Download } from 'lucide-react';

interface Invoice {
    invoice_id: string;
    invoice_number: string;
    date: string;
    total: number;
    balance: number;
    status: string;
}

interface Estimate {
    estimate_id: string;
    estimate_number: string;
    date: string;
    total: number;
    status: string;
}

interface Statement {
    outstanding_recaivable_amount: number;
    unused_credits_receivable_amount: number;
}

export default function ZohoBillingWidget() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState<{
        invoices: Invoice[];
        estimates: Estimate[];
        statement: Statement;
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                // Assuming token is in localStorage. If using cookies (httpOnly), axios might send auto.
                // The existing code uses redux, but simple axios here is fine for a widget.

                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/zoho-books/dashboard`, {
                    withCredentials: true, // For cookie-based auth if used
                    headers: {
                        'Authorization': `Bearer ${token}` // Fallback if bearer token is used
                    }
                });
                setData(res.data);
            } catch (err) {
                console.error("Zoho Widget Error:", err);
                setError('Failed to load billing details.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex justify-center items-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
    );

    if (error) return null; // Hide if error, or show simplified state

    if (!data || (data.invoices.length === 0 && data.estimates.length === 0)) return null;

    const outstanding = data.statement?.outstanding_recaivable_amount || 0;
    const credits = data.statement?.unused_credits_receivable_amount || 0;

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900 text-sm">Billing Summary</h2>
                        <p className="text-xs text-slate-500 font-medium">Invoices & Estimates</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-0.5">Outstanding</p>
                    <p className={`font-black text-lg ${outstanding > 0 ? 'text-red-500' : 'text-green-600'}`}>
                        ₹{outstanding.toLocaleString('en-IN')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recent Invoices */}
                <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-slate-400" /> Recent Invoices
                    </h3>
                    <div className="space-y-3">
                        {data.invoices.slice(0, 3).map(inv => (
                            <div key={inv.invoice_id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div>
                                    <p className="font-bold text-slate-800 text-xs">{inv.invoice_number}</p>
                                    <p className="text-[10px] text-slate-500">{inv.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-800 text-xs">₹{inv.total.toLocaleString('en-IN')}</p>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${inv.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {inv.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {data.invoices.length === 0 && <p className="text-xs text-slate-400 italic">No invoices found.</p>}
                    </div>
                </div>

                {/* Recent Estimates */}
                <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-slate-400" /> Recent Estimates
                    </h3>
                    <div className="space-y-3">
                        {data.estimates.slice(0, 3).map(est => (
                            <div key={est.estimate_id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div>
                                    <p className="font-bold text-slate-800 text-xs">{est.estimate_number}</p>
                                    <p className="text-[10px] text-slate-500">{est.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-800 text-xs">₹{est.total.toLocaleString('en-IN')}</p>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${est.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {est.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {data.estimates.length === 0 && <p className="text-xs text-slate-400 italic">No estimates found.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
