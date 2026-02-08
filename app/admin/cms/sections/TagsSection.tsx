"use client"
import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2, Loader2, Tag as TagIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import cmsApi from '@/lib/api/cms.api';

interface Tag {
    _id: string;
    name: string;
    slug: string;
    type: string;
    description?: string;
    usageCount: number;
    isActive: boolean;
}

const TAG_TYPES = ['category', 'brand', 'model', 'city', 'country', 'general'];

export default function TagsSection() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingTag, setEditingTag] = useState<Tag | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<string>('');

    const [formData, setFormData] = useState<{
        name: string;
        type: 'category' | 'brand' | 'model' | 'city' | 'country' | 'general';
        description: string;
        isActive: boolean;
    }>({
        name: '',
        type: 'general',
        description: '',
        isActive: true,
    });

    useEffect(() => {
        fetchTags();
    }, [filterType]);

    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await cmsApi.tags.getAll({ type: filterType || undefined, search: searchQuery });
            setTags(response.data.tags || []);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to fetch tags');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (tag: Tag) => {
        setEditingTag(tag);
        setFormData({
            name: tag.name,
            type: tag.type as 'category' | 'brand' | 'model' | 'city' | 'country' | 'general',
            description: tag.description || '',
            isActive: tag.isActive,
        });
        setShowForm(true);
    };

    const handleCancelEdit = () => {
        setEditingTag(null);
        setFormData({ name: '', type: 'general', description: '', isActive: true });
        setShowForm(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingTag) {
                await cmsApi.tags.update(editingTag._id, formData);
                toast.success('Tag updated successfully!');
            } else {
                await cmsApi.tags.create(formData);
                toast.success('Tag created successfully!');
            }
            handleCancelEdit();
            fetchTags();
        } catch (error: any) {
            toast.error(error.response?.data?.message || `Failed to ${editingTag ? 'update' : 'create'} tag`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, usageCount: number) => {
        if (usageCount > 0) {
            toast.error(`This tag is used ${usageCount} times. Please reassign or remove it from content first.`);
            return;
        }

        if (window.confirm('Are you sure you want to delete this tag?')) {
            try {
                await cmsApi.tags.delete(id);
                toast.success('Tag deleted successfully!');
                fetchTags();
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Failed to delete tag');
            }
        }
    };

    const filteredTags = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (showForm) {
        return (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">
                        {editingTag ? 'Edit Tag' : 'Add New Tag'}
                    </h2>
                    <button
                        onClick={handleCancelEdit}
                        className="text-slate-500 hover:text-slate-700 text-sm font-medium"
                    >
                        ← Back to List
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Tag Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Tag Type *</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'category' | 'brand' | 'model' | 'city' | 'country' | 'general' })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                            required
                        >
                            {TAG_TYPES.map(type => (
                                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                            rows={3}
                            maxLength={500}
                        />
                    </div>

                    <div className="flex items-center justify-between">
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
                        className="w-full bg-[#176FC0] text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : (editingTag ? 'Update Tag' : 'Create Tag')}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
                <div className="flex gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                        />
                    </div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                    >
                        <option value="">All Types</option>
                        {TAG_TYPES.map(type => (
                            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-[#176FC0] text-white font-bold py-2.5 px-5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all whitespace-nowrap"
                >
                    <Plus size={16} /> Add Tag
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-4 pl-6 text-xs font-bold text-slate-500 uppercase">Name</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Type</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Usage</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                            <th className="p-4 pr-6 text-right text-xs font-bold text-slate-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-slate-400" /></td></tr>
                        ) : filteredTags.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-slate-500">No tags found</td></tr>
                        ) : (
                            filteredTags.map((tag) => (
                                <tr key={tag._id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-2">
                                            <TagIcon size={16} className="text-slate-400" />
                                            <span className="font-semibold text-slate-800 text-sm">{tag.name}</span>
                                        </div>
                                        {tag.description && (
                                            <p className="text-xs text-slate-500 mt-1 max-w-xs truncate">{tag.description}</p>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                                            {tag.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">{tag.usageCount} times</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${tag.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {tag.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEditClick(tag)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-blue-600">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(tag._id, tag.usageCount)} className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600">
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
