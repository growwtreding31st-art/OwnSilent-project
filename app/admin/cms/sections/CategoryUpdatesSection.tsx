"use client"
import React from 'react';

export default function CategoryUpdatesSection() {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Category Updates</h2>
            <p className="text-slate-600">
                Category Updates management is available at{' '}
                <a href="/admin/category-updates" className="text-blue-600 hover:underline">
                    /admin/category-updates
                </a>
            </p>
        </div>
    );
}
