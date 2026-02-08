"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, Search, Check, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import mediaApi from "@/lib/api/media.api";
import toast from "react-hot-toast";

interface MediaPickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    multiple?: boolean; // Future support
}

interface MediaItem {
    url: string;
    associatedProducts: string[];
}

export default function MediaPickerModal({ isOpen, onClose, onSelect, multiple = false }: MediaPickerModalProps) {
    const [images, setImages] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDebounce, setSearchDebounce] = useState("");

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchDebounce(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Reset when modal opens
    useEffect(() => {
        if (isOpen) {
            setImages([]);
            setPage(1);
            setHasMore(true);
            fetchImages(1, searchDebounce, true);
        }
    }, [isOpen, searchDebounce]);

    const fetchImages = async (pageNum: number, search: string, reset: boolean = false) => {
        try {
            setLoading(true);
            const response = await mediaApi.getGallery(pageNum, 20, search);
            const newImages = response.data.images;
            const pagination = response.data.pagination;

            if (reset) {
                setImages(newImages);
            } else {
                setImages(prev => [...prev, ...newImages]);
            }

            setHasMore(pageNum < pagination.totalPages);
        } catch (error) {
            console.error("Failed to fetch media:", error);
            toast.error("Failed to load images");
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchImages(nextPage, searchDebounce);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden">
                <DialogHeader className="px-6 py-4 border-b border-slate-100">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-[#176FC0]" />
                        Media Library
                    </DialogTitle>
                    <DialogDescription>
                        Select an existing image from your products.
                    </DialogDescription>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search images by product name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#176FC0]"
                        />
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {images.length === 0 && !loading ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                            <p>No images found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {images.map((img, index) => (
                                <div
                                    key={`${img.url}-${index}`}
                                    onClick={() => {
                                        onSelect(img.url);
                                        onClose();
                                    }}
                                    className="group relative aspect-square bg-slate-100 rounded-lg overflow-hidden cursor-pointer border border-slate-200 hover:border-[#176FC0] transition-all hover:shadow-md"
                                >
                                    <Image
                                        src={img.url}
                                        alt="Gallery Item"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 50vw, 20vw"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Check className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-[10px] text-white truncate px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Used in {img.associatedProducts.length} products
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {loading && (
                        <div className="flex justify-center py-4">
                            <Loader2 className="w-6 h-6 animate-spin text-[#176FC0]" />
                        </div>
                    )}

                    {!loading && hasMore && images.length > 0 && (
                        <div className="flex justify-center py-4">
                            <button
                                onClick={loadMore}
                                className="text-sm font-medium text-[#176FC0] hover:underline"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
