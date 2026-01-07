import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface AdminState {
  customers: any[];
  totalCustomers: number;
  totalPages: number;
  currentPage: number;
  dashboardStats: any | null;
  recentOrders: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AdminState = {
  customers: [],
  totalCustomers: 0,
  totalPages: 1,
  currentPage: 1,
  dashboardStats: null,
  recentOrders: [],
  status: 'idle',
  error: null,
};

export const fetchDashboardStats = createAsyncThunk('admin/fetchDashboardStats', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats');
  }
});

export const fetchCustomers = createAsyncThunk('admin/fetchCustomers', async (params: { page?: number; limit?: number; search?: string } = {}, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/customers', { params });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch customers');
  }
});

export const updateCustomer = createAsyncThunk('admin/updateCustomer', async ({ id, data }: { id: string, data: any }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/admin/customers/${id}`, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update customer');
  }
});

export const deleteCustomer = createAsyncThunk('admin/deleteCustomer', async (id: string, { rejectWithValue }) => {
  try {
    await api.delete(`/admin/customers/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete customer');
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.dashboardStats = action.payload.stats;
        state.recentOrders = action.payload.recentOrders;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.customers = action.payload.customers;
        state.totalCustomers = action.payload.totalCustomers;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateCustomer.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.customers.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      .addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<string>) => {
        state.customers = state.customers.filter(c => c._id !== action.payload);
        state.totalCustomers -= 1;
      });
  },
});

export default adminSlice.reducer;