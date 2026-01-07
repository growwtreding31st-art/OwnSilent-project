"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchPublicBrands, fetchPublicModelsByBrand, clearModels } from '@/lib/redux/productSlice';
import { ChevronDown, ChevronRight, RotateCcw, Loader2 } from 'lucide-react';

interface SelectOption {
    _id: string;
    name: string;
    year?: number;
}

interface CustomSelectProps {
    label: string;
    placeholder: string;
    options: SelectOption[];
    value: string | null;
    onChange: (value: string) => void;
    disabled?: boolean;
    loading?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, placeholder, options, value, onChange, disabled = false, loading = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find(option => option._id === value);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={selectRef}>
            <label className="text-sm font-semibold text-slate-600 ml-1 mb-1 block">{label}</label>
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className="w-full flex items-center justify-between bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors disabled:bg-slate-200/70 disabled:cursor-not-allowed"
            >
                <span className={selectedOption ? 'text-slate-800 font-medium' : 'text-slate-500'}>
                    {selectedOption ? selectedOption.name : placeholder}
                </span>
                {loading ? (
                    <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                ) : (
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
                )}
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <ul>
                        {options.map(option => (
                            <li
                                key={option._id}
                                onClick={() => handleSelect(option._id)}
                                className={`px-4 py-2 cursor-pointer hover:bg-amber-50 ${value === option._id ? 'bg-amber-100 font-semibold' : ''}`}
                            >
                                {option.name} {option.year && `(${option.year})`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


interface VehicleFilterProps {
    onBrandChange: (brandId: string) => void;
    onModelChange: (modelId: string) => void;
    onReset: () => void;
}

export default function VehicleFilter({ onBrandChange, onModelChange, onReset }: VehicleFilterProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { brands, models, status: productStatus } = useSelector((state: RootState) => state.products);

    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchPublicBrands());
    }, [dispatch]);

    useEffect(() => {
        if (selectedBrand) {
            dispatch(fetchPublicModelsByBrand(selectedBrand));
        } else {
            dispatch(clearModels());
        }
    }, [dispatch, selectedBrand]);

    const handleBrandChangeInternal = (brandId: string) => {
        setSelectedBrand(brandId);
        setSelectedModel(null);
        onBrandChange(brandId);
        onModelChange('');
    };
    
    const handleModelChangeInternal = (modelId: string) => {
        setSelectedModel(modelId);
        onModelChange(modelId);
    };

    const handleResetInternal = () => {
        setSelectedBrand(null);
        setSelectedModel(null);
        onReset();
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-x-6 gap-y-4 items-end">
                <div className="lg:col-span-4">
                    <CustomSelect
                        label="Step 1: Brand"
                        placeholder="Select a Brand"
                        options={brands}
                        value={selectedBrand}
                        onChange={handleBrandChangeInternal}
                    />
                </div>

                <div className="hidden lg:flex justify-center lg:col-span-1">
                    <ChevronRight className="w-6 h-6 text-slate-300" />
                </div>
                
                <div className="lg:col-span-4">
                    <CustomSelect
                        label="Step 2: Model"
                        placeholder={selectedBrand ? (models.length > 0 ? 'Select a Model' : 'No models available') : 'Select a brand first'}
                        options={models}
                        value={selectedModel}
                        onChange={handleModelChangeInternal}
                        disabled={!selectedBrand || (models.length === 0 && productStatus !== 'loading')}
                        loading={productStatus === 'loading' && selectedBrand !== null}
                    />
                </div>

                <div className="md:col-span-2 lg:col-span-9 w-full flex justify-end mt-4">
                    <button
                        onClick={handleResetInternal}
                        className="flex items-center justify-center gap-2 bg-slate-100 text-slate-600 font-semibold rounded-lg px-4 py-3 h-[46px] hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
                        title="Reset selections"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset</span>
                    </button>
                </div>
            </div>
        </div>
    );
}