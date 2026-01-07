import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface HeroState {
  slides: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: HeroState = {
  slides: [],
  status: 'idle',
};

const uploadImage = async (imageFile: File, folder: string) => {
    const { data: { signedUrl, imageUrl } } = await api.post('/admin/products/generate-upload-url', { folder, contentType: imageFile.type });
    await fetch(signedUrl, { method: 'PUT', body: imageFile, headers: { 'Content-Type': imageFile.type } });
    return imageUrl;
};

export const fetchSlides = createAsyncThunk('hero/fetchSlides', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/hero-slides');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const fetchPublicSlides = createAsyncThunk('hero/fetchPublicSlides', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/hero-slides/public');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const addSlide = createAsyncThunk('hero/addSlide', async (slideData: any, { rejectWithValue }) => {
  try {
    const imageUrl = await uploadImage(slideData.imageFile, 'hero');
    
    const finalData = { ...slideData, image: imageUrl };
    delete finalData.imageFile;

    const response = await api.post('/hero-slides', finalData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const updateSlide = createAsyncThunk('hero/updateSlide', async ({ id, slideData }: { id: string, slideData: any }, { rejectWithValue }) => {
  try {
    let finalData = { ...slideData };

    if (slideData.imageFile) {
        finalData.image = await uploadImage(slideData.imageFile, 'hero');
    }
    
    delete finalData.imageFile;

    const response = await api.patch(`/hero-slides/${id}`, finalData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const deleteSlide = createAsyncThunk('hero/deleteSlide', async (id: string, { rejectWithValue }) => {
  try {
    await api.delete(`/hero-slides/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlides.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchSlides.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.slides = action.payload;
      })
      .addCase(fetchPublicSlides.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchPublicSlides.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.slides = action.payload;
      })
      .addCase(addSlide.fulfilled, (state, action: PayloadAction<any>) => {
        state.slides.unshift(action.payload);
      })
      .addCase(updateSlide.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.slides.findIndex((slide: any) => slide._id === action.payload._id);
        if (index !== -1) {
          state.slides[index] = action.payload;
        }
      })
      .addCase(deleteSlide.fulfilled, (state, action: PayloadAction<string>) => {
        state.slides = state.slides.filter((slide: any) => slide._id !== action.payload);
      });
  },
});

export default heroSlice.reducer;