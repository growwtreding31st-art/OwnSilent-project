"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchEnquiries, replyToEnquiry } from '@/lib/redux/enquirySlice';
import { 
    MessageSquare, Loader2, Send, X, User, Mail, Phone, MapPin, 
    Wrench, LifeBuoy, Search, ChevronDown, Calendar, ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'New': return 'bg-blue-50 text-blue-700 border border-blue-200';
        case 'Replied': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
        case 'In Progress': return 'bg-amber-50 text-amber-700 border border-amber-200';
        case 'Closed': return 'bg-slate-50 text-slate-700 border border-slate-200';
        default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
};

const EnquiryDetailPanel = ({ enquiry, onClose, onReply }: { enquiry: any, onClose: () => void, onReply: (id: string, message: string) => void }) => {
    if (!enquiry) {
        return null;
    }

    const [replyMessage, setReplyMessage] = useState('');
    const { status } = useSelector((state: RootState) => state.enquiry);

    const handleReply = () => {
        if (!replyMessage.trim()) return toast.error('Reply message cannot be empty.');
        onReply(enquiry._id, replyMessage);
        setReplyMessage('');
    };

    return (
        <div className="fixed inset-y-0 right-0 w-full md:w-[520px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col h-full border-l border-slate-200">
            <header className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">{enquiry.enquiryType}</h2>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">from <span className="text-slate-700 font-semibold">{enquiry.fullName}</span></p>
                </div>
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </header>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Customer Details</h3>
                    <div className="space-y-3 text-sm">
                       <div className="flex items-center gap-3">
                           <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 shrink-0">
                               {enquiry.fullName.charAt(0)}
                           </div>
                           <div>
                               <p className="font-semibold text-slate-900">{enquiry.fullName}</p>
                               <p className="text-slate-500 flex items-center gap-1.5 mt-0.5"><Mail size={12}/> {enquiry.email}</p>
                           </div>
                       </div>
                       {enquiry.phone && (
                            <div className="flex items-center gap-2 pt-2 border-t border-slate-200 mt-2 text-slate-600">
                                <Phone size={12}/> {enquiry.phone}
                            </div>
                       )}
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Enquiry Details</h3>
                     {enquiry.enquiryType === 'Part Request' && (
                        <div className="space-y-3 text-sm text-slate-700">
                            <p className="flex items-center gap-2"><Wrench size={14} className="text-[#176FC0]"/><strong>Part:</strong> {enquiry.partName}</p>
                            <p className="flex items-center gap-2"><strong>Vehicle:</strong> {enquiry.carBrand} {enquiry.carModel} ({enquiry.carYear})</p>
                            <p className="flex items-start gap-2 pt-2 border-t border-slate-200 mt-2"><MapPin size={14} className="text-[#176FC0] mt-0.5 shrink-0"/>{enquiry.shippingAddress.street}, {enquiry.shippingAddress.city}, {enquiry.shippingAddress.state} - {enquiry.shippingAddress.zipCode}</p>
                        </div>
                    )}
                    {enquiry.enquiryType === 'Support Ticket' && (
                        <div className="text-sm text-slate-700"><strong>Subject:</strong> {enquiry.subject}</div>
                    )}
                </div>

                <div className="p-4 rounded-xl border-2 border-dashed border-slate-200">
                    <h4 className='text-xs font-bold text-slate-400 uppercase mb-2'>Customer's Message</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">{enquiry.message}</p>
                </div>
                
                <div className="space-y-4">
                    <h4 className='font-semibold text-slate-800 pt-4 border-t border-slate-100'>Conversation History</h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                        {enquiry.replies.length > 0 ? enquiry.replies.map((reply: any) => (
                            <div key={reply._id} className='bg-blue-50 p-3 rounded-xl border border-blue-100'>
                                <p className='font-bold text-sm text-blue-900'>Admin Replied
                                    <span className='font-medium text-xs text-slate-500 ml-2'>{new Date(reply.createdAt).toLocaleString()}</span>
                                </p>
                                <p className="text-sm text-slate-800 mt-1">{reply.message}</p>
                            </div>
                        )) : (
                            <p className="text-sm text-slate-400 text-center py-4">No replies yet.</p>
                        )}
                    </div>
                </div>

                <div className='border-t border-slate-100 pt-6'>
                    <h4 className='font-semibold text-slate-800 mb-2'>Send New Reply</h4>
                    <textarea 
                        rows={5} 
                        value={replyMessage} 
                        onChange={(e) => setReplyMessage(e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all"
                        placeholder="Type your response here..."
                    />
                </div>
            </div>
            <footer className="p-6 border-t border-slate-100 bg-slate-50/50">
                <button 
                    onClick={handleReply} 
                    disabled={status === 'loading'} 
                    className="w-full flex justify-center items-center gap-2 bg-[#176FC0] text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70"
                >
                    {status === 'loading' ? <Loader2 className="animate-spin w-5 h-5" /> : <><Send size={16}/> Send Reply</>}
                </button>
            </footer>
        </div>
    );
};

export default function EnquiriesPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { enquiries, status } = useSelector((state: RootState) => state.enquiry);
    const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        dispatch(fetchEnquiries());
    }, [dispatch]);

    const handleReply = (id: string, message: string) => {
        dispatch(replyToEnquiry({ id, message })).unwrap().then((updatedEnquiry) => {
            toast.success('Reply sent successfully!');
            setSelectedEnquiry(updatedEnquiry);
        }).catch((err) => toast.error(err || 'Failed to send reply.'));
    };
    
    const filteredEnquiries = enquiries.filter(e => filter ? e.status === filter : true);

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans relative">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <MessageSquare className="w-6 h-6 text-[#176FC0]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Customer Enquiries</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Manage support tickets and part requests.</p>
                    </div>
                </div>
            </header>
            
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
                     <div className="relative w-full sm:w-48">
                        <select 
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer text-slate-600 font-medium"
                        >
                            <option value="">All Statuses</option>
                            <option value="New">New</option>
                            <option value="Replied">Replied</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-4 pl-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Subject / Part</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="p-4 pr-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {status === 'loading' && enquiries.length === 0 ? (
                                <tr><td colSpan={5} className="text-center p-12"><Loader2 className="w-8 h-8 animate-spin mx-auto text-[#176FC0]"/></td></tr>
                            ) : filteredEnquiries.map(enquiry => (
                                <tr key={enquiry._id} onClick={() => setSelectedEnquiry(enquiry)} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                                    <td className="p-4 pl-6">
                                        <p className="font-semibold text-slate-800 text-sm">{enquiry.fullName}</p>
                                        <p className="text-xs text-slate-500">{enquiry.email}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border ${enquiry.enquiryType === 'Part Request' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                                            {enquiry.enquiryType === 'Part Request' ? <Wrench size={12}/> : <LifeBuoy size={12}/>}
                                            {enquiry.enquiryType}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm font-medium text-slate-700 truncate max-w-xs">{enquiry.partName || enquiry.subject}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Calendar className="w-4 h-4 text-slate-400"/>
                                            {new Date(enquiry.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-4 pr-6">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyles(enquiry.status)}`}>{enquiry.status}</span>
                                    </td>
                                </tr>
                            ))}
                             {filteredEnquiries.length === 0 && status !== 'loading' && (
                                <tr>
                                    <td colSpan={5} className="text-center p-12 text-slate-500">
                                        No enquiries found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {selectedEnquiry && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300" 
                    onClick={() => setSelectedEnquiry(null)}
                ></div>
            )}
            
            <div className={`fixed inset-y-0 right-0 z-50 pointer-events-none ${selectedEnquiry ? '' : 'overflow-hidden'}`}>
                 <div className={`h-full pointer-events-auto transform transition-transform duration-300 ease-in-out ${selectedEnquiry ? 'translate-x-0' : 'translate-x-full'}`}>
                    <EnquiryDetailPanel enquiry={selectedEnquiry} onClose={() => setSelectedEnquiry(null)} onReply={handleReply} />
                 </div>
            </div>
        </div>
    );
}