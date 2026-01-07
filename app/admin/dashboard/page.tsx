"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchDashboardStats } from '@/lib/redux/adminSlice';
import {
  MoreVertical, DollarSign, ArrowUpRight, ArrowDownRight,
  ShoppingCart, Users, ChevronDown, Loader2, BarChart3, Package
} from 'lucide-react';

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'Shipped': return 'bg-blue-50 text-blue-700 border border-blue-200';
        case 'Processing': return 'bg-amber-50 text-amber-700 border border-amber-200';
        case 'Pending': return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
        case 'Delivered': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
        case 'Cancelled': return 'bg-red-50 text-red-700 border border-red-200';
        default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
};

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    Icon: React.ElementType;
}

const StatsCard = ({ title, value, change, Icon }: StatsCardProps) => {
    const isUp = parseFloat(change) >= 0;
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <p className="text-sm font-semibold text-slate-500">{title}</p>
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mt-2">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${isUp ? 'bg-blue-50' : 'bg-red-50'}`}>
                    <Icon className={`w-6 h-6 ${isUp ? 'text-[#176FC0]' : 'text-red-500'}`} />
                </div>
            </div>
            <div className="flex items-center mt-4 gap-2">
                <span className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {change}%
                </span>
                <span className="text-xs text-slate-400 font-medium">vs yesterday</span>
            </div>
        </div>
    );
};

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { dashboardStats, recentOrders, status } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);
  
  const statsCards = dashboardStats ? [
    { title: "Today's Revenue", value: `$${dashboardStats.todayRevenue.value.toLocaleString('en-IN')}`, change: dashboardStats.todayRevenue.change, Icon: DollarSign },
    { title: "Today's Orders", value: dashboardStats.todayOrders.value.toString(), change: dashboardStats.todayOrders.change, Icon: ShoppingCart },
    { title: "New Customers", value: dashboardStats.newCustomers.value.toString(), change: dashboardStats.newCustomers.change, Icon: Users },
  ] : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        <header>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Welcome back! Here's a quick overview of your store today.</p>
        </header>

        {status === 'loading' && !dashboardStats ? (
            <div className="flex flex-col justify-center items-center h-96 w-full">
                <Loader2 className="w-10 h-10 animate-spin text-[#176FC0]" />
                <p className="text-slate-400 text-sm mt-3 font-medium">Loading dashboard data...</p>
            </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statsCards.map((card, index) => (
                <StatsCard key={index} title={card.title} value={card.value} change={card.change} Icon={card.Icon} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-800">Sales Analytics</h3>
                </div>
                
                <div className="h-72 w-full bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-3">
                    <div className="p-4 bg-white rounded-full shadow-sm">
                        <BarChart3 className="w-8 h-8 text-slate-300" />
                    </div>
                    <span className="text-sm font-medium">Chart Visualization Placeholder</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-800">Top Selling Products</h3>
                </div>
                <div className="h-72 w-full bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-3">
                     <div className="p-4 bg-white rounded-full shadow-sm">
                        <Package className="w-8 h-8 text-slate-300" />
                    </div>
                    <span className="text-sm font-medium">Top Products List Placeholder</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50">
                    <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="p-4 pl-6">Order ID</th>
                      <th className="p-4 hidden md:table-cell">Customer</th>
                      <th className="p-4 hidden lg:table-cell">Date</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="p-4 pl-6">
                            <span className="font-semibold text-slate-700">#{order.id.slice(-6)}</span>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                             <span className="text-sm font-medium text-slate-700">{order.customer}</span>
                        </td>
                        <td className="p-4 hidden lg:table-cell text-sm text-slate-500">{order.date}</td>
                        <td className="p-4 font-bold text-slate-800 text-sm">${order.amount.toLocaleString('en-IN')}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyles(order.status)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${order.status === 'Delivered' ? 'bg-emerald-500' : order.status === 'Pending' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                            <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </td>
                      </tr>
                    ))}
                    {recentOrders.length === 0 && (
                        <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-500">No recent orders found.</td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}