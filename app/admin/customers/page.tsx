"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchCustomers, updateCustomer, deleteCustomer } from '@/lib/redux/adminSlice';
import { Users, Search, MoreHorizontal, Trash2, Mail, Loader2, X, User as UserIcon, MapPin, Phone, Shield, Calendar, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

function debounce(func: (...args: any[]) => void, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => { func(...args); }, delay);
    };
}

const CustomerDetailPanel = ({ customer, onClose }: { customer: any, onClose: () => void }) => {
    if (!customer) return null;
    return (
        <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-[60] flex flex-col h-full border-l border-slate-200 transition-all duration-300">
            <header className="relative bg-slate-50 border-b border-slate-200 p-6 pt-10 pb-8 flex flex-col items-center">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-5 h-5"/>
                </button>
                
                <div className="w-24 h-24 rounded-full p-1 bg-white border border-slate-200 shadow-sm mb-4">
                    <Image 
                        src={customer.avatar || '/placeholder.png'} 
                        alt={customer.fullName} 
                        width={96} 
                        height={96} 
                        className="w-full h-full rounded-full object-cover" 
                    />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 text-center px-4">{customer.fullName}</h2>
                <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-bold border ${customer.active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {customer.active ? 'Active Account' : 'Inactive'}
                    </span>
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3"/> {new Date(customer.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </header>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white custom-scrollbar">
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <UserIcon className="w-3 h-3" /> Personal Info
                    </h3>
                    <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500">
                                <Mail className="w-4 h-4"/>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs text-slate-500 font-medium">Email</p>
                                <p className="text-sm font-semibold text-slate-800 break-all">{customer.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500">
                                <Phone className="w-4 h-4"/>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Phone</p>
                                <p className="text-sm font-semibold text-slate-800">{customer.mobile || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Address Book
                    </h3>
                    {(customer.addresses?.length ?? 0) > 0 ? (
                        <div className="space-y-3">
                            {customer.addresses.map((addr: any) => (
                                <div key={addr._id} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-[#176FC0] transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-slate-700 text-sm flex items-center gap-2">
                                            {addr.label || 'Address'}
                                            {addr.isDefault && <span className="px-1.5 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 text-[10px] rounded font-bold uppercase">Default</span>}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {addr.fullName}<br/>
                                        {addr.street}<br/>
                                        {addr.city}, {addr.state} - {addr.zipCode}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-6 border-2 border-dashed border-slate-200 rounded-xl">
                            <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2"/>
                            <p className="text-sm text-slate-500">No addresses saved yet.</p>
                        </div>
                    )}
                </div>
            </div>

            <footer className="p-4 md:p-6 border-t border-slate-100 bg-slate-50/50">
                <button className="w-full bg-white border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4"/> Contact Customer
                </button>
            </footer>
        </div>
    );
};

export default function CustomersPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { customers, status } = useSelector((state: RootState) => state.admin);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedFetch = useCallback(debounce((search: string) => {
        dispatch(fetchCustomers({ search, limit: 1000 }));
    }, 500), [dispatch]);

    useEffect(() => {
        dispatch(fetchCustomers({ limit: 1000 }));
    }, [dispatch]);

    useEffect(() => {
        debouncedFetch(searchTerm);
    }, [searchTerm, debouncedFetch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdown && !(event.target as Element).closest('.dropdown-container')) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openDropdown]);

    const handleStatusToggle = (customer: any) => {
        const newStatus = !customer.active;
        toast.promise(
            dispatch(updateCustomer({ id: customer._id, data: { active: newStatus } })).unwrap(),
            {
                loading: 'Updating status...',
                success: newStatus ? 'Customer activated!' : 'Customer deactivated!',
                error: 'Failed to update status.',
            }
        );
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            toast.promise(
                dispatch(deleteCustomer(id)).unwrap(),
                {
                    loading: 'Deleting...',
                    success: 'Deleted successfully!',
                    error: 'Failed to delete.',
                }
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <Users className="w-6 h-6 text-[#176FC0]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Customers</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Manage user accounts and details.</p>
                    </div>
                </div>
            </header>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search customers..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-[#176FC0] outline-none" 
                        />
                    </div>
                    <div className="text-sm font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
                        <span className="text-[#176FC0] font-bold">{customers.length}</span> Total
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-4 pl-6 text-xs font-bold text-slate-500 uppercase">Customer Profile</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Joined Date</th>
                                <th className="p-4 text-center text-xs font-bold text-slate-500 uppercase">Status</th>
                                <th className="p-4 pr-6 text-center text-xs font-bold text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {status === 'loading' && customers.length === 0 ? (
                                <tr><td colSpan={4} className="text-center p-12"><Loader2 className="w-8 h-8 animate-spin mx-auto text-[#176FC0]" /></td></tr>
                            ) : customers.map(customer => (
                                <tr key={customer._id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative flex-shrink-0">
                                                <Image 
                                                    src={customer.avatar || '/placeholder.png'} 
                                                    alt={customer.fullName} 
                                                    width={40} 
                                                    height={40} 
                                                    className="w-10 h-10 rounded-full object-cover border border-slate-200" 
                                                />
                                                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${customer.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-slate-800 text-sm truncate">{customer.fullName}</p>
                                                <p className="text-xs text-slate-500 truncate">{customer.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">
                                        {new Date(customer.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => handleStatusToggle(customer)}
                                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${customer.active ? 'bg-[#176FC0]' : 'bg-slate-200'}`}
                                        >
                                            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${customer.active ? 'translate-x-5' : 'translate-x-1'}`} />
                                        </button>
                                    </td>
                                    <td className="p-4 pr-6 text-center">
                                        <div className="relative inline-block dropdown-container">
                                            <button 
                                                onClick={() => setOpenDropdown(openDropdown === customer._id ? null : customer._id)}
                                                className="p-2 text-slate-400 hover:text-slate-600"
                                            >
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                            {openDropdown === customer._id && (
                                                <div className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-xl z-50 border border-slate-100 p-1">
                                                    <button onClick={() => { setSelectedCustomer(customer); setOpenDropdown(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                                                        <ExternalLink className="w-4 h-4 text-[#176FC0]"/> View Profile
                                                    </button>
                                                    <button onClick={() => { handleDelete(customer._id); setOpenDropdown(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                                                        <Trash2 className="w-4 h-4"/> Delete User
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedCustomer && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity" 
                    onClick={() => setSelectedCustomer(null)}
                />
            )}
            
            <aside className={`fixed inset-y-0 right-0 z-[60] transform transition-transform duration-300 ease-in-out ${selectedCustomer ? 'translate-x-0' : 'translate-x-full'} w-full md:w-auto`}>
                <CustomerDetailPanel customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
            </aside>
        </div>
    );
}