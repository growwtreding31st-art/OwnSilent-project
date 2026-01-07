import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface ReviewState {
  productsToReview: any[];
  publishedReviews: any[];
  adminReviews: any[];
  productReviews: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ReviewState = {
  productsToReview: [],
  publishedReviews: [],
  adminReviews: [],
  productReviews: [],
  status: 'idle',
};

export const fetchProductsToReview = createAsyncThunk('reviews/fetchProductsToReview', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/reviews/to-review');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const fetchMyPublishedReviews = createAsyncThunk('reviews/fetchMyPublishedReviews', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/reviews/my-reviews');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const submitReview = createAsyncThunk('reviews/submitReview', async (reviewData: any, { rejectWithValue }) => {
  try {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const fetchReviewsForProduct = createAsyncThunk('reviews/fetchForProduct', async (partId: string, { rejectWithValue }) => {
    try {
        const response = await api.get(`/reviews/product/${partId}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
    }
});

export const fetchAdminReviews = createAsyncThunk('reviews/fetchAdminReviews', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/reviews/admin');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
    }
});

export const updateReviewStatus = createAsyncThunk('reviews/updateStatus', async ({ id, status }: { id: string, status: string }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/reviews/admin/${id}`, { status });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
    }
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsToReview.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.productsToReview = action.payload;
      })
      .addCase(fetchMyPublishedReviews.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.publishedReviews = action.payload;
      })
      .addCase(submitReview.fulfilled, (state, action: PayloadAction<any>) => {
        state.productsToReview = state.productsToReview.filter((p:any) => p.part._id !== action.payload.part);
      })
      .addCase(fetchReviewsForProduct.fulfilled, (state, action: PayloadAction<any[]>) => {
          state.productReviews = action.payload;
      })
      .addCase(fetchAdminReviews.fulfilled, (state, action: PayloadAction<any[]>) => {
          state.adminReviews = action.payload;
      })
      .addCase(updateReviewStatus.fulfilled, (state, action: PayloadAction<any>) => {
          const index = state.adminReviews.findIndex((r: any) => r._id === action.payload._id);
          if (index !== -1) {
              state.adminReviews[index] = action.payload;
          }
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.status = 'loading';
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.status = 'succeeded';
      });
  },
});

export default reviewSlice.reducer;