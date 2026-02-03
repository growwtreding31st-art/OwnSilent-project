"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchCollections, addCollection, updateCollection, deleteCollection } from '@/lib/redux/collectionSlice';
import { fetchParts } from '@/lib/redux/productSlice';
import { Layers, Plus, Pencil, Trash2, UploadCloud, Loader2, Search, X, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const TabButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
    <button 
        onClick={onClick} 
        className={`px-5 py-2.5 text-sm font-medium transition-all duration-200 rounded-full ${active ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'}`}
    >
        {children}
    </button>
);

export default function CollectionsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [editingCollection, setEditingCollection] = useState<any>(null);
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Draft');
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    
    const [productSearch, setProductSearch] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const { collections, status: collectionStatus } = useSelector((state: RootState) => state.collections);
    const { parts: allProducts } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchCollections());
        dispatch(fetchParts({ limit: 1000 })); 
    }, [dispatch]);

    const handleEditClick = (collection: any) => {
        setEditingCollection(collection);
        setName(collection.name);
        setDescription(collection.description);
        setStatus(collection.status);
        setImagePreview(collection.coverImage);
        setSelectedProducts(collection.products || []);
        setCoverImageFile(null);
        setActiveTab('add');
    };

    const resetForm = () => {
        setEditingCollection(null);
        setName('');
        setDescription('');
        setStatus('Draft');
        setCoverImageFile(null);
        setImagePreview(null);
        setSelectedProducts([]);
    };

    const handleCancelEdit = () => {
        resetForm();
        setActiveTab('all');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCoverImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!coverImageFile && !editingCollection) {
            return toast.error("A cover image is required for a new collection.");
        }

        const collectionData = { 
            name, 
            description, 
            status, 
            products: selectedProducts, 
            coverImageFile 
        };

        const action = editingCollection
            ? dispatch(updateCollection({ id: editingCollection._id, data: collectionData })).unwrap()
            : dispatch(addCollection(collectionData)).unwrap();

        toast.promise(action, {
            loading: editingCollection ? 'Updating collection...' : 'Creating collection...',
            success: `Collection ${editingCollection ? 'updated' : 'created'}!`,
            error: (err) => err || `Failed to ${editingCollection ? 'update' : 'create'}.`
        }).then(() => {
            handleCancelEdit();
        });
    };
    
    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this collection?')) {
            toast.promise(dispatch(deleteCollection(id)).unwrap(), {
                loading: 'Deleting...', success: 'Collection deleted!', error: 'Failed to delete.'
            });
        }
    };

    const filteredProducts = useMemo(() => {
        return allProducts.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()));
    }, [allProducts, productSearch]);

    const toggleProductSelection = (productId: string) => {
        setSelectedProducts(prev => 
            prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
        );
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-10">
            <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white shadow-sm rounded-xl border border-slate-100">
                        <Layers className="w-8 h-8 text-slate-900" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Collections</h1>
                        <p className="text-sm sm:text-base text-slate-500">Curate and manage your product groups.</p>
                    </div>
                </div>
            </header>

            <nav className="flex flex-wrap items-center gap-3 mb-8">
                <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
                    All Collections
                </TabButton>
                <TabButton active={activeTab === 'add'} onClick={() => { resetForm(); setActiveTab('add'); }}>
                    <span className="flex items-center gap-2">
                        {editingCollection ? <Pencil size={14}/> : <Plus size={14}/>}
                        {editingCollection ? 'Edit Collection' : 'Create New'}
                    </span>
                </TabButton>
            </nav>

            {activeTab === 'all' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="p-4 sm:p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Collection</th>
                                    <th className="p-4 sm:p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Products</th>
                                    <th className="p-4 sm:p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="p-4 sm:p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {collections.length === 0 && collectionStatus !== 'loading' && (
                                    <tr>
                                        <td colSpan={4} className="p-10 text-center text-slate-500">
                                            No collections found. Create one to get started.
                                        </td>
                                    </tr>
                                )}
                                {collections.map((col: any) => (
                                    <tr key={col._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 sm:p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-16 h-12 sm:w-20 sm:h-14 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                                    {col.coverImage ? (
                                                        <Image src={col.coverImage} alt={col.name} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400"><Layers size={20}/></div>
                                                    )}
                                                </div>
                                                <div onClick={() => router.push(`/collections/${col.slug}`)}>
                                                    <p className="font-bold text-slate-800 text-sm sm:text-base">{col.name}</p>
                                                    <p className="text-xs text-slate-400 font-mono mt-0.5 max-w-[150px] sm:max-w-xs truncate" >{col.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 sm:p-5 text-sm text-slate-600 font-medium">
                                            {col.products?.length || 0} items
                                        </td>
                                        <td className="p-4 sm:p-5">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                                                col.status === 'Active' 
                                                    ? 'bg-green-50 text-green-700 border-green-200' 
                                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                                {col.status}
                                            </span>
                                        </td>
                                        <td className="p-4 sm:p-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleEditClick(col)} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                    <Pencil size={18}/>
                                                </button>
                                                <button onClick={() => handleDelete(col._id)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 size={18}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {collectionStatus === 'loading' && (
                        <div className="p-8 flex justify-center text-slate-400">
                            <Loader2 className="animate-spin" />
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'add' && (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Collection Details</h3>
                            
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all" 
                                        placeholder="e.g. Summer Essentials"
                                        required 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                    <textarea 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)} 
                                        rows={4} 
                                        className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-y"
                                        placeholder="Describe what makes this collection special..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                                <h3 className="text-lg font-bold text-slate-800">Manage Products</h3>
                                <div className="text-sm text-slate-500 bg-slate-50 px-3 py-1 rounded-md border border-slate-200">
                                    {selectedProducts.length} Selected
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-6 h-[600px] lg:h-[500px]">
                                <div className="flex-1 flex flex-col border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                                    <div className="p-3 bg-white border-b border-slate-200">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <input 
                                                type="text" 
                                                placeholder="Search available products..." 
                                                value={productSearch} 
                                                onChange={e => setProductSearch(e.target.value)} 
                                                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                                        <p className="text-xs font-semibold text-slate-400 uppercase p-2">Available Products</p>
                                        {filteredProducts.filter(p => !selectedProducts.includes(p._id)).map(p => (
                                            <div 
                                                key={p._id} 
                                                onClick={() => toggleProductSelection(p._id)} 
                                                className="group flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg cursor-pointer hover:border-indigo-500 hover:shadow-sm transition-all"
                                            >
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                                                        <Layers size={14}/>
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-700 truncate">{p.name}</span>
                                                </div>
                                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                    <ArrowRight size={12} />
                                                </div>
                                            </div>
                                        ))}
                                        {filteredProducts.filter(p => !selectedProducts.includes(p._id)).length === 0 && (
                                            <div className="p-8 text-center text-slate-400 text-sm">No matching products found</div>
                                        )}
                                    </div>
                                </div>

                                <div className="hidden lg:flex items-center justify-center text-slate-300">
                                    <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm">
                                        <ArrowRight size={20} className="text-slate-400" />
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col border border-indigo-100 rounded-xl overflow-hidden bg-indigo-50/30">
                                    <div className="p-3 bg-indigo-50/50 border-b border-indigo-100 text-center">
                                        <span className="text-sm font-bold text-indigo-900">Selected Products</span>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                                        {allProducts.filter(p => selectedProducts.includes(p._id)).map(p => (
                                            <div 
                                                key={p._id} 
                                                onClick={() => toggleProductSelection(p._id)} 
                                                className="group flex items-center justify-between p-3 bg-white border border-indigo-100 rounded-lg cursor-pointer hover:border-red-300 hover:bg-red-50 transition-all"
                                            >
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                                        <Check size={12}/>
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-800 truncate">{p.name}</span>
                                                </div>
                                                <X size={14} className="text-slate-400 group-hover:text-red-500" />
                                            </div>
                                        ))}
                                        {selectedProducts.length === 0 && (
                                            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                                <Layers size={32} className="mb-2 opacity-20"/>
                                                <p className="text-sm">No products selected yet.</p>
                                                <p className="text-xs opacity-70">Click items on the left to add them.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Publishing</h3>
                            
                            <label className="block text-xs font-semibold text-slate-500 mb-2">Status</label>
                            <div className="relative">
                                <select 
                                    value={status} 
                                    onChange={(e) => setStatus(e.target.value)} 
                                    className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg p-3 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Active">Active</option>
                                </select>
                                <div className="absolute right-3 top-3.5 pointer-events-none text-slate-500">
                                    <ArrowLeft className="-rotate-90" size={14} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Cover Image</h3>
                            
                            <div className={`relative border-2 border-dashed rounded-xl transition-all ${imagePreview ? 'border-indigo-300 bg-indigo-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'}`}>
                                <input 
                                    id="coverImageFile" 
                                    type="file" 
                                    onChange={handleImageChange} 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                    accept="image/*"
                                />
                                <div className="p-6 text-center">
                                    {imagePreview ? (
                                        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm">
                                            <Image src={imagePreview} alt="preview" fill className="object-cover"/>
                                        </div>
                                    ) : (
                                        <div className="py-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                                                <UploadCloud size={24} />
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">Click to upload</p>
                                            <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF</p>
                                        </div>
                                    )}
                                </div>
                                {imagePreview && (
                                    <div className="absolute top-2 right-2 z-20">
                                        <button 
                                            type="button" 
                                            onClick={() => { setImagePreview(null); setCoverImageFile(null); }} 
                                            className="p-1.5 bg-white rounded-full shadow-md text-slate-500 hover:text-red-500"
                                        >
                                            <Trash2 size={14}/>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <button 
                                type="submit" 
                                disabled={collectionStatus === 'loading'} 
                                className="w-full flex justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-slate-900/10 disabled:bg-slate-400 disabled:cursor-not-allowed"
                            >
                                {collectionStatus === 'loading' ? <Loader2 className="animate-spin" size={20}/> : (editingCollection ? 'Save Changes' : 'Create Collection')}
                            </button>
                            
                            {editingCollection && (
                                <button 
                                    type="button" 
                                    onClick={handleCancelEdit} 
                                    className="w-full py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}