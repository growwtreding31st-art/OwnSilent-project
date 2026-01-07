"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { 
    fetchBlogPosts, fetchBlogCategories, addBlogPost, updateBlogPost, deleteBlogPost, 
    addBlogCategory, updateBlogCategory, deleteBlogCategory 
} from '@/lib/redux/blogSlice';
import { Newspaper, Plus, Search, Pencil, Trash2, UploadCloud, Loader2, X, Tag, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';

const getStatusStyles = (status: string) => status === 'Published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-50 text-slate-700 border border-slate-200';

const TabButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
    <button onClick={onClick} className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${active ? 'bg-white text-[#176FC0] shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>
        {children}
    </button>
);

const CategoryModal = ({ isOpen, onClose, onSave, category, status }: { isOpen: boolean, onClose: () => void, onSave: (id: string | null, name: string) => void, category: any, status: string }) => {
    const [name, setName] = useState('');
    useEffect(() => {
        setName(category ? category.name : '');
    }, [category]);
    
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800">{category ? 'Edit Category' : 'Add New Category'}</h2>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                </header>
                <div className="p-6 space-y-5">
                     <div>
                        <label className='block text-sm font-semibold text-slate-700 mb-1.5'>Category Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Engine Maintenance" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all"/>
                    </div>
                    <button onClick={() => onSave(category ? category._id : null, name)} disabled={status === 'loading'} className="w-full flex justify-center items-center bg-[#176FC0] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
                        {status === 'loading' ? <Loader2 className="animate-spin w-5 h-5"/> : 'Save Category'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function BlogPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [editingPost, setEditingPost] = useState<any>(null);
    const [postData, setPostData] = useState({ title: '', category: '', tags: '', status: 'Draft' });
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    
    const dispatch = useDispatch<AppDispatch>();
    const { posts, categories, status } = useSelector((state: RootState) => state.blog);

    useEffect(() => {
        if(activeTab === 'all' || activeTab === 'add') dispatch(fetchBlogPosts());
        dispatch(fetchBlogCategories());
    }, [dispatch, activeTab]);

    const handleEditClick = (post: any) => { 
        setEditingPost(post); 
        setPostData({ title: post.title, category: post.category?._id || '', tags: post.tags?.join(', ') || '', status: post.status }); 
        setContent(post.content); 
        setImagePreview(post.featuredImage); 
        setActiveTab('add'); 
    };

    const handleCancelEdit = () => { 
        setEditingPost(null); 
        setPostData({ title: '', category: '', tags: '', status: 'Draft' }); 
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
        if (!imageFile && !editingPost) {
            return toast.error("A featured image is required for new posts.");
        }

        const finalData = { ...postData, content, tags: postData.tags.split(',').map(t => t.trim()).filter(Boolean) };
        
        const action = editingPost 
            ? dispatch(updateBlogPost({ id: editingPost._id, postData: { ...finalData, featuredImageFile: imageFile } })).unwrap()
            : dispatch(addBlogPost({ ...finalData, featuredImageFile: imageFile! })).unwrap();

        toast.promise(action, {
            loading: editingPost ? 'Updating post...' : 'Creating post...',
            success: `Post ${editingPost ? 'updated' : 'created'} successfully!`,
            error: (err) => err || `Failed to ${editingPost ? 'update' : 'create'} post.`
        }).then(handleCancelEdit);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            toast.promise(
                dispatch(deleteBlogPost(id)).unwrap(),
                {
                    loading: 'Deleting post...',
                    success: 'Post deleted successfully!',
                    error: (err) => err || 'Failed to delete post.'
                }
            );
        }
    };

    const handleCategorySave = async (id: string | null, name: string) => {
        const action: any = id ? updateBlogCategory({ id, name }) : addBlogCategory(name);
        const result = await dispatch(action);
        if (result.meta.requestStatus === 'fulfilled') {
            toast.success(`Category ${id ? 'updated' : 'added'}!`);
            setIsCategoryModalOpen(false);
            setEditingCategory(null);
        } else {
            toast.error(result.payload as string || 'An error occurred.');
        }
    };
    
    const handleCategoryDelete = async (id: string) => {
         if (window.confirm('Are you sure? This may fail if posts are using this category.')) {
            const result = await dispatch(deleteBlogCategory(id));
            if (deleteBlogCategory.fulfilled.match(result)) toast.success('Category deleted!');
            else toast.error(result.payload as string || 'Failed to delete category.');
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans">
            <CategoryModal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} onSave={handleCategorySave} category={editingCategory} status={status} />
            
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <Newspaper className="w-6 h-6 text-[#176FC0]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Blog</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Create and manage your articles.</p>
                    </div>
                </div>
            </header>

            <div className="mb-8">
                <div className="bg-slate-100/70 p-1.5 rounded-2xl inline-flex flex-wrap gap-1 border border-slate-200/80">
                    <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All Posts</TabButton>
                    <TabButton active={activeTab === 'add'} onClick={() => { handleCancelEdit(); setActiveTab('add'); }}>{editingPost ? 'Edit Post' : 'Add New Post'}</TabButton>
                    <TabButton active={activeTab === 'manage'} onClick={() => setActiveTab('manage')}>Manage Categories</TabButton>
                </div>
            </div>

            {activeTab === 'all' && (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in fade-in">
                    <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
                        <div className="relative w-full sm:w-96 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#176FC0] transition-colors" />
                            <input type="text" placeholder="Search posts by title..." className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all" />
                        </div>
                        <button onClick={() => { handleCancelEdit(); setActiveTab('add'); }} className="flex items-center gap-2 bg-[#176FC0] text-white font-bold py-2.5 px-5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all whitespace-nowrap">
                            <Plus size={16} /> Add New Post
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead><tr className="bg-slate-50 border-b border-slate-100"><th className="p-4 pl-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th><th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th><th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th><th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th><th className="p-4 pr-6 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th></tr></thead>
                            <tbody className="divide-y divide-slate-100">
                                {posts.map((post: any) => (
                                    <tr key={post._id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="p-4 pl-6"><p className="font-semibold text-slate-800 text-sm max-w-xs truncate">{post.title}</p></td>
                                        <td className="p-4"><span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full border border-slate-200">{post.category?.name || 'Uncategorized'}</span></td>
                                        <td className="p-4 text-sm text-slate-600">{new Date(post.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4"><span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyles(post.status)}`}>{post.status}</span></td>
                                        <td className="p-4 pr-6 text-right"><div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => handleEditClick(post)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-blue-600 transition-colors"><Pencil size={16} /></button><button onClick={() => handleDelete(post._id)} className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={16} /></button></div></td>
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
                                <label htmlFor="postTitle" className="block text-sm font-semibold text-slate-700 mb-1.5">Post Title</label>
                                <input type="text" id="postTitle" value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} className="w-full text-2xl font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#176FC0] transition-all" required placeholder="Enter your post title..."/>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Post Content</label>
                                <div className="prose max-w-none border border-slate-200 rounded-lg overflow-hidden"><RichTextEditor content={content} onChange={setContent} /></div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><CheckCircle2 size={18}/> Actions</h4>
                                <div className="flex items-center justify-between mb-4"><label htmlFor="status" className="text-sm font-semibold text-slate-600">Status</label><select value={postData.status} onChange={(e) => setPostData({...postData, status: e.target.value})} className="p-1.5 text-xs rounded-lg border-slate-200 bg-slate-50 focus:ring-0 focus:border-[#176FC0]"><option value="Draft">Draft</option><option value="Published">Published</option></select></div>
                                <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center items-center bg-[#176FC0] text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70">{status === 'loading' ? <Loader2 className="animate-spin"/> : (editingPost ? 'Update Post' : 'Publish Post')}</button>
                                {editingPost && <button type="button" onClick={handleCancelEdit} className="w-full text-center mt-2 py-2 text-sm font-medium text-slate-500 hover:text-slate-800">Cancel</button>}
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-bold text-slate-800 mb-3">Featured Image</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                                    <input id="featuredImageFile" type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*"/>
                                    {imagePreview ? <Image src={imagePreview} alt="preview" width={300} height={150} className="w-full h-32 object-cover rounded-lg"/> : <div className="py-4"><UploadCloud className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-2 text-xs font-semibold text-slate-400">Upload an image</p></div>}
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                <div><label htmlFor="category" className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2"><Layers size={16}/> Category</label><select id="category" value={postData.category} onChange={(e) => setPostData({...postData, category: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]" required><option value="">Select Category</option>{categories.map((cat:any) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}</select></div>
                                <div><label htmlFor="tags" className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2"><Tag size={16}/> Tags</label><input type="text" id="tags" value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]" placeholder="e.g., Brakes, DIY" /></div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            
            {activeTab === 'manage' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto animate-in fade-in">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Manage Categories</h3>
                        <button onClick={() => { setEditingCategory(null); setIsCategoryModalOpen(true); }} className="flex items-center gap-2 text-sm font-bold bg-[#176FC0] text-white py-2 px-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"><Plus size={16}/> Add Category</button>
                    </div>
                    <ul className="space-y-2">
                        {categories.map((cat:any) => (
                            <li key={cat._id} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100">
                                <p className="font-semibold text-slate-700 text-sm">{cat.name}</p>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => { setEditingCategory(cat); setIsCategoryModalOpen(true); }} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Pencil size={14} /></button>
                                    <button onClick={() => handleCategoryDelete(cat._id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}