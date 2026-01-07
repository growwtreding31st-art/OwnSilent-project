import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface OrderState {
  orders: any[];
  currentOrder: any | null;
  adminOrders: any[];
  totalPages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  adminOrders: [],
  totalPages: 1,
  status: 'idle',
  error: null,
};

export const placeOrder = createAsyncThunk('orders/placeOrder', async (addressId: string, { rejectWithValue }) => {
  try {
    const response = await api.post('/orders', { addressId });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const fetchMyOrders = createAsyncThunk('orders/fetchMyOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (orderId: string, { rejectWithValue }) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
    }
});

export const fetchAdminOrders = createAsyncThunk('orders/fetchAdminOrders', async (filters: any = {}, { rejectWithValue }) => {
  try {
    const response = await api.get('/orders/admin/all', { params: filters });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ orderId, status }: { orderId: string, status: string }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/orders/admin/${orderId}/status`, { status });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});


const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload.order);
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
          state.currentOrder = action.payload;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.adminOrders = action.payload.orders;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.adminOrders.findIndex(o => o._id === action.payload._id);
        if (index !== -1) {
          state.adminOrders[index] = action.payload;
        }
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.status = 'loading';
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.status = 'succeeded';
      })
      .addMatcher((action): action is PayloadAction<string> => action.type.endsWith('/rejected'), (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default orderSlice.reducer;