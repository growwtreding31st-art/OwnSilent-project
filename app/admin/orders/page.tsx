"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchAdminOrders, updateOrderStatus } from '@/lib/redux/orderSlice';
import { 
    ShoppingCart, Search, ChevronDown, X, User, MapPin, Mail, 
    Loader2, Calendar, DollarSign, Package, CheckCircle2, Clock, Truck, AlertCircle
} from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'Shipped': return 'bg-blue-50 text-blue-700 border border-blue-200';
        case 'Processing': return 'bg-purple-50 text-purple-700 border border-purple-200';
        case 'Pending': return 'bg-amber-50 text-amber-700 border border-amber-200';
        case 'Confirmed': return 'bg-teal-50 text-teal-700 border border-teal-200';
        case 'Delivered': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
        case 'Cancelled': return 'bg-red-50 text-red-700 border border-red-200';
        default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Delivered': return <CheckCircle2 className="w-4 h-4 mr-1.5" />;
        case 'Shipped': return <Truck className="w-4 h-4 mr-1.5" />;
        case 'Cancelled': return <AlertCircle className="w-4 h-4 mr-1.5" />;
        default: return <Clock className="w-4 h-4 mr-1.5" />;
    }
};

const OrderDetailPanel = ({ order, onClose, onStatusChange }: { order: any, onClose: () => void, onStatusChange: (orderId: string, status: string) => void }) => {
    if (!order) return null;
    const [currentStatus, setCurrentStatus] = useState(order.status);
    
    const handleSave = () => {
        if (currentStatus === order.status) {
            toast('No changes made to status.');
            return;
        }
        onStatusChange(order._id, currentStatus);
    };

    return (
        <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col h-full border-l border-slate-200">
            <header className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Order Details</h2>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">ID: <span className="font-mono text-slate-700">#{order.orderId}</span></p>
                </div>
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </header>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4 text-[#176FC0]"/> Customer Information
                    </h3>
                    <div className="space-y-3 text-sm">
                       <div className="flex items-start gap-3">
                           <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 shrink-0">
                               {order.user?.fullName?.charAt(0) || 'U'}
                           </div>
                           <div>
                               <p className="font-semibold text-slate-900">{order.user?.fullName || 'Unknown User'}</p>
                               <p className="text-slate-500 flex items-center gap-1.5 mt-0.5"><Mail size={12}/> {order.user?.email || 'No Email'}</p>
                           </div>
                       </div>
                       <div className="pt-2 border-t border-slate-200 mt-2">
                           <p className="text-slate-500 mb-1 flex items-center gap-1.5"><MapPin size={12}/> Shipping Address</p>
                           <p className="font-medium text-slate-800 pl-4 border-l-2 border-slate-300">
                               {order.shippingAddress?.street}<br/>
                               {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zipCode}
                           </p>
                       </div>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <Package className="w-4 h-4 text-[#176FC0]"/> Order Summary
                        </h3>
                        <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-lg">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                    </div>
                    <div className="p-5 space-y-5">
                       <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-slate-600">Order Status</label> 
                            <div className="relative">
                                <select 
                                    value={currentStatus} 
                                    onChange={(e) => setCurrentStatus(e.target.value)} 
                                    className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-sm font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 ${getStatusStyles(currentStatus).replace('bg-', 'bg-white ').replace('text-', 'text-slate-800 ')}`}
                                    style={{ borderColor: 'currentColor' }}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"/>
                            </div>
                       </div>

                       <div className="space-y-3 pt-4 border-t border-slate-100">
                           {order.items?.map((item: any, idx: number) => (
                               <div key={idx} className="flex justify-between text-sm">
                                   <span className="text-slate-600 font-medium flex gap-2">
                                       <span className="text-slate-400">x{item.quantity}</span> 
                                       {item.product?.name || 'Product Item'}
                                   </span>
                                   <span className="font-semibold text-slate-900">${((item.price || 0) * (item.quantity || 0)).toLocaleString()}</span>
                               </div>
                           ))}
                           {(!order.items || order.items.length === 0) && (
                               <p className="text-sm text-slate-400 italic">Item details not available</p>
                           )}
                       </div>
                       
                       <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                           <span className="font-bold text-slate-700">Total Amount</span>
                           <span className="text-xl font-extrabold text-[#176FC0] flex items-center">
                               <DollarSign className="w-5 h-5" strokeWidth={2.5}/>
                               {(order.totalAmount || 0).toLocaleString('en-IN')}
                           </span>
                       </div>
                    </div>
                </div>
            </div>

            <footer className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-3">
                <button 
                    onClick={handleSave} 
                    className="w-full bg-[#176FC0] text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <CheckCircle2 className="w-5 h-5" /> Update Order Status
                </button>
                <button 
                    onClick={onClose}
                    className="w-full bg-white border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                    Close Details
                </button>
            </footer>
        </div>
    );
};

export default function OrdersPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { adminOrders, status } = useSelector((state: RootState) => state.orders);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        dispatch(fetchAdminOrders({}));
    }, [dispatch]);

    const handleStatusChange = (orderId: string, newStatus: string) => {
        toast.promise(
            dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap(),
            {
                loading: 'Updating order status...',
                success: 'Order status updated successfully!',
                error: 'Failed to update status.'
            }
        ).then(() => setSelectedOrder(null));
    };

    const filteredOrders = adminOrders.filter(order => {
        const matchesSearch = (order.orderId?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                              (order.user?.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter ? order.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans relative">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <ShoppingCart className="w-6 h-6 text-[#176FC0]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Orders</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Manage and track customer purchases.</p>
                    </div>
                </div>
            </header>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
                    <div className="relative w-full sm:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#176FC0] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search by Order ID or Customer Name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all" 
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-48">
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer text-slate-600 font-medium"
                            >
                                <option value="">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-4 pl-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 pr-6 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {status === 'loading' && adminOrders.length === 0 ? (
                                <tr><td colSpan={6} className="text-center p-12"><Loader2 className="w-8 h-8 animate-spin mx-auto text-[#176FC0]" /></td></tr>
                            ) : filteredOrders.map(order => (
                                <tr 
                                    key={order._id} 
                                    onClick={() => setSelectedOrder(order)} 
                                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                                >
                                    <td className="p-4 pl-6">
                                        <span className="font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded text-sm">
                                            #{order.orderId}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                {order.user?.fullName?.charAt(0) || 'U'}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-800 text-sm">{order.user?.fullName || 'Guest'}</span>
                                                <span className="text-xs text-slate-500">{order.user?.email || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Calendar className="w-4 h-4 text-slate-400"/>
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-bold text-slate-800 text-sm">${(order.totalAmount || 0).toLocaleString('en-IN')}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyles(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <button className="text-sm font-semibold text-[#176FC0] hover:text-blue-700 hover:underline">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredOrders.length === 0 && status !== 'loading' && (
                                <tr>
                                    <td colSpan={6} className="text-center p-12 text-slate-500">
                                        No orders found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                <div className="p-4 border-t border-slate-100 bg-slate-50/30 text-xs text-slate-500 text-center font-medium">
                    Showing {filteredOrders.length} orders
                </div>
            </div>

            {selectedOrder && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300" 
                    onClick={() => setSelectedOrder(null)}
                ></div>
            )}
            
            <div className={`fixed inset-y-0 right-0 z-50 pointer-events-none ${selectedOrder ? '' : 'overflow-hidden'}`}>
                 <div className={`h-full pointer-events-auto transform transition-transform duration-300 ease-in-out ${selectedOrder ? 'translate-x-0' : 'translate-x-full'}`}>
                    <OrderDetailPanel order={selectedOrder} onClose={() => setSelectedOrder(null)} onStatusChange={handleStatusChange} />
                 </div>
            </div>
        </div>
    );
}
