"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import {
    fetchParts, fetchCategories,
    addCategory, updateCategory, deleteCategory,
    addBrand, updateBrand, deleteBrand,
    addModel, deleteModel,
    addPart, updatePart, deletePart, fetchAllModels, fetchBrands, fetchModelsByBrand, syncZohoData, exportManualProductsToZoho, stopSyncZoho
} from '@/lib/redux/productSlice';
import { Wrench, Plus, Search, UploadCloud, Pencil, Trash2, Loader2, X, PlusCircle, Database, Cloud, ChevronDown, ChevronLeft, ChevronRight, RefreshCw, Filter, Layers, Tag, Car, Package, Upload, XCircle } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';

const getStockClass = (quantity: number) => {
    if (quantity === 0) return 'bg-red-50 text-red-700 border border-red-200';
    if (quantity <= 10) return 'bg-amber-50 text-amber-700 border border-amber-200';
    return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
};

const TabButton = ({ active, onClick, children, icon: Icon }: { active: boolean; onClick: () => void; children: React.ReactNode, icon?: any }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${active
            ? 'bg-white text-[#176FC0] shadow-sm ring-1 ring-slate-200'
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
    >
        {Icon && <Icon className={`w-4 h-4 ${active ? 'text-[#176FC0]' : 'text-slate-400'}`} />}
        {children}
    </button>
);

const ManagementModal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800">{title}</h2>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </header>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Accordion = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-shadow hover:shadow-md">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-6 py-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{title}</h4>
                <div className={`p-1 rounded-full bg-white border border-slate-200 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                </div>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6 space-y-5 border-t border-slate-100">
                    {children}
                </div>
            </div>
        </div>
    );
};

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => { func(...args); }, delay);
    };
}

export default function ProductsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentItem, setCurrentItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({ name: '', logoFile: null, brand: '' });
    const [editingPart, setEditingPart] = useState<any>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    const { parts, categories, brands, models, modelsForFilter, status, totalCount, currentPage, totalPages } = useSelector((state: RootState) => state.products);

    const [partForm, setPartForm] = useState({ brand: '', model: '' });
    const [specifications, setSpecifications] = useState([{ key: '', value: '' }]);
    const [fullDescription, setFullDescription] = useState('');
    const [filters, setFilters] = useState({ page: 1, limit: 10, search: '', source: '' });

    const debouncedFetch = useCallback(debounce((newFilters: typeof filters) => {
        dispatch(fetchParts(newFilters));
    }, 500), [dispatch]);

    useEffect(() => {
        debouncedFetch(filters);
    }, [filters, debouncedFetch]);

    useEffect(() => {
        if (activeTab === 'add') { dispatch(fetchCategories()); dispatch(fetchBrands()); }
        if (activeTab === 'manage') { dispatch(fetchCategories()); dispatch(fetchBrands()); dispatch(fetchAllModels()); }
    }, [dispatch, activeTab]);

    useEffect(() => {
        if (editingPart) {
            const brandId = editingPart.brand?._id;
            if (brandId) dispatch(fetchModelsByBrand(brandId));
            setPartForm({ brand: brandId || '', model: editingPart.model?._id || '' });
            setImagePreviews(editingPart.images || []);
            setSpecifications(editingPart.description?.specifications?.length > 0 ? editingPart.description.specifications : [{ key: '', value: '' }]);
            setFullDescription(editingPart.description?.fullDescription || (typeof editingPart.description === 'string' ? editingPart.description : ''));
        } else {
            setPartForm({ brand: '', model: '' });
            setImagePreviews([]);
            setSpecifications([{ key: '', value: '' }]);
            setFullDescription('');
        }
    }, [editingPart, dispatch]);

    const uniqueParts = useMemo(() => [...new Map(parts.map(item => [item._id, item])).values()], [parts]);
    const uniqueCategories = useMemo(() => [...new Map(categories.map(item => [item._id, item])).values()], [categories]);
    const uniqueBrands = useMemo(() => [...new Map(brands.map(item => [item._id, item])).values()], [brands]);
    const uniqueModels = useMemo(() => [...new Map(models.map(item => [item._id, item])).values()], [models]);
    const uniqueModelsForFilter = useMemo(() => [...new Map(modelsForFilter.map(item => [item._id, item])).values()], [modelsForFilter]);

    const handlePartFormChange = useCallback((field: 'brand' | 'model', value: string) => {
        setPartForm(prev => {
            const newState = { ...prev, [field]: value };
            if (field === 'brand') {
                newState.model = '';
            }
            return newState;
        });

        if (field === 'brand' && value) {
            dispatch(fetchModelsByBrand(value));
        }
    }, [dispatch]);

    const openModal = (type: string, item: any = null) => {
        setModalType(type); setCurrentItem(item);
        if (item) setFormData({ name: item.name, logoFile: null, brand: item.brand?._id || '' });
        else setFormData({ name: '', logoFile: null, brand: '' });
        setIsModalOpen(true);
    };

    const handleModalSubmit = async () => {
        let action: any, successMessage = '';
        try {
            switch (modalType) {
                case 'ADD_CATEGORY': action = addCategory({ name: formData.name }); successMessage = 'Category added!'; break;
                case 'EDIT_CATEGORY': action = updateCategory({ id: currentItem._id, name: formData.name }); successMessage = 'Category updated!'; break;
                case 'ADD_BRAND': action = addBrand({ name: formData.name, logoFile: formData.logoFile }); successMessage = 'Brand added!'; break;
                case 'EDIT_BRAND': action = updateBrand({ id: currentItem._id, name: formData.name, logoFile: formData.logoFile }); successMessage = 'Brand updated!'; break;
                case 'ADD_MODEL': action = addModel({ name: formData.name, brand: formData.brand }); successMessage = 'Model added!'; break;
            }
            if (action) {
                const result = await dispatch(action);
                if (result.meta.requestStatus === 'fulfilled') { toast.success(successMessage); setIsModalOpen(false); }
                else { toast.error(result.payload as string || 'An error occurred.'); }
            }
        } catch (error: any) { toast.error(error.message); }
    };

    const handleDelete = async (type: string, id: string) => {
        if (!window.confirm(`Are you sure you want to delete this ${type.toLowerCase()}?`)) return;
        let action: any;
        if (type === 'Part') action = deletePart(id);
        if (type === 'Category') action = deleteCategory(id);
        if (type === 'Brand') action = deleteBrand(id);
        if (type === 'Model') action = deleteModel(id);
        const result = await dispatch(action);
        if (result.meta.requestStatus === 'fulfilled') {
            toast.success(`${type} deleted!`);
            if (type === 'Part') dispatch(fetchParts(filters));
        }
        else toast.error(result.payload as string || `Failed to delete ${type}.`);
    };

    const handlePartSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formElements = form.elements as any;

        const imageFiles = formElements.imageFiles.files ? Array.from(formElements.imageFiles.files) : [];

        if (imageFiles.length === 0 && !editingPart) {
            return toast.error('Product images are required for a new part.');
        }

        const description = { fullDescription, highlights: formElements.highlights.value.split('\n').filter(Boolean), specifications: specifications.filter(s => s.key && s.value) };
        const data = {
            name: formElements.partName.value,
            sku: formElements.sku.value,
            unit: formElements.unit.value,
            itemType: formElements.itemType.value,
            description,
            mrp: formElements.mrp.value,
            price: formElements.price.value,
            gst: formElements.gst.value,
            hsnCode: formElements.hsnCode.value,
            stockQuantity: formElements.stockQuantity.value,
            reorderPoint: formElements.reorderPoint.value,
            model: formElements.model.value,
            category: formElements.category.value,
            brand: partForm.brand,
            imageFiles
        };
        const action = editingPart ? updatePart({ id: editingPart._id, data }) : addPart(data);

        toast.promise(dispatch(action).unwrap(), { loading: editingPart ? 'Updating...' : 'Adding...', success: `Part ${editingPart ? 'updated' : 'added'}!`, error: (err) => err || `Failed.` }).then(() => cancelEdit());
    };

    const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
        const newSpecs = [...specifications]; newSpecs[index][field] = value; setSpecifications(newSpecs);
    };
    const addSpecField = () => setSpecifications([...specifications, { key: '', value: '' }]);
    const removeSpecField = (index: number) => setSpecifications(specifications.filter((_, i) => i !== index));
    const handleEditPart = (part: any) => { setEditingPart(part); setActiveTab('add'); };
    const cancelEdit = () => { setEditingPart(null); setActiveTab('all'); };
    const handlePageChange = (newPage: number) => { if (newPage > 0 && newPage <= totalPages) setFilters(prev => ({ ...prev, page: newPage })); };

    const [isSyncing, setIsSyncing] = useState(false);

    const handleZohoSync = async () => {
        if (isSyncing) {
            if (!window.confirm("Are you sure you want to STOP the Zoho sync process?")) return;
            dispatch(stopSyncZoho());
            setIsSyncing(false);
            toast.error("Sync stopped by user.", { id: "zohoSync" });
            return;
        }

        if (!window.confirm("This will fetch all products from Zoho and sync them to the database. This might take a few minutes. Continue?")) return;

        setIsSyncing(true);
        toast.loading("Syncing with Zoho...", { id: "zohoSync" });

        try {
            const result = await dispatch(syncZohoData());

            if (syncZohoData.fulfilled.match(result)) {
                toast.success("Zoho Sync Completed!", { id: "zohoSync" });
                dispatch(fetchParts(filters));
            } else {
                toast.error(result.payload as string || "Sync Failed", { id: "zohoSync" });
            }
        } catch (err) {
            toast.error("Sync encountered an error", { id: "zohoSync" });
        } finally {
            setIsSyncing(false);
        }
    };

    const [isExporting, setIsExporting] = useState(false);

    const handleZohoExport = async () => {
        if (isExporting) {
            if (!window.confirm("Are you sure you want to STOP the export process?")) return;
            dispatch(stopSyncZoho());
            setIsExporting(false);
            toast.error("Export stopped by user.", { id: "zohoExport" });
            return;
        }

        if (!window.confirm("This will export all 'Manual' products to Zoho Inventory. Continue?")) return;

        setIsExporting(true);
        toast.loading("Exporting to Zoho...", { id: "zohoExport" });

        try {
            const result = await dispatch(exportManualProductsToZoho());

            if (exportManualProductsToZoho.fulfilled.match(result)) {
                toast.success("Export Completed!", { id: "zohoExport" });
                dispatch(fetchParts(filters));
            } else {
                toast.error(result.payload as string || "Export Failed", { id: "zohoExport" });
            }
        } catch (err) {
            toast.error("Export encountered an error", { id: "zohoExport" });
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans">
            <ManagementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalType.replace(/_/g, ' ')}>
                <div className="space-y-5">
                    {(modalType.includes('BRAND')) && (
                        <div>
                            <label className='block text-sm font-semibold text-slate-700 mb-1.5'>Brand Logo</label>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors relative">
                                <input type="file" onChange={(e: any) => setFormData({ ...formData, logoFile: e.target.files[0] })} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <span className="text-sm text-slate-500">{formData.logoFile ? formData.logoFile.name : "Click to upload"}</span>
                            </div>
                        </div>
                    )}
                    {modalType.includes('MODEL') && (
                        <div>
                            <label className='block text-sm font-semibold text-slate-700 mb-1.5'>Select Brand</label>
                            <select value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all">
                                <option value="">Select Brand</option>{uniqueBrands.map((b: any) => <option key={b._id} value={b._id}>{b.name}</option>)}
                            </select>
                        </div>
                    )}
                    <div>
                        <label className='block text-sm font-semibold text-slate-700 mb-1.5'>Name</label>
                        <input type="text" placeholder="Enter name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all" />
                    </div>
                    <button onClick={handleModalSubmit} disabled={status === 'loading'} className="w-full flex justify-center items-center bg-[#176FC0] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
                        {status === 'loading' ? <Loader2 className="animate-spin w-5 h-5" /> : 'Save Changes'}
                    </button>
                </div>
            </ManagementModal>

            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <Package className="w-6 h-6 text-[#176FC0]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Product Inventory</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Manage your catalog, prices, and stock levels.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {isSyncing ? (
                        <button onClick={handleZohoSync} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm bg-red-100 hover:bg-red-200 text-red-700 border border-red-200">
                            <XCircle className="w-4 h-4 animate-pulse" />
                            <span className="hidden sm:inline">Stop Sync</span>
                        </button>
                    ) : (
                        <button onClick={handleZohoSync} disabled={status === 'loading'} className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
                            <RefreshCw className={`w-4 h-4 ${status === 'loading' && !isExporting ? 'animate-spin' : ''}`} />
                            <span className="hidden sm:inline">Sync Zoho</span>
                        </button>
                    )}

                    {isExporting ? (
                        <button onClick={handleZohoExport} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg bg-red-500 hover:bg-red-600 text-white shadow-red-500/20">
                            <XCircle className="w-4 h-4 animate-pulse" />
                            <span className="hidden sm:inline">Stop Export</span>
                        </button>
                    ) : (
                        <button onClick={handleZohoExport} disabled={status === 'loading'} className="flex items-center gap-2 bg-[#176FC0] hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">
                            <Upload className={`w-4 h-4 ${status === 'loading' ? 'animate-bounce' : ''}`} />
                            <span className="hidden sm:inline">Export Unsynced</span>
                        </button>
                    )}
                </div>
            </header>

            <div className="mb-8">
                <div className="bg-slate-100/50 p-1.5 rounded-2xl inline-flex flex-wrap gap-1">
                    {[
                        { id: 'all', label: 'All Products', icon: Package },
                        { id: 'add', label: editingPart ? 'Edit Product' : 'Add Product', icon: PlusCircle },
                        { id: 'manage', label: 'Library Management', icon: Database }
                    ].map(tab => (
                        <TabButton
                            key={tab.id}
                            active={activeTab === tab.id}
                            onClick={() => { if (tab.id !== 'add') cancelEdit(); setActiveTab(tab.id); }}
                            icon={tab.icon}
                        >
                            {tab.label}
                        </TabButton>
                    ))}
                </div>
            </div>

            {activeTab === 'all' && (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/30">
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#176FC0] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name, SKU or brand..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative w-full md:w-48">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    onChange={(e) => setFilters({ ...filters, source: e.target.value, page: 1 })}
                                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">All Sources</option>
                                    <option value="manual">Manual Entry</option>
                                    <option value="zoho">Zoho CRM</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="p-4 pl-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Product Details</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Source</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Status</th>
                                    <th className="p-4 pr-6 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {status === 'loading' && uniqueParts.length === 0 ? (
                                    <tr><td colSpan={5} className="text-center p-12"><Loader2 className="animate-spin w-8 h-8 text-[#176FC0] mx-auto" /></td></tr>
                                ) : uniqueParts.map((part: any) => (
                                    <tr key={part._id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shrink-0">
                                                    <Image src={part.images[0] || '/placeholder.png'} alt={part.name} width={48} height={48} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 text-sm">{part.name}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">{part.sku || 'No SKU'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border ${part.source === 'Manual' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
                                                {part.source === 'Manual' ? <Database size={10} /> : <Cloud size={10} />}
                                                {part.source}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-bold text-slate-800">₹{part.price.toLocaleString('en-IN')}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStockClass(part.stockQuantity)}`}>
                                                {part.stockQuantity} {part.unit || 'units'}
                                            </span>
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEditPart(part)} disabled={part.source === 'Zoho'} className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-blue-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Edit">
                                                    <Pencil size={16} />
                                                </button>
                                                <button onClick={() => handleDelete('Part', part._id)} disabled={part.source === 'Zoho'} className="p-2 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {uniqueParts.length === 0 && status !== 'loading' && (
                                    <tr><td colSpan={5} className="text-center p-12 text-slate-500">No products found matching your filters.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30">
                        <p className="text-sm font-medium text-slate-500">Showing page {currentPage} of {totalPages} <span className="text-slate-400">({totalCount} items)</span></p>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1 || status === 'loading'} className="p-2 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-slate-600"><ChevronLeft size={16} /></button>
                            <span className='text-sm font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg'>{currentPage}</span>
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages || status === 'loading'} className="p-2 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-slate-600"><ChevronRight size={16} /></button>
                        </div>
                    </div>
                </div>
            )}

            {(activeTab === 'add') && (
                <form onSubmit={handlePartSubmit} className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <Accordion title="Basic Information">
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Part Name <span className="text-red-500">*</span></label>
                                        <input type="text" name="partName" defaultValue={editingPart?.name} required className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">SKU <span className="text-red-500">*</span></label>
                                        <input type="text" name="sku" defaultValue={editingPart?.sku} required className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Unit</label>
                                        <input type="text" name="unit" defaultValue={editingPart?.unit || 'pcs'} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Item Type</label>
                                        <select name="itemType" defaultValue={editingPart?.itemType || 'inventory'} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all">
                                            <option value="inventory">Inventory</option>
                                            <option value="non_inventory">Non-Inventory</option>
                                            <option value="service">Service</option>
                                        </select>
                                    </div>
                                </div>
                            </Accordion>

                            <Accordion title="Description & Specifications">
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Description</label>
                                        <div className="prose prose-sm max-w-none border border-slate-200 rounded-lg overflow-hidden">
                                            <RichTextEditor content={fullDescription} onChange={setFullDescription} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Highlights (one per line)</label>
                                        <textarea name="highlights" rows={4} defaultValue={editingPart?.description?.highlights?.join('\n') || ''} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400" placeholder="• High durability&#10;• Easy installation"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Specifications</label>
                                        <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            {specifications.map((spec, index) => (
                                                <div key={index} className="flex items-center gap-2 group">
                                                    <input type="text" placeholder="Key (e.g. Weight)" value={spec.key} onChange={(e) => handleSpecChange(index, 'key', e.target.value)} className="w-1/3 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#176FC0] focus:outline-none" />
                                                    <input type="text" placeholder="Value (e.g. 5kg)" value={spec.value} onChange={(e) => handleSpecChange(index, 'value', e.target.value)} className="w-2/3 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#176FC0] focus:outline-none" />
                                                    <button type="button" onClick={() => removeSpecField(index)} className="p-2 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={addSpecField} className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-[#176FC0] hover:text-blue-700 transition-colors">
                                                <PlusCircle size={16} /> Add Specification
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Accordion>

                            <Accordion title="Pricing & Inventory">
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Selling Price (₹) <span className="text-red-500">*</span></label><input type="number" name="price" defaultValue={editingPart?.price} required className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all" /></div>
                                    <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">MRP (₹)</label><input type="number" name="mrp" defaultValue={editingPart?.mrp || 0} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all" /></div>
                                    <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Stock Quantity <span className="text-red-500">*</span></label><input type="number" name="stockQuantity" defaultValue={editingPart?.stockQuantity} required className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all" /></div>
                                    <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Re-order Point</label><input type="number" name="reorderPoint" defaultValue={editingPart?.reorderPoint} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all" /></div>
                                    <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">GST (%)</label><input type="number" name="gst" defaultValue={editingPart?.gst || 18} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all" /></div>
                                    <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">HSN Code</label><input type="text" name="hsnCode" defaultValue={editingPart?.hsnCode} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all" /></div>
                                </div>
                            </Accordion>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-bold text-slate-800 mb-3">Product Images <span className="text-red-500">*</span></label>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors relative group">
                                    <UploadCloud className="mx-auto h-10 w-10 text-slate-400 group-hover:text-[#176FC0] transition-colors" />
                                    <p className="mt-2 text-sm font-medium text-slate-600">Drag & drop or <span className="text-[#176FC0]">browse</span></p>
                                    <input id="imageFiles" name="imageFiles" type="file" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e: any) => setImagePreviews(Array.from(e.target.files).map((file: any) => URL.createObjectURL(file)))} />
                                </div>
                                {imagePreviews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                        {imagePreviews.map((src, i) => (
                                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                                                <Image src={src} alt="preview" fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                <h4 className='font-bold text-slate-800 flex items-center gap-2'><Car size={18} /> Compatibility</h4>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Brand</label>
                                    <select name="brand" value={partForm.brand} onChange={(e) => handlePartFormChange('brand', e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]">
                                        <option value="">Select Brand</option>{uniqueBrands.map((b: any) => <option key={b._id} value={b._id}>{b.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Model</label>
                                    <select name="model" value={partForm.model} onChange={(e) => handlePartFormChange('model', e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] disabled:opacity-50" disabled={!partForm.brand}>
                                        <option value="">Select Model</option>{uniqueModelsForFilter.map((m: any) => <option key={m._id} value={m._id}>{m.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <h4 className='font-bold text-slate-800 mb-4 flex items-center gap-2'><Tag size={18} /> Categorization</h4>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                                <select name="category" defaultValue={editingPart?.category._id} required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]">
                                    <option value="">Select Category</option>{uniqueCategories.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
                                </select>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center items-center bg-[#176FC0] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
                                    {status === 'loading' ? <Loader2 className="animate-spin w-5 h-5" /> : (editingPart ? 'Update Product' : 'Create Product')}
                                </button>
                                {editingPart && (
                                    <button type="button" onClick={cancelEdit} className="w-full text-center py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                                        Cancel Editing
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {activeTab === 'manage' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[600px]">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Layers size={18} className="text-[#176FC0]" /> Categories</h3>
                            <button onClick={() => openModal('ADD_CATEGORY')} className="p-2 bg-white border border-slate-200 rounded-lg hover:border-[#176FC0] hover:text-[#176FC0] transition-colors shadow-sm"><Plus size={18} /></button>
                        </div>
                        <ul className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                            {uniqueCategories.map((cat: any) => (
                                <li key={cat._id} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-700 text-sm">{cat.name}</span>
                                        <span className={`text-[10px] w-fit px-1.5 py-0.5 mt-1 rounded font-bold uppercase tracking-wider ${cat.source === 'Zoho' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
                                            {cat.source || 'Manual'}
                                        </span>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openModal('EDIT_CATEGORY', cat)} disabled={cat.source === 'Zoho'} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-30">
                                            <Pencil size={14} />
                                        </button>
                                        <button onClick={() => handleDelete('Category', cat._id)} disabled={cat.source === 'Zoho'} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[600px]">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Tag size={18} className="text-[#176FC0]" /> Brands</h3>
                            <button onClick={() => openModal('ADD_BRAND')} className="p-2 bg-white border border-slate-200 rounded-lg hover:border-[#176FC0] hover:text-[#176FC0] transition-colors shadow-sm"><Plus size={18} /></button>
                        </div>
                        <ul className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                            {uniqueBrands.map((brand: any) => (
                                <li key={brand._id} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center">
                                            <Image src={brand.logo || '/images/placeholder.png'} alt={brand.name} width={32} height={32} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-700 text-sm">{brand.name}</span>
                                            <span className={`text-[10px] w-fit px-1.5 py-0.5 mt-0.5 rounded font-bold uppercase tracking-wider ${brand.source === 'Zoho' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
                                                {brand.source || 'Manual'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openModal('EDIT_BRAND', brand)} disabled={brand.source === 'Zoho'} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-30">
                                            <Pencil size={14} />
                                        </button>
                                        <button onClick={() => handleDelete('Brand', brand._id)} disabled={brand.source === 'Zoho'} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[600px]">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Car size={18} className="text-[#176FC0]" /> Models</h3>
                            <button onClick={() => openModal('ADD_MODEL')} className="p-2 bg-white border border-slate-200 rounded-lg hover:border-[#176FC0] hover:text-[#176FC0] transition-colors shadow-sm"><Plus size={18} /></button>
                        </div>
                        <ul className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                            {uniqueModels.map((model: any) => (
                                <li key={model._id} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-700 text-sm">{model.name}</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">{model.brand?.name}</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${model.source === 'Zoho' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
                                                {model.source || 'Manual'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleDelete('Model', model._id)} disabled={model.source === 'Zoho'} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}