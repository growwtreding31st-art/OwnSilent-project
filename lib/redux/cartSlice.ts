import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';
import { placeOrder } from './orderSlice'; 

interface CartState {
  items: any[];
  wishlist: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  wishlist: [],
  status: 'idle',
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    try { const res = await api.get('/user/cart'); return res.data; }
    catch (e: any) { return rejectWithValue(e.response.data.message); }
});
export const addToCart = createAsyncThunk('cart/addToCart', async (data: { partId: string, quantity: number }, { rejectWithValue }) => {
    try { const res = await api.post('/user/cart', data); return res.data; }
    catch (e: any) { return rejectWithValue(e.response.data.message); }
});
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (partId: string, { rejectWithValue }) => {
    try { const res = await api.delete(`/user/cart/${partId}`); return res.data; }
    catch (e: any) { return rejectWithValue(e.response.data.message); }
});

export const fetchWishlist = createAsyncThunk('cart/fetchWishlist', async (_, { rejectWithValue }) => {
    try { const res = await api.get('/user/wishlist'); return res.data; }
    catch (e: any) { return rejectWithValue(e.response.data.message); }
});
export const toggleWishlist = createAsyncThunk('cart/toggleWishlist', async (partId: string, { rejectWithValue }) => {
    try { const res = await api.post('/user/wishlist', { partId }); return res.data; }
    catch (e: any) { return rejectWithValue(e.response.data.message); }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.fulfilled, (state) => {
                state.items = [];
            })
            .addCase(fetchCart.fulfilled, (state, action: PayloadAction<any[]>) => { 
                state.items = action.payload; 
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<any[]>) => { 
                state.items = action.payload; 
            })
            .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<any[]>) => { 
                state.items = action.payload; 
            })
            .addCase(fetchWishlist.fulfilled, (state, action: PayloadAction<any[]>) => { 
                state.wishlist = action.payload; 
            })
            .addCase(toggleWishlist.fulfilled, (state, action: PayloadAction<any[]>) => { 
                state.wishlist = action.payload; 
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'), 
                (state) => { 
                    state.status = 'loading';
                    state.error = null;
                }
            )
            .addMatcher(
                (action): action is PayloadAction<string> => action.type.endsWith('/rejected'),
                (state, action) => {
                  state.status = 'failed';
                  state.error = action.payload;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.status = 'succeeded';
                }
            );
    }
});

export default cartSlice.reducer;