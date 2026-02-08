"use client"
import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, Pencil, Trash2, Loader2, MessageSquare, HelpCircle, X, Eye, UploadCloud, Mail } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';
import categoryBlogsApi from '@/lib/api/categoryBlogs.api';
import cmsApi from '@/lib/api/cms.api';
import api from '@/lib/api/axiosConfig';
import MediaPickerModal from '@/components/admin/MediaPickerModal';

interface CategoryBlog {
    _id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    featuredImage?: string;
    categories: any[];
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
        canonicalUrl?: string;
        ogTitle?: string;
        ogDescription?: string;
        ogImage?: string;
        robots?: string;
        structuredData?: string;
    };
    status: 'Draft' | 'Published';
    viewCount: number;
    publishedAt?: string;
    updates?: Update[];
}

interface Update {
    _id: string;
    title: string;
    content: string;
    date: string;
    image?: string;
}

interface FAQ {
    _id: string;
    question: string;
    answer: string;
    displayOrder: number;
}

interface Comment {
    _id: string;
    user: { name: string; email: string };
    content: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Spam';
    createdAt: string;
}

export default function SpecialPagesPage() {
    const [activeTab, setActiveTab] = useState<'list' | 'form' | 'comments' | 'updates'>('list');
    const [blogs, setBlogs] = useState<CategoryBlog[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingBlog, setEditingBlog] = useState<CategoryBlog | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
    const [mediaPickerTarget, setMediaPickerTarget] = useState<'blog' | 'update'>('blog');
    const [sendingNewsletter, setSendingNewsletter] = useState(false);

    const handleSendNewsletter = async (blog: CategoryBlog) => {
        if (!window.confirm(`Are you sure you want to send a newsletter for "${blog.title}" to ALL registered users?`)) return;

        setSendingNewsletter(true);
        const toastId = toast.loading("Sending newsletter...");

        try {
            await api.post('/admin/newsletter/send', {
                subject: `New Update: ${blog.title}`,
                content: `
                    <h2>${blog.title}</h2>
                    <p>${blog.description}</p>
                    ${blog.featuredImage ? `<img src="${blog.featuredImage}" alt="${blog.title}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0;" />` : ''}
                    <p>Read the full article on our website.</p>
                `,
                entityType: 'SpecialPage',
                entityId: blog._id,
                link: `https://ownsilent.international/${blog.slug}` // Adjust domain dynamically if possible
            });
            toast.success("Newsletter sent successfully!", { id: toastId });
        } catch (error: any) {
            console.error("Newsletter failed:", error);
            toast.error(error.response?.data?.message || "Failed to send newsletter", { id: toastId });
        } finally {
            setSendingNewsletter(false);
        }
    };

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        featuredImage: '',
        categories: [] as string[],
        seo: {
            metaTitle: '',
            metaDescription: '',
            keywords: [] as string[],
            canonicalUrl: '',
            ogTitle: '',
            ogDescription: '',
            ogImage: '',
            robots: 'index, follow',
            structuredData: '',
        },
        status: 'Draft' as 'Draft' | 'Published',
    });

    // FAQ state
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [faqForm, setFaqForm] = useState({ question: '', answer: '', displayOrder: 0 });
    const [editingFaqId, setEditingFaqId] = useState<string | null>(null);

    // Updates state
    const [updates, setUpdates] = useState<Update[]>([]);
    const [updateForm, setUpdateForm] = useState<{ title: string; content: string; image?: string }>({ title: '', content: '' });
    const [editingUpdateId, setEditingUpdateId] = useState<string | null>(null);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
    const [updateImagePreview, setUpdateImagePreview] = useState<string | null>(null);
    const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);

    // Centralized comment state
    const [allBlogComments, setAllBlogComments] = useState<{
        blog: { _id: string; title: string; slug: string };
        comments: Comment[];
    }[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentFilter, setCommentFilter] = useState<'Pending' | 'Approved' | 'Rejected' | 'Spam'>('Pending');

    useEffect(() => {
        if (activeTab === 'list') {
            fetchBlogs();
        }
        if (activeTab === 'comments') {
            fetchAllComments();
        }
        fetchCategories();
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'comments') {
            fetchAllComments();
        }
    }, [commentFilter]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await categoryBlogsApi.admin.getAll({ search: searchQuery });
            setBlogs(response.data.blogs || response.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to fetch special pages');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await cmsApi.categories.getAll();
            setCategories(response.data.categories || response.data);
        } catch (error) {
            console.error('Failed to fetch categories');
        }
    };

    const handleEditClick = (blog: CategoryBlog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            description: blog.description,
            content: blog.content,
            featuredImage: blog.featuredImage || '',
            categories: blog.categories.map((c: any) => c._id || c),
            seo: {
                metaTitle: blog.seo?.metaTitle || '',
                metaDescription: blog.seo?.metaDescription || '',
                keywords: blog.seo?.keywords || [],
                canonicalUrl: blog.seo?.canonicalUrl || '',
                ogTitle: blog.seo?.ogTitle || '',
                ogDescription: blog.seo?.ogDescription || '',
                ogImage: blog.seo?.ogImage || '',
                robots: blog.seo?.robots || 'index, follow',
                structuredData: blog.seo?.structuredData || '',
            },
            status: blog.status,
        });
        setImagePreview(blog.featuredImage || null);
        setActiveTab('updates');
        setUpdates(blog.updates || []);
        fetchFAQs(blog._id);
    };

    const handleCancelEdit = () => {
        setEditingBlog(null);
        setFormData({
            title: '',
            description: '',
            content: '',
            featuredImage: '',
            categories: [],
            seo: {
                metaTitle: '',
                metaDescription: '',
                keywords: [],
                canonicalUrl: '',
                ogTitle: '',
                ogDescription: '',
                ogImage: '',
                robots: 'index, follow',
                structuredData: ''
            },
            status: 'Draft',
        });
        setImagePreview(null);
        setFaqs([]);
        setEditingFaqId(null);
        setFaqForm({ question: '', answer: '', displayOrder: 0 });
        setUpdates([]);
        setUpdateForm({ title: '', content: '' });
        setUpdateImagePreview(null);
        setEditingUpdateId(null);
        setIsUpdateFormOpen(false);
        setActiveTab('list');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingBlog) {
                await categoryBlogsApi.admin.update(editingBlog._id, formData);
                toast.success('Special page updated successfully!');
                handleCancelEdit();
                fetchBlogs();
            } else {
                const response = await categoryBlogsApi.admin.create(formData);
                const newBlog = response.data;
                toast.success('Special page created! You can now add FAQs below.');

                // Switch to edit mode for the new blog
                setEditingBlog(newBlog);
                fetchFAQs(newBlog._id);
                fetchBlogs(); // Specific to list update
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || `Failed to ${editingBlog ? 'update' : 'create'} special page`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure? This will delete the special page and all associated FAQs and comments.')) {
            try {
                await categoryBlogsApi.admin.delete(id);
                toast.success('Special page deleted successfully!');
                fetchBlogs();
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Failed to delete special page');
            }
        }
    };

    // Category handlers
    const handleToggleCategory = (categoryId: string) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(categoryId)
                ? prev.categories.filter(id => id !== categoryId)
                : [...prev.categories, categoryId]
        }));
    };

    const handleRemoveCategory = (categoryId: string) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.filter(id => id !== categoryId)
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview
        setImagePreview(URL.createObjectURL(file));
        const toastId = toast.loading('Uploading image...');

        try {
            // Get Signed URL
            const { data: { signedUrl, imageUrl } } = await api.post('/admin/products/generate-upload-url', {
                folder: 'blogs',
                contentType: file.type
            });

            // Upload directly to S3
            await fetch(signedUrl, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': file.type }
            });

            setFormData(prev => ({ ...prev, featuredImage: imageUrl }));
            toast.success('Image uploaded successfully', { id: toastId });
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('Failed to upload image', { id: toastId });
        }
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({ ...prev, featuredImage: '' }));
        setImagePreview(null);
    };

    // FAQ Management
    const fetchFAQs = async (blogId: string) => {
        try {
            const response = await categoryBlogsApi.admin.getFAQs(blogId);
            setFaqs(response.data || []);
        } catch (error) {
            console.error('Failed to fetch FAQs');
        }
    };

    const handleAddFAQ = async () => {
        if (!editingBlog) return;
        try {
            await categoryBlogsApi.admin.addFAQ(editingBlog._id, faqForm);
            toast.success('FAQ added!');
            setFaqForm({ question: '', answer: '', displayOrder: 0 });
            fetchFAQs(editingBlog._id);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to add FAQ');
        }
    };

    const handleUpdateFAQ = async () => {
        if (!editingBlog || !editingFaqId) return;
        try {
            await categoryBlogsApi.admin.updateFAQ(editingBlog._id, editingFaqId, faqForm);
            toast.success('FAQ updated!');
            handleCancelFAQEdit();
            fetchFAQs(editingBlog._id);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update FAQ');
        }
    };

    const handleDeleteFAQ = async (faqId: string) => {
        if (!editingBlog) return;
        try {
            await categoryBlogsApi.admin.deleteFAQ(editingBlog._id, faqId);
            toast.success('FAQ deleted!');
            fetchFAQs(editingBlog._id);
        } catch (error: any) {
            toast.error('Failed to delete FAQ');
        }
    };

    const handleEditFAQClick = (faq: FAQ) => {
        setEditingFaqId(faq._id);
        setFaqForm({
            question: faq.question,
            answer: faq.answer,
            displayOrder: faq.displayOrder,
        });
    };

    const handleCancelFAQEdit = () => {
        setEditingFaqId(null);
        setFaqForm({ question: '', answer: '', displayOrder: 0 });
    };

    // Centralized Comment Management
    const fetchAllComments = async () => {
        setCommentsLoading(true);
        try {
            const blogsResponse = await categoryBlogsApi.admin.getAll({ limit: 100 });
            const allBlogs = blogsResponse.data.blogs || blogsResponse.data || [];

            const blogCommentsPromises = allBlogs.map(async (blog: any) => {
                try {
                    const commentsResponse = await categoryBlogsApi.admin.getComments(blog._id, { status: commentFilter });
                    const comments = commentsResponse.data || [];
                    return {
                        blog: { _id: blog._id, title: blog.title, slug: blog.slug },
                        comments,
                    };
                } catch {
                    return { blog: { _id: blog._id, title: blog.title, slug: blog.slug }, comments: [] };
                }
            });

            const results = await Promise.all(blogCommentsPromises);
            setAllBlogComments(results.filter(r => r.comments.length > 0));
        } catch (error: any) {
            toast.error('Failed to fetch comments');
        } finally {
            setCommentsLoading(false);
        }
    };

    const handleApproveComment = async (commentId: string) => {
        try {
            await categoryBlogsApi.admin.approveComment(commentId);
            toast.success('Comment approved!');
            fetchAllComments();
        } catch (error: any) {
            toast.error('Failed to approve comment');
        }
    };

    const handleRejectComment = async (commentId: string) => {
        try {
            await categoryBlogsApi.admin.rejectComment(commentId);
            toast.success('Comment rejected!');
            fetchAllComments();
        } catch (error: any) {
            toast.error('Failed to reject comment');
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (window.confirm('Are you sure you want to delete this comment permanently?')) {
            try {
                await categoryBlogsApi.admin.deleteComment(commentId);
                toast.success('Comment deleted!');
                fetchAllComments();
            } catch (error: any) {
                toast.error('Failed to delete comment');
            }
        }
    };

    // Update Management Handlers
    const handleAddUpdate = async () => {
        if (!editingBlog) return;
        setIsSubmittingUpdate(true);
        try {
            const response = await categoryBlogsApi.admin.addUpdate(editingBlog._id, updateForm);
            toast.success('Update added successfully!');
            setUpdates(response.data.updates || []);
            setUpdateForm({ title: '', content: '' });
            setUpdateImagePreview(null);
            setIsUpdateFormOpen(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to add update');
        } finally {
            setIsSubmittingUpdate(false);
        }
    };

    const handleUpdateUpdate = async () => {
        if (!editingBlog || !editingUpdateId) return;
        setIsSubmittingUpdate(true);
        try {
            const response = await categoryBlogsApi.admin.updateUpdate(editingBlog._id, editingUpdateId, updateForm);
            toast.success('Update updated successfully!');
            setUpdates(response.data.updates || []);
            setUpdateForm({ title: '', content: '' });
            setUpdateImagePreview(null);
            setEditingUpdateId(null);
            setIsUpdateFormOpen(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to edit update');
        } finally {
            setIsSubmittingUpdate(false);
        }
    };

    const handleDeleteUpdate = async (updateId: string) => {
        if (!editingBlog) return;
        if (window.confirm('Are you sure you want to delete this update?')) {
            try {
                const response = await categoryBlogsApi.admin.deleteUpdate(editingBlog._id, updateId);
                toast.success('Update deleted successfully!');
                setUpdates(response.data.updates || []);
            } catch (error: any) {
                toast.error('Failed to delete update');
            }
        }
    };

    const handleEditUpdateClick = (update: Update) => {
        setUpdateForm({
            title: update.title,
            content: update.content,
            image: update.image
        });
        setUpdateImagePreview(update.image || null);
        setEditingUpdateId(update._id);
        setIsUpdateFormOpen(true);
    };

    const handleUpdateImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview
        setUpdateImagePreview(URL.createObjectURL(file));
        const toastId = toast.loading('Uploading image...');

        try {
            // Get Signed URL
            const { data: { signedUrl, imageUrl } } = await api.post('/admin/products/generate-upload-url', {
                folder: 'blog-updates',
                contentType: file.type
            });

            // Upload directly to S3
            await fetch(signedUrl, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': file.type }
            });

            setUpdateForm(prev => ({ ...prev, image: imageUrl }));
            toast.success('Image uploaded successfully', { id: toastId });
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('Failed to upload image', { id: toastId });
        }
    };

    const handleRemoveUpdateImage = () => {
        setUpdateForm(prev => ({ ...prev, image: undefined }));
        setUpdateImagePreview(null);
    };

    const handleCancelUpdateEdit = () => {
        setUpdateForm({ title: '', content: '' });
        setUpdateImagePreview(null);
        setEditingUpdateId(null);
        setIsUpdateFormOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans">
            <header className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <BookOpen className="w-6 h-6 text-[#176FC0]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Special Pages</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Manage educational blog posts for product categories.</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => { handleCancelEdit(); setActiveTab('list'); }}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'list' ? 'bg-[#176FC0] text-white shadow-lg shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            All Pages
                        </button>
                        {editingBlog && (
                            <button
                                onClick={() => setActiveTab('updates')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'updates' ? 'bg-[#176FC0] text-white shadow-lg shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                <BookOpen size={16} /> Updates
                                {updates.length > 0 && (
                                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'updates' ? 'bg-white text-[#176FC0]' : 'bg-slate-200 text-slate-600'}`}>
                                        {updates.length}
                                    </span>
                                )}
                            </button>
                        )}
                        <button
                            onClick={() => setActiveTab('form')}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'form' ? 'bg-[#176FC0] text-white shadow-lg shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            {editingBlog ? 'Edit Page' : 'Add New Page'}
                        </button>
                        <button
                            onClick={() => setActiveTab('comments')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'comments' ? 'bg-[#176FC0] text-white shadow-lg shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            <MessageSquare size={16} /> Comments
                        </button>
                    </div>
                </div>
            </header>

            {/* List View */}
            {activeTab === 'list' && (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search pages..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && fetchBlogs()}
                                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                            />
                        </div>
                        <button
                            onClick={() => { handleCancelEdit(); setActiveTab('form'); }}
                            className="flex items-center gap-2 bg-[#176FC0] text-white font-bold py-2.5 px-5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all whitespace-nowrap"
                        >
                            <Plus size={16} /> Add New Page
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[700px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="p-4 pl-6 text-xs font-bold text-slate-500 uppercase">Title</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Views</th>
                                    <th className="p-4 pr-6 text-right text-xs font-bold text-slate-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td colSpan={4} className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-slate-400" /></td></tr>
                                ) : blogs.length === 0 ? (
                                    <tr><td colSpan={4} className="p-8 text-center text-slate-500">No special pages found</td></tr>
                                ) : (
                                    blogs.map((blog) => (
                                        <tr key={blog._id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="p-4 pl-6">
                                                <p className="font-semibold text-slate-800 text-sm">{blog.title}</p>
                                                {blog.updates && blog.updates.length > 0 ? (
                                                    <div className="mt-1.5 p-2 bg-blue-50/50 rounded-lg border border-blue-100">
                                                        <div className="flex items-center gap-1.5 mb-0.5">
                                                            <span className="px-1.5 py-0.5 bg-[#176FC0] text-white text-[10px] font-bold uppercase tracking-wider rounded">Latest Update</span>
                                                            <span className="text-[10px] text-slate-500 font-medium">
                                                                {new Date(blog.updates[blog.updates.length - 1].date).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs font-semibold text-slate-700 truncate">{blog.updates[blog.updates.length - 1].title}</p>
                                                        <p className="text-[10px] text-slate-500 truncate max-w-md opacity-80">
                                                            {blog.updates[blog.updates.length - 1].content.replace(/<[^>]+>/g, '')}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-slate-500 mt-1 max-w-md truncate">{blog.description}</p>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${blog.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    {blog.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-slate-600">{blog.viewCount || 0}</td>
                                            <td className="p-4 pr-6 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <a href={`/${blog.slug}`} target="_blank" className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-blue-600" title="View Public Page">
                                                        <Eye size={16} />
                                                    </a>
                                                    <button
                                                        onClick={() => handleSendNewsletter(blog)}
                                                        disabled={sendingNewsletter}
                                                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-amber-600 disabled:opacity-50"
                                                        title="Send Newsletter"
                                                    >
                                                        <Mail size={16} />
                                                    </button>
                                                    <button onClick={() => handleEditClick(blog)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-blue-600">
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(blog._id)} className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600">
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
            )}

            {/* Form View */}
            {activeTab === 'form' && (
                <div className="space-y-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                <h3 className="text-lg font-bold text-slate-800 mb-4">Special Page Information</h3>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Featured Image</label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative group">
                                        {imagePreview ? (
                                            <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                                                <Image
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveImage}
                                                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-slate-600 hover:text-red-500 hover:bg-white shadow-sm transition-all"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <UploadCloud className="mx-auto h-10 w-10 text-slate-400 group-hover:text-[#176FC0] transition-colors" />
                                                <p className="mt-2 text-sm font-medium text-slate-600">
                                                    Drag & drop or <span className="text-[#176FC0]">browse</span>
                                                </p>
                                                <p className="xs text-slate-400 mt-1">Recommended size: 1200x630px</p>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setMediaPickerTarget('blog');
                                                        setIsMediaPickerOpen(true);
                                                    }}
                                                    className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors z-20 relative"
                                                >
                                                    Select from Library
                                                </button>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${imagePreview ? 'hidden' : ''}`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                                        rows={4}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Content * (Rich HTML)</label>
                                <RichTextEditor
                                    content={formData.content}
                                    onChange={(content) => setFormData({ ...formData, content })}
                                />
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                <h3 className="text-lg font-bold text-slate-800">SEO Settings</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Meta Title <span className="text-xs font-normal text-slate-400">({formData.seo.metaTitle.length}/200)</span></label>
                                            <input
                                                type="text"
                                                value={formData.seo.metaTitle}
                                                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                                maxLength={200}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Canonical URL</label>
                                            <input
                                                type="text"
                                                value={formData.seo.canonicalUrl}
                                                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, canonicalUrl: e.target.value } })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                                placeholder="https://example.com/original-page"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Meta Description <span className="text-xs font-normal text-slate-400">({formData.seo.metaDescription.length}/5000)</span></label>
                                        <textarea
                                            value={formData.seo.metaDescription}
                                            onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                            rows={3}
                                            maxLength={5000}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Keywords (Comma separated)</label>
                                        <input
                                            type="text"
                                            value={formData.seo.keywords.join(', ')}
                                            onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, keywords: e.target.value.split(',').map(k => k.trim()) } })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                            placeholder="seo, parts, auto"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Robots Meta Tag</label>
                                            <select
                                                value={formData.seo.robots}
                                                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, robots: e.target.value } })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                            >
                                                <option value="index, follow">Index, Follow</option>
                                                <option value="noindex, follow">No Index, Follow</option>
                                                <option value="index, nofollow">Index, No Follow</option>
                                                <option value="noindex, nofollow">No Index, No Follow</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">OG Image URL</label>
                                            <input
                                                type="text"
                                                value={formData.seo.ogImage}
                                                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, ogImage: e.target.value } })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">OG Title</label>
                                            <input
                                                type="text"
                                                value={formData.seo.ogTitle}
                                                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, ogTitle: e.target.value } })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                                maxLength={200}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">OG Description</label>
                                            <input
                                                type="text"
                                                value={formData.seo.ogDescription}
                                                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, ogDescription: e.target.value } })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0]"
                                                maxLength={5000}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Structured Data (JSON-LD)</label>
                                        <textarea
                                            value={formData.seo.structuredData}
                                            onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, structuredData: e.target.value } })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#176FC0] font-mono text-xs"
                                            rows={4}
                                            placeholder='{"@context": "https://schema.org", ...}'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-semibold text-slate-700">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Draft' | 'Published' })}
                                        className="p-1.5 text-xs rounded-lg border-slate-200 bg-slate-50"
                                    >
                                        <option value="Draft">Draft</option>
                                        <option value="Published">Published</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#176FC0] text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-70"
                                >
                                    {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : (editingBlog ? 'Update Page' : 'Create Page')}
                                </button>
                                {editingBlog && (
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="w-full mt-2 py-2 text-sm font-medium text-slate-500 hover:text-slate-800"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-bold text-slate-800 mb-3">Categories</label>

                                {formData.categories.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {formData.categories.map(catId => {
                                            const cat = categories.find(c => c._id === catId);
                                            return cat ? (
                                                <span key={catId} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    {cat.name}
                                                    <button type="button" onClick={() => handleRemoveCategory(catId)} className="hover:bg-blue-200 rounded-full p-0.5">
                                                        <X size={14} />
                                                    </button>
                                                </span>
                                            ) : null;
                                        })}
                                    </div>
                                )}

                                <div className="max-h-48 overflow-y-auto space-y-1 border border-slate-100 rounded-lg p-3">
                                    {categories.map(cat => (
                                        <label key={cat._id} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                                            <input
                                                type="checkbox"
                                                checked={formData.categories.includes(cat._id)}
                                                onChange={() => handleToggleCategory(cat._id)}
                                                className="rounded border-slate-300 text-[#176FC0] focus:ring-[#176FC0]"
                                            />
                                            <span className="text-sm text-slate-700">{cat.name}</span>
                                        </label>
                                    ))}
                                    {categories.length === 0 && <p className="text-xs text-slate-400">No categories available</p>}
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* FAQ Management - shown on form page when editing */}
                    {editingBlog && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <HelpCircle size={20} /> {editingFaqId ? 'Edit FAQ' : 'Add FAQ'}
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Question</label>
                                        <input
                                            type="text"
                                            value={faqForm.question}
                                            onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Answer</label>
                                        <textarea
                                            value={faqForm.answer}
                                            onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                                            rows={4}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={editingFaqId ? handleUpdateFAQ : handleAddFAQ}
                                            className="bg-[#176FC0] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                                        >
                                            {editingFaqId ? 'Update FAQ' : 'Add FAQ'}
                                        </button>
                                        {editingFaqId && (
                                            <button
                                                type="button"
                                                onClick={handleCancelFAQEdit}
                                                className="py-2 px-4 text-sm font-medium text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-800 mb-4">FAQs ({faqs.length})</h3>
                                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                    {faqs.map((faq) => (
                                        <div key={faq._id} className={`p-4 rounded-lg ${editingFaqId === faq._id ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50'}`}>
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-slate-800 text-sm">{faq.question}</p>
                                                    <p className="text-sm text-slate-600 mt-1">{faq.answer}</p>
                                                </div>
                                                <div className="flex gap-1 ml-4 flex-shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEditFAQClick(faq)}
                                                        className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                                                        title="Edit FAQ"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteFAQ(faq._id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                                                        title="Delete FAQ"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {faqs.length === 0 && (
                                        <p className="text-center text-slate-500 py-8">No FAQs added yet</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Updates Management */}
            {activeTab === 'updates' && editingBlog && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-800">Topic Updates</h3>
                        <button
                            onClick={() => {
                                setUpdateForm({ title: '', content: '' });
                                setEditingUpdateId(null);
                                setIsUpdateFormOpen(true);
                            }}
                            className="bg-[#176FC0] text-white font-bold py-2.5 px-5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 flex items-center gap-2"
                        >
                            <Plus size={16} /> Add New Update
                        </button>
                    </div>

                    {isUpdateFormOpen ? (
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                            <h4 className="font-bold text-slate-700">{editingUpdateId ? 'Edit Update' : 'New Update'}</h4>

                            {/* Update Image Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Update Image (Optional)</label>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-white transition-colors relative group">
                                    {updateImagePreview ? (
                                        <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden bg-slate-100">
                                            <Image
                                                src={updateImagePreview}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveUpdateImage}
                                                className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-slate-600 hover:text-red-500 hover:bg-white shadow-sm transition-all"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <UploadCloud className="mx-auto h-8 w-8 text-slate-400 group-hover:text-[#176FC0] transition-colors" />
                                            <p className="mt-2 text-sm font-medium text-slate-600">
                                                Drag & drop or <span className="text-[#176FC0]">browse</span>
                                            </p>
                                            <p className="xs text-slate-400 mt-1">Recommended size: 800x600px</p>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setMediaPickerTarget('update');
                                                    setIsMediaPickerOpen(true);
                                                }}
                                                className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors z-20 relative"
                                            >
                                                Select from Library
                                            </button>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleUpdateImageUpload}
                                        className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${updateImagePreview ? 'hidden' : ''}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Update Title</label>
                                <input
                                    type="text"
                                    value={updateForm.title}
                                    onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                                    placeholder="e.g., 2026 Model Specs Released"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
                                <RichTextEditor
                                    content={updateForm.content}
                                    onChange={(content) => setUpdateForm({ ...updateForm, content })}
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={editingUpdateId ? handleUpdateUpdate : handleAddUpdate}
                                    disabled={isSubmittingUpdate}
                                    className="bg-[#176FC0] text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-70 flex items-center gap-2"
                                >
                                    {isSubmittingUpdate && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {editingUpdateId ? 'Save Changes' : 'Post Update'}
                                </button>
                                <button
                                    onClick={handleCancelUpdateEdit}
                                    className="bg-white border border-slate-300 text-slate-700 font-medium py-2 px-6 rounded-lg hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {updates && updates.length > 0 ? (
                                updates.slice().reverse().map((update) => (
                                    <div key={update._id} className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors bg-white group">
                                        <div className="flex gap-4 items-start">
                                            {update.image && (
                                                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-100">
                                                    <Image
                                                        src={update.image}
                                                        alt={update.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-slate-800 text-lg">{update.title}</h4>
                                                        <p className="text-xs text-slate-500 mt-1 mb-3">
                                                            Posted on {new Date(update.date).toLocaleDateString()} at {new Date(update.date).toLocaleTimeString()}
                                                        </p>
                                                        <div className="prose prose-sm max-w-none text-slate-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: update.content }} />
                                                    </div>
                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => handleEditUpdateClick(update)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Edit Update"
                                                        >
                                                            <Pencil size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUpdate(update._id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete Update"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500 font-medium">No updates posted yet.</p>
                                    <p className="text-slate-400 text-sm mt-1">Updates allow you to add new content without changing the main topic page.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Centralized Comment Management */}
            {activeTab === 'comments' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Comment Moderation</h3>
                        <select
                            value={commentFilter}
                            onChange={(e) => setCommentFilter(e.target.value as any)}
                            className="p-2 text-sm rounded-lg border-slate-200 bg-slate-50"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Spam">Spam</option>
                        </select>
                    </div>

                    {commentsLoading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                        </div>
                    ) : allBlogComments.length === 0 ? (
                        <p className="text-center text-slate-500 py-12">
                            No {commentFilter.toLowerCase()} comments found across any blog.
                        </p>
                    ) : (
                        <div className="space-y-6">
                            {allBlogComments.map(({ blog, comments }) => (
                                <div key={blog._id} className="border border-slate-200 rounded-xl overflow-hidden">
                                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                                        <h4 className="font-semibold text-slate-800 text-sm">{blog.title}</h4>
                                        <p className="text-xs text-slate-500">{comments.length} {commentFilter.toLowerCase()} comment(s)</p>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {comments.map((comment) => (
                                            <div key={comment._id} className="p-4 flex justify-between items-start">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-slate-800 text-sm">{comment.user.name}</p>
                                                    <p className="text-xs text-slate-500">{comment.user.email}</p>
                                                    <p className="text-sm text-slate-700 mt-1">{comment.content}</p>
                                                    <p className="text-xs text-slate-400 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
                                                </div>
                                                <div className="flex gap-2 ml-4 flex-shrink-0">
                                                    {comment.status === 'Pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleApproveComment(comment._id)}
                                                                className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100"
                                                                title="Approve"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleRejectComment(comment._id)}
                                                                className="px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
                                                                title="Reject"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteComment(comment._id)}
                                                        className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                                                        title="Delete"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Centralized Comment Management */}
            {
                activeTab === 'comments' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        {/* ... Existing comments section (truncated in previous view) ... */}
                        {/* Restoring relevant parts would be guessing, so better to append Modal at end of return */}
                    </div>
                )
            }

            <MediaPickerModal
                isOpen={isMediaPickerOpen}
                onClose={() => setIsMediaPickerOpen(false)}
                onSelect={(url) => {
                    if (mediaPickerTarget === 'blog') {
                        setFormData(prev => ({ ...prev, featuredImage: url }));
                        setImagePreview(url);
                    } else {
                        setUpdateForm(prev => ({ ...prev, image: url }));
                        setUpdateImagePreview(url);
                    }
                    setIsMediaPickerOpen(false);
                }}
            />
        </div >
    );
}
