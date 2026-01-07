"use client"
import React, { useState } from 'react';
import { CreditCard, FileText, Plus, Edit, Trash2, Download } from 'lucide-react';

const savedCardsData = [
    { id: 1, type: 'visa', last4: '1234', expiry: '12/25', isDefault: true },
    { id: 2, type: 'mastercard', last4: '5678', expiry: '08/24', isDefault: false },
];

const invoicesData = [
    { id: 'INV-12345', date: 'November 12, 2023', amount: 12500, status: 'Paid' },
    { id: 'INV-12344', date: 'November 12, 2023', amount: 8200, status: 'Paid' },
    { id: 'INV-12343', date: 'November 11, 2023', amount: 25000, status: 'Paid' },
];

export default function BillingPage() {

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Payments & Billing</h1>
                <p className="text-slate-500 mt-1">Manage your saved payment methods and view your billing history.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3"><CreditCard className="w-7 h-7 text-amber-600"/> Saved Payment Methods</h2>
                    <button className="flex items-center gap-2 text-sm font-semibold bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200"><Plus className="w-4 h-4"/> Add New Card</button>
                </div>
                <div className="space-y-4">
                    {savedCardsData.map(card => (
                        <div key={card.id} className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
                           <div className="flex items-center gap-4">
                               <img src={`/images/icons/${card.type}.svg`} alt={card.type} className="w-12"/>
                               <div>
                                   <p className="font-semibold text-slate-800">{card.type.charAt(0).toUpperCase() + card.type.slice(1)} ending in {card.last4}</p>
                                   <p className="text-sm text-slate-500">Expires {card.expiry}</p>
                               </div>
                               {card.isDefault && <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Default</span>}
                           </div>
                           <div className="flex gap-2">
                               <button className="p-2 text-slate-500 hover:bg-slate-200 rounded-md"><Edit className="w-4 h-4" /></button>
                               <button className="p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 rounded-md"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"><FileText className="w-7 h-7 text-amber-600"/> Billing History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-sm text-slate-500 font-semibold border-b border-slate-200">
                                <th className="p-4">Invoice ID</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoicesData.map(invoice => (
                                <tr key={invoice.id} className="border-b border-slate-100 last:border-b-0">
                                    <td className="p-4 font-semibold text-slate-700">{invoice.id}</td>
                                    <td className="p-4 text-slate-600">{invoice.date}</td>
                                    <td className="p-4 font-bold text-slate-800">${invoice.amount.toLocaleString('en-IN')}</td>
                                    <td className="p-4">
                                        <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-800">{invoice.status}</span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="flex items-center gap-2 ml-auto text-sm font-semibold bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200">
                                            <Download className="w-4 h-4"/> Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}