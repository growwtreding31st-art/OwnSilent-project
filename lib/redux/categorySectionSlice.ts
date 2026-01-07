import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface CategorySectionState {
  sections: any[];
  currentSection: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategorySectionState = {
  sections: [],
  currentSection: null,
  status: 'idle',
  error: null,
};

const uploadImages = async (imageFiles: File[]) => {
  const imageUploadPromises = imageFiles.map(async (file) => {
    const { data: { signedUrl, imageUrl } } = await api.post('/admin/products/generate-upload-url', { folder: 'category-sections', contentType: file.type });
    await fetch(signedUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
    return imageUrl;
  });
  return await Promise.all(imageUploadPromises);
};

export const fetchCategorySections = createAsyncThunk('categorySections/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/category-sections');
    return response.data;
  } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const saveCategorySection = createAsyncThunk('categorySections/save', async (sectionData: any, { rejectWithValue }) => {
  try {
    const finalData = { ...sectionData };

    if (!finalData.categoryId) {
      return rejectWithValue("Category ID is strictly required.");
    }

    const existingImages = sectionData.existingImages || [];
    let newImageUrls: string[] = [];

    if (sectionData.imageFiles && sectionData.imageFiles.length > 0) {
      newImageUrls = await uploadImages(sectionData.imageFiles);
    }

    finalData.images = [...existingImages, ...newImageUrls];

    // Handle Technical Images
    const existingTechnicalImages = sectionData.existingTechnicalImages || [];
    let newTechnicalImageUrls: string[] = [];

    if (sectionData.technicalImageFiles && sectionData.technicalImageFiles.length > 0) {
      newTechnicalImageUrls = await uploadImages(sectionData.technicalImageFiles);
    }

    finalData.technicalImages = [...existingTechnicalImages, ...newTechnicalImageUrls];

    delete finalData.imageFiles;
    delete finalData.technicalImageFiles;
    delete finalData.isEditing;
    delete finalData.existingImages;
    delete finalData.existingTechnicalImages;
    delete finalData._id;

    const response = await api.post('/category-sections', finalData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteCategorySection = createAsyncThunk('categorySections/delete', async (id: string, { rejectWithValue }) => {
  try {
    await api.delete(`/category-sections/${id}`);
    return id;
  } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchSectionForCategory = createAsyncThunk('categorySections/fetchForCategory', async (slug: string, { rejectWithValue }) => {
  try {
    const response = await api.get(`/category-sections/public/${slug}`);
    return response.data;
  } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

const categorySectionSlice = createSlice({
  name: 'categorySections',
  initialState,
  reducers: {
    clearCurrentSection: (state) => {
      state.currentSection = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorySections.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCategorySections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sections = action.payload;
      })
      .addCase(saveCategorySection.pending, (state) => { state.status = 'loading'; })
      .addCase(saveCategorySection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.sections.findIndex(s => s.category?._id === action.payload.category?._id);
        if (index !== -1) {
          state.sections[index] = action.payload;
        } else {
          state.sections.unshift(action.payload);
        }
      })
      .addCase(deleteCategorySection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sections = state.sections.filter(s => s._id !== action.payload);
      })
      .addCase(fetchSectionForCategory.fulfilled, (state, action) => {
        state.currentSection = action.payload;
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

export const { clearCurrentSection } = categorySectionSlice.actions;
export default categorySectionSlice.reducer;