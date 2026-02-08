"use client"
import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2, Loader2, HelpCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';
import TagSelector from '@/components/TagSelector';
import cmsApi from '@/lib/api/cms.api';

interface FAQ {
    _id: string;
    question: string;
    answer: string;
    tags: string[];
    status: 'Draft' | 'Published';
    viewCount: number;
    helpfulCount: number;
    displayOrder: number;
}

export default function FAQsSection() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        tags: [] as string[],
        status: 'Published' as 'Draft' | 'Published',
        displayOrder: 0,
    });

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        setLoading(true);
        try {
            const response = await cmsApi.faqs.getAll({ search: searchQuery });
            setFaqs(response.data.faqs || response.data || []);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to fetch FAQs');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (faq: FAQ) => {
        setEditingFAQ(faq);
        setFormData({
            question: faq.question,
            answer: faq.answer,
            tags: faq.tags,
            status: faq.status,
            displayOrder: faq.displayOrder,
        });
        setShowForm(true);
    };

    const handleCancelEdit = () => {
        setEditingFAQ(null);
        setFormData({ question: '', answer: '', tags: [], status: 'Published', displayOrder: 0 });
        setShowForm(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingFAQ) {
                await cmsApi.faqs.update(editingFAQ._id, formData);
                toast.success('FAQ updated successfully! Changes will reflect everywhere it appears.');
            } else {
                await cmsApi.faqs.create(formData);
                toast.success('FAQ created successfully!');
            }
            handleCancelEdit();
            fetchFAQs();
        } catch (error: any) {
            toast.error(error.response?.data?.message || `Failed to ${editingFAQ ? 'update' : 'create'} FAQ`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this FAQ? It will be removed from all pages where it appears.')) {
            try {
                await cmsApi.faqs.delete(id);
                toast.success('FAQ deleted successfully!');
                fetchFAQs();
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Failed to delete FAQ');
            }
        }
    };

    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (showForm) {
        return (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">
                        {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
                    </h2>
                    <button
                        onClick={handleCancelEdit}
                        className="text-slate-500 hover:text-slate-700 text-sm font-medium"
                    >
                        ← Back to List
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Question *</label>
                        <input
                            type="text"
                            value={formData.question}
                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                            required
                            maxLength={500}
                        />
                        <p className="text-xs text-slate-500 mt-1">{formData.question.length}/500</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Answer *</label>
                        <RichTextEditor
                            content={formData.answer}
                            onChange={(content) => setFormData({ ...formData, answer: content })}
                        />
                    </div>

                    <div>
                        <TagSelector
                            selectedTags={formData.tags}
                            onChange={(tags) => setFormData({ ...formData, tags })}
                            label="Tags (determines where this FAQ appears) *"
                            placeholder="Search and select tags..."
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            This FAQ will automatically appear on category pages with matching tags
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Display Order</label>
                            <input
                                type="number"
                                value={formData.displayOrder}
                                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                            />
                            <p className="text-xs text-slate-500 mt-1">Lower numbers appear first</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Draft' | 'Published' })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#176FC0] text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : (editingFAQ ? 'Update FAQ' : 'Create FAQ')}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                    />
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-[#176FC0] text-white font-bold py-2.5 px-5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all whitespace-nowrap"
                >
                    <Plus size={16} /> Add FAQ
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[900px]">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-4 pl-6 text-xs font-bold text-slate-500 uppercase">Question</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Views</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Helpful</th>
                            <th className="p-4 pr-6 text-right text-xs font-bold text-slate-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-slate-400" /></td></tr>
                        ) : filteredFAQs.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-slate-500">No FAQs found</td></tr>
                        ) : (
                            filteredFAQs.map((faq) => (
                                <tr key={faq._id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-start gap-2">
                                            <HelpCircle size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold text-slate-800 text-sm">{faq.question}</p>
                                                <p className="text-xs text-slate-500 mt-1">Order: {faq.displayOrder}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${faq.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {faq.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">
                                        <div className="flex items-center gap-1">
                                            <Eye size={14} className="text-slate-400" />
                                            {faq.viewCount || 0}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">
                                        👍 {faq.helpfulCount || 0}
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEditClick(faq)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-blue-600">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(faq._id)} className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
