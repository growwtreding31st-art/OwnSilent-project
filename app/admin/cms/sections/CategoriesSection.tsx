"use client"
import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2, Loader2, Eye, EyeOff, Save, MessageSquare, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';
import TagSelector from '@/components/TagSelector';
import cmsApi from '@/lib/api/cms.api';

interface Category {
    _id: string;
    name: string;
    slug: string;
    shortDescription?: string;
    introduction: string;
    icon?: string;
    featuredImage?: string;
    tags?: string[];
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };
    isActive: boolean;
    viewCount: number;
    createdAt: string;
}

interface FAQ {
    _id: string;
    question: string;
    answer: string;
    displayOrder: number;
    status: 'Draft' | 'Published';
}

interface Comment {
    _id: string;
    userName: string;
    email: string;
    comment: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Spam';
    createdAt: string;
}

export default function CategoriesSection() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'basic' | 'faqs' | 'comments'>('basic');

    // Category FAQs and Comments
    const [categoryFAQs, setCategoryFAQs] = useState<FAQ[]>([]);
    const [categoryComments, setCategoryComments] = useState<Comment[]>([]);
    const [showFAQForm, setShowFAQForm] = useState(false);
    const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        introduction: '',
        icon: '',
        featuredImage: '',
        tags: [] as string[],
        seo: {
            metaTitle: '',
            metaDescription: '',
            keywords: [] as string[],
        },
        isActive: true,
    });

    const [faqFormData, setFaqFormData] = useState({
        question: '',
        answer: '',
        displayOrder: 0,
        status: 'Published' as 'Draft' | 'Published',
    });

    const [keywordsInput, setKeywordsInput] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (editingCategory && activeTab === 'faqs') {
            fetchCategoryFAQs();
        }
        if (editingCategory && activeTab === 'comments') {
            fetchCategoryComments();
        }
    }, [editingCategory, activeTab]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await cmsApi.categories.getAll({ search: searchQuery });
            setCategories(response.data.categories || response.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategoryFAQs = async () => {
        if (!editingCategory) return;
        try {
            const response = await cmsApi.faqs.getAll({ categories: [editingCategory._id] });
            setCategoryFAQs(response.data.faqs || []);
        } catch (error: any) {
            toast.error('Failed to fetch FAQs');
        }
    };

    const fetchCategoryComments = async () => {
        if (!editingCategory) return;
        try {
            const response = await cmsApi.comments.getAll({ category: editingCategory._id });
            setCategoryComments(response.data.comments || response.data || []);
        } catch (error: any) {
            toast.error('Failed to fetch comments');
        }
    };

    const handleEditClick = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            shortDescription: category.shortDescription || '',
            introduction: category.introduction,
            icon: category.icon || '',
            featuredImage: category.featuredImage || '',
            tags: category.tags || [],
            seo: {
                metaTitle: category.seo?.metaTitle || '',
                metaDescription: category.seo?.metaDescription || '',
                keywords: category.seo?.keywords || [],
            },
            isActive: category.isActive,
        });
        setKeywordsInput(category.seo?.keywords?.join(', ') || '');
        setActiveTab('basic');
        setShowForm(true);
    };

    const handleCancelEdit = () => {
        setEditingCategory(null);
        setFormData({
            name: '',
            shortDescription: '',
            introduction: '',
            icon: '',
            featuredImage: '',
            tags: [],
            seo: { metaTitle: '', metaDescription: '', keywords: [] },
            isActive: true,
        });
        setKeywordsInput('');
        setShowForm(false);
        setActiveTab('basic');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const submitData = {
            ...formData,
            seo: {
                ...formData.seo,
                keywords: keywordsInput.split(',').map(k => k.trim()).filter(Boolean),
            },
        };

        try {
            if (editingCategory) {
                await cmsApi.categories.update(editingCategory._id, submitData);
                toast.success('Category updated successfully!');
            } else {
                await cmsApi.categories.create(submitData);
                toast.success('Category created successfully!');
            }
            handleCancelEdit();
            fetchCategories();
        } catch (error: any) {
            toast.error(error.response?.data?.message || `Failed to ${editingCategory ? 'update' : 'create'} category`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await cmsApi.categories.delete(id);
                toast.success('Category deleted successfully!');
                fetchCategories();
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Failed to delete category');
            }
        }
    };

    // FAQ Management
    const handleAddFAQ = () => {
        setEditingFAQ(null);
        setFaqFormData({ question: '', answer: '', displayOrder: 0, status: 'Published' });
        setShowFAQForm(true);
    };

    const handleEditFAQ = (faq: FAQ) => {
        setEditingFAQ(faq);
        setFaqFormData({
            question: faq.question,
            answer: faq.answer,
            displayOrder: faq.displayOrder,
            status: faq.status,
        });
        setShowFAQForm(true);
    };

    const handleSubmitFAQ = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;

        try {
            const data = {
                ...faqFormData,
                categories: [editingCategory._id],
                tags: editingCategory.tags || [],
            };

            if (editingFAQ) {
                await cmsApi.faqs.update(editingFAQ._id, data);
                toast.success('FAQ updated!');
            } else {
                await cmsApi.faqs.create(data);
                toast.success('FAQ added!');
            }
            setShowFAQForm(false);
            fetchCategoryFAQs();
        } catch (error: any) {
            toast.error('Failed to save FAQ');
        }
    };

    const handleDeleteFAQ = async (id: string) => {
        if (window.confirm('Delete this FAQ?')) {
            try {
                await cmsApi.faqs.delete(id);
                toast.success('FAQ deleted!');
                fetchCategoryFAQs();
            } catch (error: any) {
                toast.error('Failed to delete FAQ');
            }
        }
    };

    // Comment Management
    const handleApproveComment = async (id: string) => {
        try {
            await cmsApi.comments.approve(id);
            toast.success('Comment approved!');
            fetchCategoryComments();
        } catch (error: any) {
            toast.error('Failed to approve comment');
        }
    };

    const handleRejectComment = async (id: string) => {
        try {
            await cmsApi.comments.reject(id);
            toast.success('Comment rejected!');
            fetchCategoryComments();
        } catch (error: any) {
            toast.error('Failed to reject comment');
        }
    };

    const handleDeleteComment = async (id: string) => {
        if (window.confirm('Delete this comment?')) {
            try {
                await cmsApi.comments.delete(id);
                toast.success('Comment deleted!');
                fetchCategoryComments();
            } catch (error: any) {
                toast.error('Failed to delete comment');
            }
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (showForm) {
        return (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">
                        {editingCategory ? `Edit: ${editingCategory.name}` : 'Add New Category'}
                    </h2>
                    <button
                        onClick={handleCancelEdit}
                        className="text-slate-500 hover:text-slate-700 text-sm font-medium"
                    >
                        ← Back to List
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-slate-200">
                    <button
                        onClick={() => setActiveTab('basic')}
                        className={`px-4 py-2 font-medium text-sm ${activeTab === 'basic' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600'}`}
                    >
                        Basic Info
                    </button>
                    {editingCategory && (
                        <>
                            <button
                                onClick={() => setActiveTab('faqs')}
                                className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'faqs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600'}`}
                            >
                                <HelpCircle size={16} /> FAQs
                            </button>
                            <button
                                onClick={() => setActiveTab('comments')}
                                className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'comments' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600'}`}
                            >
                                <MessageSquare size={16} /> Comments
                            </button>
                        </>
                    )}
                </div>

                {/* Basic Info Tab */}
                {activeTab === 'basic' && (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                                    required
                                    disabled={!!editingCategory}
                                />
                                {editingCategory && <p className="text-xs text-slate-500 mt-1">Title cannot be changed</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                <textarea
                                    value={formData.shortDescription}
                                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                                    rows={3}
                                    maxLength={500}
                                    placeholder="Brief description for SEO and category listing"
                                />
                                <p className="text-xs text-slate-500 mt-1">{formData.shortDescription.length}/500</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Content *</label>
                                <RichTextEditor
                                    content={formData.introduction}
                                    onChange={(content) => setFormData({ ...formData, introduction: content })}
                                />
                                <p className="text-xs text-slate-500 mt-1">Main content that appears on the category page</p>
                            </div>

                            <div>
                                <TagSelector
                                    selectedTags={formData.tags}
                                    onChange={(tags) => setFormData({ ...formData, tags })}
                                    label="Tags (for auto-injecting global FAQs)"
                                    placeholder="Search and select tags..."
                                />
                                <p className="text-xs text-slate-500 mt-1">Global FAQs with matching tags will also appear</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Meta Title</label>
                                    <input
                                        type="text"
                                        value={formData.seo.metaTitle}
                                        onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Meta Description</label>
                                    <input
                                        type="text"
                                        value={formData.seo.metaDescription}
                                        onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Keywords</label>
                                    <input
                                        type="text"
                                        value={keywordsInput}
                                        onChange={(e) => setKeywordsInput(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                        placeholder="keyword1, keyword2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-semibold text-slate-700">Status</label>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                        className={`px-3 py-1 text-xs rounded-lg font-bold ${formData.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}
                                    >
                                        {formData.isActive ? 'Active' : 'Inactive'}
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#176FC0] text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={16} /> {editingCategory ? 'Update' : 'Create'}</>}
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Icon URL</label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Featured Image URL</label>
                                <input
                                    type="text"
                                    value={formData.featuredImage}
                                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                />
                            </div>
                        </div>
                    </form>
                )}

                {/* FAQs Tab */}
                {activeTab === 'faqs' && editingCategory && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-slate-600">Manage FAQs specific to this category</p>
                            <button
                                onClick={handleAddFAQ}
                                className="flex items-center gap-2 bg-[#176FC0] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                <Plus size={16} /> Add FAQ
                            </button>
                        </div>

                        {showFAQForm && (
                            <form onSubmit={handleSubmitFAQ} className="bg-slate-50 p-4 rounded-lg space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Question *</label>
                                    <input
                                        type="text"
                                        value={faqFormData.question}
                                        onChange={(e) => setFaqFormData({ ...faqFormData, question: e.target.value })}
                                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Answer *</label>
                                    <RichTextEditor
                                        content={faqFormData.answer}
                                        onChange={(content) => setFaqFormData({ ...faqFormData, answer: content })}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="bg-[#176FC0] text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                        {editingFAQ ? 'Update' : 'Add'} FAQ
                                    </button>
                                    <button type="button" onClick={() => setShowFAQForm(false)} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="space-y-2">
                            {categoryFAQs.map((faq) => (
                                <div key={faq._id} className="bg-white border border-slate-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-900">{faq.question}</p>
                                            <div className="text-sm text-slate-600 mt-1" dangerouslySetInnerHTML={{ __html: faq.answer.substring(0, 100) + '...' }} />
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEditFAQ(faq)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => handleDeleteFAQ(faq._id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {categoryFAQs.length === 0 && !showFAQForm && (
                                <p className="text-center text-slate-500 py-8">No FAQs yet. Click "Add FAQ" to create one.</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Comments Tab */}
                {activeTab === 'comments' && editingCategory && (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600">Moderate comments for this category</p>
                        <div className="space-y-2">
                            {categoryComments.map((comment) => (
                                <div key={comment._id} className="bg-white border border-slate-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-900">{comment.userName}</p>
                                            <p className="text-sm text-slate-600">{comment.email}</p>
                                            <p className="text-sm text-slate-800 mt-2">{comment.comment}</p>
                                            <p className="text-xs text-slate-500 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className={`text-xs px-2 py-1 rounded ${comment.status === 'Approved' ? 'bg-green-100 text-green-700' : comment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                                {comment.status}
                                            </span>
                                            {comment.status === 'Pending' && (
                                                <div className="flex gap-1">
                                                    <button onClick={() => handleApproveComment(comment._id)} className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                                                        Approve
                                                    </button>
                                                    <button onClick={() => handleRejectComment(comment._id)} className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                            <button onClick={() => handleDeleteComment(comment._id)} className="text-xs text-red-600 hover:underline">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {categoryComments.length === 0 && (
                                <p className="text-center text-slate-500 py-8">No comments yet.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
                <div className="relative w-full sm:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                    />
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-[#176FC0] text-white font-bold py-2.5 px-5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all whitespace-nowrap"
                >
                    <Plus size={16} /> Add Category
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-4 pl-6 text-xs font-bold text-slate-500 uppercase">Name</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Slug</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Views</th>
                            <th className="p-4 pr-6 text-right text-xs font-bold text-slate-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-slate-400" /></td></tr>
                        ) : filteredCategories.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-slate-500">No categories found</td></tr>
                        ) : (
                            filteredCategories.map((category) => (
                                <tr key={category._id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-4 pl-6">
                                        <p className="font-semibold text-slate-800 text-sm">{category.name}</p>
                                        {category.shortDescription && (
                                            <p className="text-xs text-slate-500 mt-1 max-w-xs truncate">{category.shortDescription}</p>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <code className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{category.slug}</code>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${category.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {category.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                                            {category.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">{category.viewCount || 0}</td>
                                    <td className="p-4 pr-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEditClick(category)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-blue-600">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(category._id)} className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600">
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
