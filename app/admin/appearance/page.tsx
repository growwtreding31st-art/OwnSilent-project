"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchSlides, addSlide, updateSlide, deleteSlide } from '@/lib/redux/heroSlice';
import { fetchCategorySlides, saveCategorySlide, deleteCategorySlide } from '@/lib/redux/categorySlideSlice';
import { fetchCategorySections, saveCategorySection, deleteCategorySection } from '@/lib/redux/categorySectionSlice';
import { fetchCategories } from '@/lib/redux/productSlice';
import {
    Image as LucideImageIcon, Plus as LucidePlus, Trash2 as LucideTrash2, Pencil as LucidePencil,
    Loader2 as LucideLoader2, PlusCircle as LucidePlusCircle, Layers as LucideLayers,
    UploadCloud as LucideUploadCloud, LayoutTemplate as LucideLayoutTemplate,
    FileText as LucideFileText, Sparkles as LucideSparkles, List as LucideList,
    Tag as LucideTag, AlignLeft as LucideAlignLeft, MousePointerClick as LucideMousePointerClick,
    Table as LucideTable, X as LucideX, CheckCircle2 as LucideCheckCircle2,
    Info as LucideInfo, Settings as LucideSettings, Star as LucideStar, ArrowRight as LucideArrowRight,
    ChevronDown as LucideChevronDown
} from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

const CustomArrowRight = ({ className }: { className?: string }) => (
    <LucideArrowRight className={className} />
);

const TabButton = ({ active, onClick, children, icon: Icon }: { active: boolean, onClick: () => void, children: React.ReactNode, icon: any }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition-all duration-200 border ${active
            ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200 scale-[1.02]'
            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
    >
        <Icon size={18} />
        {children}
    </button>
);

const SectionHeader = ({ icon: Icon, title, subtitle, color = "text-blue-600" }: { icon: any, title: string, subtitle: string, color?: string }) => (
    <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
            <div className={`p-2 rounded-lg bg-white shadow-sm border border-slate-100 ${color}`}>
                <Icon size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        <p className="text-xs text-slate-500 font-medium ml-12">{subtitle}</p>
    </div>
);

const InputLabel = ({ icon: Icon, label, subLabel }: { icon?: any, label: string, subLabel?: string }) => (
    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2 tracking-wider">
        {Icon && <Icon size={14} className="text-slate-400" />}
        {label}
        {subLabel && <span className="text-slate-400 font-normal normal-case ml-1">({subLabel})</span>}
    </label>
);



const ImageUploadGrid = ({
    images,
    newFiles,
    onFileChange,
    onRemoveExisting,
    onRemoveNew,
    label = "Gallery Images"
}: {
    images: string[],
    newFiles: { file: File, preview: string }[],
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onRemoveExisting: (index: number) => void,
    onRemoveNew: (index: number) => void,
    label?: string
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="space-y-4">
            <InputLabel icon={LucideImageIcon} label={label} />
            <div className="grid grid-cols-3 gap-3">
                {images.map((img, i) => (
                    <div key={`exist-${i}`} className="aspect-[4/3] relative rounded-xl overflow-hidden border border-slate-200 group shadow-sm">
                        <Image src={img} alt="Existing" fill className="object-cover" />
                        <button type="button" onClick={() => onRemoveExisting(i)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-md">
                            <LucideX size={14} />
                        </button>
                        <div className="absolute bottom-0 inset-x-0 bg-slate-900/60 backdrop-blur-sm text-white text-[10px] text-center py-1 font-bold">EXISTING</div>
                    </div>
                ))}
                {newFiles.map((fileObj, i) => (
                    <div key={`new-${i}`} className="aspect-[4/3] relative rounded-xl overflow-hidden border border-emerald-200 group ring-2 ring-emerald-500/10 shadow-sm">
                        <Image src={fileObj.preview} alt="New" fill className="object-cover" />
                        <button type="button" onClick={() => onRemoveNew(i)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-md">
                            <LucideX size={14} />
                        </button>
                        <div className="absolute bottom-0 inset-x-0 bg-emerald-600/80 backdrop-blur-sm text-white text-[10px] text-center py-1 font-bold uppercase tracking-wider">New</div>
                    </div>
                ))}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-200 hover:border-[#176FC0] hover:bg-blue-50/50 transition-all cursor-pointer flex flex-col items-center justify-center text-slate-400 hover:text-[#176FC0] group"
                >
                    <div className="p-2 rounded-full bg-slate-50 group-hover:bg-blue-100 transition-colors mb-2">
                        <LucidePlus size={24} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-tight">Add Media</span>
                    <input type="file" multiple ref={fileInputRef} onChange={onFileChange} className="hidden" accept="image/*" />
                </div>
            </div>
        </div>
    );
};

// ... HeroSliderManager (Keeping it as it handles Homepage Hero which is different)
const HeroSliderManager = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { slides, status } = useSelector((state: RootState) => state.hero);
    const [editingSlide, setEditingSlide] = useState<any>(null);
    const [formData, setFormData] = useState({ title: '', subtitle: '', ctaPrimary: '', ctaPrimaryLink: '', ctaSecondary: '', ctaSecondaryLink: '', isActive: true });
    const [descriptionData, setDescriptionData] = useState({ mainText: '', highlights: '', specifications: [{ key: '', value: '' }] });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { dispatch(fetchSlides()); }, [dispatch]);

    const handleEditClick = (slide: any) => {
        setEditingSlide(slide);
        setFormData({ title: slide.title, subtitle: slide.subtitle, ctaPrimary: slide.ctaPrimary, ctaPrimaryLink: slide.ctaPrimaryLink, ctaSecondary: slide.ctaSecondary, ctaSecondaryLink: slide.ctaSecondaryLink, isActive: slide.isActive });
        setDescriptionData({ mainText: slide.description?.mainText || '', highlights: slide.description?.highlights?.join('\n') || '', specifications: slide.description?.specifications?.length > 0 ? slide.description.specifications : [{ key: '', value: '' }] });
        setImagePreview(slide.image);
        setImageFile(null);
    };

    const handleCancelEdit = () => {
        setEditingSlide(null);
        setFormData({ title: '', subtitle: '', ctaPrimary: '', ctaPrimaryLink: '', ctaSecondary: '', ctaSecondaryLink: '', isActive: true });
        setDescriptionData({ mainText: '', highlights: '', specifications: [{ key: '', value: '' }] });
        setImageFile(null); setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSlide && !imageFile) return toast.error('An image is required for a new slide.');

        const finalDescription = { mainText: descriptionData.mainText, highlights: descriptionData.highlights.split('\n').filter(h => h.trim() !== ''), specifications: descriptionData.specifications.filter(s => s.key.trim() !== '' && s.value.trim() !== '') };

        const slideData = {
            ...formData,
            description: finalDescription,
            imageFile,
        };

        const action = editingSlide ? dispatch(updateSlide({ id: editingSlide._id, slideData })).unwrap() : dispatch(addSlide(slideData)).unwrap();

        toast.promise(action, { loading: editingSlide ? 'Updating...' : 'Adding...', success: `Slide ${editingSlide ? 'updated' : 'added'}!`, error: (err) => err || 'Failed.' }).then(handleCancelEdit);
    };

    const handleDelete = (id: string) => { if (window.confirm('Are you sure you want to delete this slide?')) dispatch(deleteSlide(id)); };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
        else setFormData({ ...formData, [name]: value });
    };
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescriptionData({ ...descriptionData, [e.target.name]: e.target.value });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-6">
            <div className="xl:col-span-4 space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm sticky top-6">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                        <SectionHeader icon={LucideLayoutTemplate} title={editingSlide ? 'Edit Slide' : 'New Hero Slide'} subtitle="Direct homepage promotional banner" />
                        {editingSlide && <button onClick={handleCancelEdit} className="text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 px-4 py-2 rounded-lg transition-colors">Cancel</button>}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div>
                                <InputLabel icon={LucideLayoutTemplate} label="Marketing Headings" />
                                <div className="space-y-3">
                                    <input type="text" name="title" placeholder="Main Catchy Title" value={formData.title} onChange={handleInputChange} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#176FC0] transition-all font-bold text-slate-900" />
                                    <input type="text" name="subtitle" placeholder="Compelling Sub-heading" value={formData.subtitle} onChange={handleInputChange} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#176FC0] transition-all" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <InputLabel icon={LucideMousePointerClick} label="Primary Action" />
                                    <input type="text" name="ctaPrimary" placeholder="Button Text" value={formData.ctaPrimary} onChange={handleInputChange} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#176FC0]" />
                                    <input type="text" name="ctaPrimaryLink" placeholder="URL Link" value={formData.ctaPrimaryLink} onChange={handleInputChange} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#176FC0]" />
                                </div>
                                <div className="space-y-3">
                                    <InputLabel icon={LucideSettings} label="Secondary Action" />
                                    <input type="text" name="ctaSecondary" placeholder="Button Text" value={formData.ctaSecondary} onChange={handleInputChange} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#176FC0]" />
                                    <input type="text" name="ctaSecondaryLink" placeholder="URL Link" value={formData.ctaSecondaryLink} onChange={handleInputChange} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#176FC0]" />
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
                                <div>
                                    <InputLabel icon={LucideAlignLeft} label="Brief Description" />
                                    <textarea name="mainText" placeholder="Detailed marketing copy..." value={descriptionData.mainText} onChange={handleDescriptionChange} rows={3} className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#176FC0] shadow-sm"></textarea>
                                </div>
                                <div>
                                    <InputLabel icon={LucideList} label="Feature Highlights" subLabel="Bullet points" />
                                    <textarea name="highlights" placeholder="• Professional Carbon Fiber&#10;• Perfect Fitment Guaranteed" value={descriptionData.highlights} onChange={handleDescriptionChange} rows={3} className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#176FC0] shadow-sm"></textarea>
                                </div>
                            </div>

                            <div>
                                <InputLabel icon={LucideImageIcon} label="Feature Image" />
                                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 transition-all cursor-pointer relative group bg-slate-50/30">
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                                    {imagePreview ? (
                                        <div className="relative group overflow-hidden rounded-xl">
                                            <Image src={imagePreview} alt="Preview" width={400} height={200} className='w-full h-40 object-cover shadow-sm transition-transform group-hover:scale-105' />
                                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                                                <LucideUploadCloud size={24} className="mb-2" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Change Image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-6">
                                            <div className="w-14 h-14 bg-white text-[#176FC0] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                                <LucideUploadCloud size={28} />
                                            </div>
                                            <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Click to upload banner</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all group">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${formData.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                    <LucideCheckCircle2 size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800">Public Visibility</p>
                                    <p className="text-[11px] text-slate-500">Toggle to show or hide on homepage</p>
                                </div>
                                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-5 h-5 text-[#176FC0] rounded-md border-slate-300 focus:ring-[#176FC0] cursor-pointer" />
                            </label>

                            <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center items-center bg-[#176FC0] text-white font-extrabold py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest">
                                {status === 'loading' ? <LucideLoader2 className="animate-spin" /> : (editingSlide ? 'Update Hero Slide' : <><LucidePlus size={20} className="mr-2" /> Create Hero Slide</>)}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="xl:col-span-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-full">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                        <SectionHeader icon={LucideLayers} title="Homepage Slideshow" subtitle={`Managing ${slides.length} active marketing pieces`} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {slides.map((slide: any) => (
                            <div key={slide._id} className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full ring-1 ring-slate-100">
                                <div className="relative h-56 w-full bg-slate-50">
                                    <Image src={slide.image} alt={slide.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>

                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                                        <button onClick={() => handleEditClick(slide)} className="p-3 bg-white/90 backdrop-blur-md text-slate-700 rounded-xl hover:bg-[#176FC0] hover:text-white shadow-lg transition-all"><LucidePencil size={16} /></button>
                                        <button onClick={() => handleDelete(slide._id)} className="p-3 bg-white/90 backdrop-blur-md text-slate-700 rounded-xl hover:bg-red-500 hover:text-white shadow-lg transition-all"><LucideTrash2 size={16} /></button>
                                    </div>

                                    <div className="absolute bottom-6 left-6 right-6">
                                        <span className={`inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase rounded-full mb-3 shadow-sm ${slide.isActive ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>
                                            {slide.isActive ? 'Active' : 'Hidden'}
                                        </span>
                                        <h3 className="font-extrabold text-white text-2xl leading-tight line-clamp-1 truncate">{slide.title}</h3>
                                        <p className="text-slate-200 text-xs font-medium line-clamp-1 mt-2 tracking-wide">{slide.subtitle}</p>
                                    </div>
                                </div>
                                <div className="p-5 flex items-center justify-between mt-auto border-t border-slate-50 bg-slate-50/30">
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wider">{slide.ctaPrimary}</span>
                                        <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wider">{slide.ctaSecondary}</span>
                                    </div>
                                    <CustomArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#176FC0] group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CategoryVisualsManager = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { slides: categorySlides, status: slideStatus } = useSelector((state: RootState) => state.categorySlides);
    const { sections, status: sectionStatus } = useSelector((state: RootState) => state.categorySections);
    const { categories } = useSelector((state: RootState) => state.products);

    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    // States for 3 Sections
    const [heroData, setHeroData] = useState({ title: '', subtitle: '', ctaText: '', ctaLink: '', mainText: '', highlights: '', isActive: true });
    const [detailData, setDetailData] = useState({ title: '', subtitle: '', mainText: '', highlights: '', isActive: true });
    const [techData, setTechData] = useState({ title: 'Technical Overview', mainText: '', highlights: '', specifications: [{ key: '', value: '' }] });

    // Image States
    const [heroExistingImg, setHeroExistingImg] = useState<string[]>([]);
    const [heroNewFiles, setHeroNewFiles] = useState<{ file: File, preview: string }[]>([]);

    const [detailExistingImg, setDetailExistingImg] = useState<string[]>([]);
    const [detailNewFiles, setDetailNewFiles] = useState<{ file: File, preview: string }[]>([]);

    const [techExistingImg, setTechExistingImg] = useState<string[]>([]);
    const [techNewFiles, setTechNewFiles] = useState<{ file: File, preview: string }[]>([]);

    useEffect(() => {
        dispatch(fetchCategorySlides());
        dispatch(fetchCategorySections());
        dispatch(fetchCategories());
    }, [dispatch]);

    // Load data when category is selected
    useEffect(() => {
        if (!selectedCategoryId) {
            resetForms();
            return;
        }

        const slide = categorySlides.find(s => (s.category?._id || s.category) === selectedCategoryId);
        const section = sections.find(s => (s.category?._id || s.category) === selectedCategoryId);

        if (slide) {
            setHeroData({
                title: slide.title || '',
                subtitle: slide.subtitle || '',
                ctaText: slide.ctaText || '',
                ctaLink: slide.ctaLink || '',
                mainText: slide.description?.mainText || '',
                highlights: slide.description?.highlights?.join('\n') || '',
                isActive: slide.isActive
            });
            setHeroExistingImg(slide.images || []);
        } else {
            setHeroData({ title: '', subtitle: '', ctaText: '', ctaLink: '', mainText: '', highlights: '', isActive: true });
            setHeroExistingImg([]);
        }

        if (section) {
            setDetailData({
                title: section.title || '',
                subtitle: section.subtitle || '',
                mainText: section.description?.mainText || '',
                highlights: section.description?.highlights?.join('\n') || '',
                isActive: section.isActive
            });
            setDetailExistingImg(section.images || []);

            setTechData({
                title: section.technicalTitle || 'Technical Overview',
                mainText: section.technicalDescription || '',
                highlights: section.technicalHighlights?.join('\n') || '',
                specifications: section.description?.specifications?.length > 0 ? section.description.specifications : [{ key: '', value: '' }]
            });
            setTechExistingImg(section.technicalImages || []);
        } else {
            setDetailData({ title: '', subtitle: '', mainText: '', highlights: '', isActive: true });
            setDetailExistingImg([]);
            setTechData({ title: 'Technical Overview', mainText: '', highlights: '', specifications: [{ key: '', value: '' }] });
            setTechExistingImg([]);
        }

        setHeroNewFiles([]);
        setDetailNewFiles([]);
        setTechNewFiles([]);

    }, [selectedCategoryId, categorySlides, sections]);

    const resetForms = () => {
        setHeroData({ title: '', subtitle: '', ctaText: '', ctaLink: '', mainText: '', highlights: '', isActive: true });
        setDetailData({ title: '', subtitle: '', mainText: '', highlights: '', isActive: true });
        setTechData({ title: 'Technical Overview', mainText: '', highlights: '', specifications: [{ key: '', value: '' }] });
        setHeroExistingImg([]); setDetailExistingImg([]); setTechExistingImg([]);
        setHeroNewFiles([]); setDetailNewFiles([]); setTechNewFiles([]);
    };

    const handleSave = async () => {
        if (!selectedCategoryId) return toast.error('Please select a category first.');

        const heroPayload = {
            categoryId: selectedCategoryId,
            ...heroData,
            description: {
                mainText: heroData.mainText,
                highlights: heroData.highlights.split('\n').filter(h => h.trim() !== '')
            },
            existingImages: heroExistingImg,
            imageFiles: heroNewFiles.map(f => f.file),
            isEditing: !!categorySlides.find(s => (s.category?._id || s.category) === selectedCategoryId)
        };

        const sectionPayload = {
            categoryId: selectedCategoryId,
            title: detailData.title,
            subtitle: detailData.subtitle,
            isActive: detailData.isActive,
            description: {
                mainText: detailData.mainText,
                highlights: detailData.highlights.split('\n').filter(h => h.trim() !== ''),
                specifications: techData.specifications.filter(s => s.key.trim() !== '' && s.value.trim() !== '')
            },
            existingImages: detailExistingImg,
            imageFiles: detailNewFiles.map(f => f.file),

            // Technical fields
            technicalTitle: techData.title,
            technicalDescription: techData.mainText,
            technicalHighlights: techData.highlights.split('\n').filter(h => h.trim() !== ''),
            existingTechnicalImages: techExistingImg,
            technicalImageFiles: techNewFiles.map(f => f.file),

            isEditing: !!sections.find(s => (s.category?._id || s.category) === selectedCategoryId)
        };

        try {
            toast.loading('Saving complete category layout...', { id: 'save-category' });
            await Promise.all([
                dispatch(saveCategorySlide(heroPayload)).unwrap(),
                dispatch(saveCategorySection(sectionPayload)).unwrap()
            ]);
            toast.success('Category appearance updated successfully!', { id: 'save-category' });
        } catch (error: any) {
            toast.error(`Error: ${error}`, { id: 'save-category' });
        }
    };

    const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
        const newSpecs = [...techData.specifications];
        newSpecs[index][field] = value;
        setTechData({ ...techData, specifications: newSpecs });
    };

    const addSpecField = () => setTechData({ ...techData, specifications: [...techData.specifications, { key: '', value: '' }] });
    const removeSpecField = (index: number) => setTechData({ ...techData, specifications: techData.specifications.filter((_, i) => i !== index) });

    const handleFileChange = (setter: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const newFileObjects = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
            setter((prev: any) => [...prev, ...newFileObjects]);
        }
    };

    return (
        <div className="space-y-8 mt-6">
            {/* Category Selection Bar */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-12 h-12 bg-blue-50 text-[#176FC0] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                        <LucideTag size={24} />
                    </div>
                    <div className="flex-1 min-w-[240px]">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Editing Visuals For</p>
                        <div className="relative">
                            <select
                                value={selectedCategoryId}
                                onChange={(e) => setSelectedCategoryId(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#176FC0] appearance-none cursor-pointer"
                            >
                                <option value="">Select a Category to Start</option>
                                {categories.map((cat: any) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <LucideChevronDown size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={resetForms}
                        className="flex-1 md:flex-none px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                        Reset Changes
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!selectedCategoryId || slideStatus === 'loading' || sectionStatus === 'loading'}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#176FC0] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {(slideStatus === 'loading' || sectionStatus === 'loading') ? <LucideLoader2 size={18} className="animate-spin" /> : <><LucidePlus size={18} /> Apply All Changes</>}
                    </button>
                </div>
            </div>

            {selectedCategoryId ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">

                    {/* Section 1: Hero Showcase */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full ring-1 ring-slate-50">
                        <SectionHeader icon={LucideSparkles} title="1. Hero Showcase" subtitle="Primary entry section with carousel" color="text-amber-500" />

                        <div className="space-y-6 flex-1">
                            <div>
                                <InputLabel icon={LucideLayoutTemplate} label="Main Heading" />
                                <div className="space-y-3">
                                    <input placeholder="Eye-catching Title" value={heroData.title} onChange={(e) => setHeroData({ ...heroData, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#176FC0] outline-none" />
                                    <input placeholder="Supporting Subtitle" value={heroData.subtitle} onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#176FC0] outline-none" />
                                </div>
                            </div>

                            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
                                <div>
                                    <InputLabel icon={LucideAlignLeft} label="Brief Description" />
                                    <textarea placeholder="Write a short summary..." rows={3} value={heroData.mainText} onChange={(e) => setHeroData({ ...heroData, mainText: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:border-[#176FC0] outline-none"></textarea>
                                </div>
                                <div>
                                    <InputLabel icon={LucideList} label="Key Highlights" subLabel="One feature per line" />
                                    <textarea placeholder="• Feature A&#10;• Feature B" rows={3} value={heroData.highlights} onChange={(e) => setHeroData({ ...heroData, highlights: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:border-[#176FC0] outline-none"></textarea>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <InputLabel label="CTA Text" />
                                    <input placeholder="Explore Now" value={heroData.ctaText} onChange={(e) => setHeroData({ ...heroData, ctaText: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#176FC0] outline-none" />
                                </div>
                                <div>
                                    <InputLabel label="CTA Link" />
                                    <input placeholder="#collection" value={heroData.ctaLink} onChange={(e) => setHeroData({ ...heroData, ctaLink: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#176FC0] outline-none" />
                                </div>
                            </div>

                            <ImageUploadGrid
                                label="Hero Carousel (Desktop L / Mobile R)"
                                images={heroExistingImg}
                                newFiles={heroNewFiles}
                                onFileChange={handleFileChange(setHeroNewFiles)}
                                onRemoveExisting={(idx) => setHeroExistingImg(prev => prev.filter((_, i) => i !== idx))}
                                onRemoveNew={(idx) => setHeroNewFiles(prev => prev.filter((_, i) => i !== idx))}
                            />
                        </div>
                    </div>

                    {/* Section 2: Deep Dive */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full ring-1 ring-slate-50">
                        <SectionHeader icon={LucideStar} title="2. Deep Dive" subtitle="Secondary detailed content area" color="text-blue-500" />

                        <div className="space-y-6 flex-1">
                            <div>
                                <InputLabel icon={LucideInfo} label="Main Heading" />
                                <div className="space-y-3">
                                    <input placeholder="Section Title (e.g. Crafted for Precision)" value={detailData.title} onChange={(e) => setDetailData({ ...detailData, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#176FC0] outline-none" />
                                    <input placeholder="Short Intro Label" value={detailData.subtitle} onChange={(e) => setDetailData({ ...detailData, subtitle: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#176FC0] outline-none" />
                                </div>
                            </div>

                            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
                                <div>
                                    <InputLabel icon={LucideAlignLeft} label="Brief Description" />
                                    <textarea placeholder="Full detailed description of the category's unique value props..." rows={6} value={detailData.mainText} onChange={(e) => setDetailData({ ...detailData, mainText: e.target.value })} className="w-full bg-white border border-slate-200 rounded-2xl p-5 text-sm leading-relaxed focus:border-[#176FC0] outline-none"></textarea>
                                </div>
                                <div>
                                    <InputLabel icon={LucideList} label="Key Highlights" subLabel="Shown on mobile" />
                                    <textarea placeholder="• Feature A&#10;• Feature B" rows={3} value={detailData.highlights} onChange={(e) => setDetailData({ ...detailData, highlights: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:border-[#176FC0] outline-none"></textarea>
                                </div>
                            </div>

                            <ImageUploadGrid
                                label="Detail Media (Desktop Center)"
                                images={detailExistingImg}
                                newFiles={detailNewFiles}
                                onFileChange={handleFileChange(setDetailNewFiles)}
                                onRemoveExisting={(idx) => setDetailExistingImg(prev => prev.filter((_, i) => i !== idx))}
                                onRemoveNew={(idx) => setDetailNewFiles(prev => prev.filter((_, i) => i !== idx))}
                            />
                        </div>
                    </div>

                    {/* Section 3: Technical Review */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full ring-1 ring-slate-50">
                        <SectionHeader icon={LucideSettings} title="3. Technical Review" subtitle="Specifications and key data points" color="text-slate-700" />

                        <div className="space-y-6 flex-1">
                            <div>
                                <InputLabel icon={LucideTable} label="Main Heading" />
                                <input placeholder="Technical Overview" value={techData.title} onChange={(e) => setTechData({ ...techData, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#176FC0] outline-none" />
                            </div>

                            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
                                <div>
                                    <InputLabel icon={LucideAlignLeft} label="Brief Description" />
                                    <textarea placeholder="Write a technical summary..." rows={3} value={techData.mainText} onChange={(e) => setTechData({ ...techData, mainText: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:border-[#176FC0] outline-none"></textarea>
                                </div>
                                <div>
                                    <InputLabel icon={LucideList} label="Key Highlights" />
                                    <textarea placeholder="• Aerodynamic Excellence&#10;• Ultra-Lightweight Material" rows={3} value={techData.highlights} onChange={(e) => setTechData({ ...techData, highlights: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:border-[#176FC0] outline-none"></textarea>
                                </div>
                            </div>

                            <div>
                                <InputLabel icon={LucideLayers} label="Technical Specification Sheet" />
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {techData.specifications.map((spec, i) => (
                                        <div key={i} className="flex items-center gap-2 group">
                                            <div className="flex-1 grid grid-cols-2 gap-2">
                                                <input placeholder="Key" value={spec.key} onChange={e => handleSpecChange(i, 'key', e.target.value)} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs font-bold outline-none focus:border-slate-400" />
                                                <input placeholder="Value" value={spec.value} onChange={e => handleSpecChange(i, 'value', e.target.value)} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs outline-none focus:border-slate-400" />
                                            </div>
                                            <button onClick={() => removeSpecField(i)} className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><LucideTrash2 size={14} /></button>
                                        </div>
                                    ))}
                                    <button onClick={addSpecField} className="w-full py-2 border-2 border-dashed border-slate-100 rounded-xl text-[10px] font-bold text-slate-400 hover:text-[#176FC0] hover:border-blue-100 transition-all uppercase tracking-widest">+ Add Specification</button>
                                </div>
                            </div>

                            <ImageUploadGrid
                                label="Technical Static Media (Desktop Right)"
                                images={techExistingImg}
                                newFiles={techNewFiles}
                                onFileChange={handleFileChange(setTechNewFiles)}
                                onRemoveExisting={(idx) => setTechExistingImg(prev => prev.filter((_, i) => i !== idx))}
                                onRemoveNew={(idx) => setTechNewFiles(prev => prev.filter((_, i) => i !== idx))}
                            />
                        </div>
                    </div>

                </div>
            ) : (
                <div className="py-32 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 border-dashed">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                        <LucideLayoutTemplate size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">No Category Selected</h3>
                    <p className="text-slate-400 mt-2 text-sm max-w-sm text-center">Select a category from the dropdown above to manage its visuals across all three sections.</p>
                </div>
            )}
        </div>
    );
};

export default function AppearancePage() {
    const [activeTab, setActiveTab] = useState('hero');

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-10 font-sans selection:bg-blue-100">
            <header className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white border border-slate-200 rounded-[2rem] flex items-center justify-center shadow-sm -rotate-6 group hover:rotate-0 transition-transform duration-500">
                        <LucideImageIcon className="w-8 h-8 text-[#176FC0]" />
                    </div>
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Appearance</h1>
                        <p className="text-slate-500 text-sm mt-1 font-medium italic">Transform your website&apos;s visual identity and category experience.</p>
                    </div>
                </div>
                <div className="bg-white/50 backdrop-blur-md p-2 rounded-[1.5rem] border border-slate-200 shadow-sm flex gap-2 overflow-x-auto self-start lg:self-auto no-scrollbar">
                    <TabButton active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} icon={LucideLayoutTemplate}>Homepage Hero</TabButton>
                    <TabButton active={activeTab === 'category'} onClick={() => setActiveTab('category')} icon={LucideLayers}>Category Visuals</TabButton>
                </div>
            </header>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                {activeTab === 'hero' && <HeroSliderManager />}
                {activeTab === 'category' && <CategoryVisualsManager />}
            </div>

        </div>
    );
}