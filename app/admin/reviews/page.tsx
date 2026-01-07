"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchAdminReviews, updateReviewStatus } from '@/lib/redux/reviewSlice';
import { Star, Check, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const getStatusClass = (status: string) => {
    switch(status) {
        case 'Approved': return 'bg-green-100 text-green-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-yellow-100 text-yellow-800';
    }
};

export default function ReviewsAdminPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { adminReviews, status } = useSelector((state: RootState) => state.reviews);
    
    useEffect(() => {
        dispatch(fetchAdminReviews());
    }, [dispatch]);

    const handleStatusUpdate = (id: string, newStatus: 'Approved' | 'Rejected') => {
        dispatch(updateReviewStatus({ id, status: newStatus }));
        toast.success(`Review ${newStatus.toLowerCase()}!`);
    };

    return (
        <div className="p-10">
            <header className="mb-8"><h1>Manage Reviews</h1><p>Approve or reject customer reviews.</p></header>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead><tr className="border-b"><th className="p-4">Customer</th><th className="p-4">Product</th><th className="p-4">Rating</th><th className="p-4">Review</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
                        <tbody>
                            {status === 'loading' ? (<tr><td colSpan={6} className='text-center p-8'><Loader2 className='animate-spin w-8 h-8 mx-auto'/></td></tr>) :
                            adminReviews.map((review: any) => (
                                <tr key={review._id} className="border-b">
                                    <td className="p-4">{review.user.fullName}</td>
                                    <td className="p-4">{review.part.name}</td>
                                    <td className="p-4 flex items-center">{[...Array(5)].map((_, i) => (<Star key={i} size={16} className={i < review.rating ? 'text-amber-400' : 'text-slate-300'} fill='currentColor'/>))}</td>
                                    <td className="p-4 max-w-sm truncate">{review.reviewText}</td>
                                    <td className="p-4"><span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusClass(review.status)}`}>{review.status}</span></td>
                                    <td className="p-4">
                                        {review.status === 'Pending' && (
                                            <div className="flex gap-2">
                                                <button onClick={() => handleStatusUpdate(review._id, 'Approved')} className="p-2 bg-green-100 text-green-600 rounded-full"><Check size={16}/></button>
                                                <button onClick={() => handleStatusUpdate(review._id, 'Rejected')} className="p-2 bg-red-100 text-red-600 rounded-full"><X size={16}/></button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}