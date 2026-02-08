"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Search, Copy, Image as ImageIcon, Check, UploadCloud } from "lucide-react";
import Image from "next/image";
import mediaApi from "@/lib/api/media.api";
import toast from "react-hot-toast";

interface MediaItem {
    url: string;
    associatedProducts: string[];
}

export default function MediaPage() {
    const [images, setImages] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDebounce, setSearchDebounce] = useState("");

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchDebounce(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch images when page or search changes
    useEffect(() => {
        fetchImages(page, searchDebounce);
    }, [page, searchDebounce]);

    const fetchImages = async (pageNum: number, search: string) => {
        try {
            setLoading(true);
            const response = await mediaApi.getGallery(pageNum, 24, search); // Higher limit for full page
            setImages(response.data.images);
            setTotalPages(response.data.pagination.totalPages);
        } catch (error) {
            console.error("Failed to fetch media:", error);
            toast.error("Failed to load images");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success("Image URL copied!");
    };

    const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        setUploadProgress(0);
        const toastId = toast.loading(`Starting upload of ${files.length} images...`);

        let successCount = 0;
        let failCount = 0;

        try {
            // Import API if not already available for signed URL generation
            // We need to use the product routes for this as per product.routes.js
            const { default: api } = await import('@/lib/api/axiosConfig');

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                try {
                    // 1. Get Signed URL
                    const { data: { signedUrl, imageUrl } } = await api.post('/admin/products/generate-upload-url', {
                        folder: 'gallery', // Use a generic gallery folder or organize by date?
                        contentType: file.type
                    });

                    // 2. Upload to S3
                    await fetch(signedUrl, {
                        method: 'PUT',
                        body: file,
                        headers: { 'Content-Type': file.type }
                    });

                    successCount++;
                    setUploadProgress(Math.round(((i + 1) / files.length) * 100));
                    toast.loading(`Uploading ${i + 1}/${files.length}...`, { id: toastId });

                } catch (error) {
                    console.error(`Failed to upload ${file.name}:`, error);
                    failCount++;
                }
            }

            if (successCount > 0) {
                toast.success(`Successfully uploaded ${successCount} images!`, { id: toastId });
                fetchImages(1, ""); // Refresh list
            } else {
                toast.error("Failed to upload images", { id: toastId });
            }

        } catch (error) {
            console.error("Bulk upload error:", error);
            toast.error("An error occurred during upload", { id: toastId });
        } finally {
            setUploading(false);
            setUploadProgress(0);
            e.target.value = ''; // Reset input
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
                    <p className="text-slate-500 text-sm mt-1">Browse and reuse images from your product catalog.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by product name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176FC0]/20 focus:border-[#176FC0] transition-all"
                        />
                    </div>

                    {/* Upload Button */}
                    <div className="relative">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleBulkUpload}
                            disabled={uploading}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                        />
                        <button
                            disabled={uploading}
                            className={`flex items-center gap-2 bg-[#176FC0] text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all whitespace-nowrap ${uploading ? 'opacity-70' : ''}`}
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {uploadProgress}%
                                </>
                            ) : (
                                <>
                                    <UploadCloud className="w-4 h-4" />
                                    Upload New
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 min-h-[60vh] p-6 shadow-sm">
                {loading && images.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-[#176FC0]" />
                    </div>
                ) : images.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                        <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                        <p className="text-lg font-medium">No images found</p>
                        <p className="text-sm">Try adjusting your search query.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                            {images.map((img, index) => (
                                <div
                                    key={`${img.url}-${index}`}
                                    className="group relative aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-100 hover:border-[#176FC0] hover:shadow-lg transition-all"
                                >
                                    <Image
                                        src={img.url}
                                        alt="Gallery Item"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 50vw, 20vw"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                        <button
                                            onClick={() => copyToClipboard(img.url)}
                                            className="p-3 bg-white text-[#176FC0] rounded-full hover:scale-110 transition-transform flex items-center gap-2 px-6 font-bold text-sm shadow-xl"
                                        >
                                            <Copy className="w-4 h-4" />
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-8 pt-6 border-t border-slate-100">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-slate-50 transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="text-sm font-medium text-slate-600">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-slate-50 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
