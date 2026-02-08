"use client"
import React, { useState } from 'react';
import { Layers, FileText, HelpCircle, Tag as TagIcon, MessageSquare } from 'lucide-react';
import CategoriesSection from './sections/CategoriesSection';
import CategoryUpdatesSection from './sections/CategoryUpdatesSection';

import TagsSection from './sections/TagsSection';
import CommentsSection from './sections/CommentsSection';

const tabs = [
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'updates', label: 'Category Updates', icon: FileText },

    { id: 'tags', label: 'Tags', icon: TagIcon },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
];

export default function CMSPage() {
    const [activeTab, setActiveTab] = useState('categories');

    const ActiveSection = () => {
        switch (activeTab) {
            case 'categories':
                return <CategoriesSection />;
            case 'updates':
                return <CategoryUpdatesSection />;

            case 'tags':
                return <TagsSection />;
            case 'comments':
                return <CommentsSection />;
            default:
                return <CategoriesSection />;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans">
            <header className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <Layers className="w-6 h-6 text-[#176FC0]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">CMS Management</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Manage categories, updates, FAQs, tags, and comments.</p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-[#176FC0] text-white shadow-lg shadow-blue-500/20'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                >
                                    <Icon size={16} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* Active Section */}
            <div className="animate-in fade-in">
                <ActiveSection />
            </div>
        </div>
    );
}
