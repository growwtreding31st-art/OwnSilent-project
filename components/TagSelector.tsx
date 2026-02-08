'use client';

import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import cmsApi from '@/lib/api/cms.api';

interface Tag {
    _id: string;
    name: string;
    type: string;
    slug: string;
}

interface TagSelectorProps {
    selectedTags: string[]; // Array of tag IDs
    onChange: (tagIds: string[]) => void;
    tagType?: string; // Filter by tag type (optional)
    label?: string;
    placeholder?: string;
}

export default function TagSelector({ selectedTags, onChange, tagType, label = 'Tags', placeholder = 'Search tags...' }: TagSelectorProps) {
    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTags();
    }, [tagType]);

    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await cmsApi.tags.getAll({ type: tagType, limit: 100 });
            setAvailableTags(response.data.tags || []);
        } catch (error) {
            console.error('Failed to fetch tags:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredTags = availableTags.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedTags.includes(tag._id)
    );

    const selectedTagObjects = availableTags.filter(tag => selectedTags.includes(tag._id));

    const handleAddTag = (tagId: string) => {
        onChange([...selectedTags, tagId]);
        setSearchTerm('');
        setShowDropdown(false);
    };

    const handleRemoveTag = (tagId: string) => {
        onChange(selectedTags.filter(id => id !== tagId));
    };

    return (
        <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>

            {/* Selected Tags */}
            {selectedTagObjects.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {selectedTagObjects.map(tag => (
                        <span
                            key={tag._id}
                            className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {tag.name}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag._id)}
                                className="hover:bg-blue-200 rounded-full p-0.5"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder={placeholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0]"
                />

                {/* Dropdown */}
                {showDropdown && filteredTags.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredTags.map(tag => (
                            <button
                                key={tag._id}
                                type="button"
                                onClick={() => handleAddTag(tag._id)}
                                className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between group"
                            >
                                <span className="text-sm text-slate-900">{tag.name}</span>
                                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{tag.type}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Close dropdown when clicking outside */}
            {showDropdown && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </div>
    );
}
