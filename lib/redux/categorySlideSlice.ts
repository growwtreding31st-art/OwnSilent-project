import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface CategorySlideState {
  slides: any[];
  currentSlide: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategorySlideState = {
  slides: [],
  currentSlide: null,
  status: 'idle',
  error: null,
};

const uploadImages = async (imageFiles: File[]) => {
    const imageUploadPromises = imageFiles.map(async (file) => {
        const { data: { signedUrl, imageUrl } } = await api.post('/admin/products/generate-upload-url', { folder: 'category-slides', contentType: file.type });
        await fetch(signedUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
        return imageUrl;
    });
    return await Promise.all(imageUploadPromises);
};

export const fetchPublicCategorySlides = createAsyncThunk('categorySlides/fetchPublicAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/category-slides/public/all');
    return response.data;
  } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchCategorySlides = createAsyncThunk('categorySlides/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/category-slides');
    return response.data;
  } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const saveCategorySlide = createAsyncThunk('categorySlides/save', async (slideData: any, { rejectWithValue }) => {
  try {
    let finalData = { ...slideData };
    
    const existingImages = slideData.existingImages || [];
    let newImageUrls: string[] = [];

    if (slideData.imageFiles && slideData.imageFiles.length > 0) {
        newImageUrls = await uploadImages(slideData.imageFiles);
    }
    
    finalData.images = [...existingImages, ...newImageUrls];
    
    delete finalData.imageFiles;
    delete finalData.isEditing;
    delete finalData.existingImages;

    const response = await api.post('/category-slides', finalData);
    return response.data;
  } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const deleteCategorySlide = createAsyncThunk('categorySlides/delete', async (id: string, { rejectWithValue }) => {
  try {
    await api.delete(`/category-slides/${id}`);
    return id;
  } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchSlideForCategory = createAsyncThunk('categorySlides/fetchForCategory', async (slug: string, { rejectWithValue }) => {
    try {
        const response = await api.get(`/category-slides/public/${slug}`);
        return response.data;
    } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

const categorySlideSlice = createSlice({
  name: 'categorySlides',
  initialState,
  reducers: {
    clearCurrentCategorySlide: (state) => {
        state.currentSlide = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorySlides.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCategorySlides.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.slides = action.payload;
      })
      .addCase(fetchPublicCategorySlides.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchPublicCategorySlides.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.slides = action.payload;
      })
      .addCase(saveCategorySlide.pending, (state) => { state.status = 'loading'; })
      .addCase(saveCategorySlide.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.slides.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.slides[index] = action.payload;
        } else {
          state.slides.unshift(action.payload);
        }
      })
      .addCase(deleteCategorySlide.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.slides = state.slides.filter(s => s._id !== action.payload);
      })
      .addCase(fetchSlideForCategory.fulfilled, (state, action) => {
        state.currentSlide = action.payload;
      })
      .addMatcher(
        (action): action is PayloadAction<string> => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      );
  },
});

export const { clearCurrentCategorySlide } = categorySlideSlice.actions;
export default categorySlideSlice.reducer;