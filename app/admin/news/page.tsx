"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchBrands } from '@/lib/redux/productSlice';
import { fetchNews, addNews, updateNews, deleteNews } from '@/lib/redux/newsSlice';
import { Newspaper, Loader2, CheckCircle2, Tag, Pencil, Trash2, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';

const TabButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
    <button onClick={onClick} className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${active ? 'bg-white text-[#176FC0] shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>
        {children}
    </button>
);

export default function NewsAdminPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [editingNews, setEditingNews] = useState<any>(null);
    const [newsData, setNewsData] = useState({ title: '', excerpt: '', brand: '' });
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const dispatch = useDispatch<AppDispatch>();
    const { articles, status } = useSelector((state: RootState) => state.news);
    const { brands } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchNews());
        dispatch(fetchBrands());
    }, [dispatch]);
    
    const handleEditClick = (article: any) => {
        setEditingNews(article);
        setNewsData({ 
            title: article.title, 
            excerpt: article.excerpt, 
            brand: article.brand?._id || article.brand || ''
        });
        setContent(article.content);
        setImagePreview(article.image);
        setActiveTab('add');
    };

    const handleCancelEdit = () => {
        setEditingNews(null);
        setNewsData({ title: '', excerpt: '', brand: '' });
        setContent('');
        setImageFile(null);
        setImagePreview(null);
        setActiveTab('all');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile && !editingNews) return toast.error("A featured image is required for new articles.");
        
        const finalData = { ...newsData, content, imageFile };
        const action = editingNews ? updateNews({ id: editingNews._id, data: finalData }) : addNews(finalData);
        
        toast.promise(dispatch(action).unwrap(), {
            loading: editingNews ? 'Updating article...' : 'Creating article...',
            success: `Article ${editingNews ? 'updated' : 'created'} successfully!`,
            error: (err) => err || `Failed to ${editingNews ? 'update' : 'create'} article.`
        }).then(handleCancelEdit);
    };

     const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            toast.promise(dispatch(deleteNews(id)).unwrap(), {
                loading: 'Deleting article...',
                success: 'Article deleted!',
                error: (err) => err || 'Failed to delete article.'
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <Newspaper className="w-6 h-6 text-[#176FC0]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">News & Updates</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Manage articles related to brands.</p>
                    </div>
                </div>
            </header>

            <div className="mb-8">
                <div className="bg-slate-100/70 p-1.5 rounded-2xl inline-flex flex-wrap gap-1 border border-slate-200/80">
                    <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All Articles</TabButton>
                    <TabButton active={activeTab === 'add'} onClick={() => { handleCancelEdit(); setActiveTab('add'); }}>{editingNews ? 'Edit Article' : 'Add New'}</TabButton>
                </div>
            </div>

            {activeTab === 'all' && (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in fade-in">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="p-4 pl-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Article</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Brand</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Published Date</th>
                                    <th className="p-4 pr-6 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {articles.map((article: any) => (
                                    <tr key={article._id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shrink-0">
                                                    <Image src={article.image || '/placeholder.png'} alt={article.title} width={64} height={48} className="w-full h-full object-cover"/>
                                                </div>
                                                <p className="font-semibold text-slate-800 text-sm max-w-sm truncate">{article.title}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600 font-medium">
                                            {article.brand?.name || 'General'}
                                        </td>
                                        <td className="p-4 text-sm text-slate-600">{new Date(article.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4 pr-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEditClick(article)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-blue-600 transition-colors"><Pencil size={16} /></button>
                                                <button onClick={() => handleDelete(article._id)} className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'add' && (
                <div className="animate-in fade-in">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Article Title</label>
                                <input type="text" value={newsData.title} onChange={(e) => setNewsData({...newsData, title: e.target.value})} className="w-full text-xl font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#176FC0] transition-all" required placeholder="Enter article title..."/>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Excerpt</label>
                                <textarea rows={3} value={newsData.excerpt} onChange={(e) => setNewsData({...newsData, excerpt: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#176FC0] transition-all" required placeholder="A short summary of the article..."></textarea>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Content</label>
                                <div className="prose max-w-none border border-slate-200 rounded-lg overflow-hidden"><RichTextEditor content={content} onChange={setContent} /></div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><CheckCircle2 size={18}/> Actions</h4>
                                <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center items-center bg-[#176FC0] text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70">{status === 'loading' ? <Loader2 className="animate-spin"/> : (editingNews ? 'Update Article' : 'Publish Article')}</button>
                                {editingNews && <button type="button" onClick={handleCancelEdit} className="w-full text-center mt-2 py-2 text-sm font-medium text-slate-500 hover:text-slate-800">Cancel</button>}
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-bold text-slate-800 mb-3">Featured Image</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                                    <input id="imageFile" type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*"/>
                                    {imagePreview ? <Image src={imagePreview} alt="preview" width={300} height={150} className="w-full h-32 object-cover rounded-lg"/> : <div className="py-4"><UploadCloud className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-2 text-xs font-semibold text-slate-400">Upload an image</p></div>}
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                <div><label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2"><Tag size={16}/> Brand</label><select value={newsData.brand} onChange={(e) => setNewsData({...newsData, brand: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]" required><option value="">Select Brand</option>{brands.map((b:any) => <option key={b._id} value={b._id}>{b.name}</option>)}</select></div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}