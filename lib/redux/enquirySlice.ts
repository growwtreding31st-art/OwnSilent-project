import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface EnquiryState {
  enquiries: any[];
  currentEnquiry: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EnquiryState = {
  enquiries: [],
  currentEnquiry: null,
  status: 'idle',
  error: null,
};

export const submitEnquiry = createAsyncThunk('enquiry/submit', async (enquiryData: any, { rejectWithValue }) => {
  try {
    const response = await api.post('/enquiries', enquiryData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const fetchEnquiries = createAsyncThunk('enquiry/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/enquiries');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const replyToEnquiry = createAsyncThunk('enquiry/reply', async ({ id, message }: { id: string, message: string }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/enquiries/${id}/reply`, { message });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.enquiries = action.payload;
      })
      .addCase(replyToEnquiry.fulfilled, (state, action) => {
        const index = state.enquiries.findIndex(e => e._id === action.payload._id);
        if (index !== -1) {
          state.enquiries[index] = action.payload;
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

export default enquirySlice.reducer;