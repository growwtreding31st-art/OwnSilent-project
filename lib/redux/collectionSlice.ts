import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface CollectionState {
  collections: any[];
  publicCollections: any[];
  currentCollection: any | null;
  collectionProducts: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  publicStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  collectionProductsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CollectionState = {
  collections: [],
  publicCollections: [],
  currentCollection: null,
  collectionProducts: [],
  status: 'idle',
  publicStatus: 'idle',
  collectionProductsStatus: 'idle',
  error: null,
};

const uploadImage = async (imageFile: File) => {
  const { data: { signedUrl, imageUrl } } = await api.post('/admin/products/generate-upload-url', {
    folder: 'collections',
    contentType: imageFile.type
  });
  await fetch(signedUrl, {
    method: 'PUT',
    body: imageFile,
    headers: { 'Content-Type': imageFile.type }
  });
  return imageUrl;
};

export const fetchCollections = createAsyncThunk('collections/fetchCollections', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/collections');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const addCollection = createAsyncThunk('collections/addCollection', async (collectionData: any, { rejectWithValue }) => {
  try {
    let imageUrl = collectionData.coverImage || '';
    if (collectionData.coverImageFile) {
      imageUrl = await uploadImage(collectionData.coverImageFile);
    }
    const finalData = { ...collectionData, coverImage: imageUrl };
    delete finalData.coverImageFile;
    const response = await api.post('/admin/collections', finalData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const updateCollection = createAsyncThunk('collections/updateCollection', async ({ id, data }: { id: string, data: any }, { rejectWithValue }) => {
  try {
    let finalData = { ...data };
    if (data.coverImageFile) {
      finalData.coverImage = await uploadImage(data.coverImageFile);
    }
    // If no file but coverImage string provided, it stays in finalData
    delete finalData.coverImageFile;
    const response = await api.patch(`/admin/collections/${id}`, finalData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const deleteCollection = createAsyncThunk('collections/deleteCollection', async (id: string, { rejectWithValue }) => {
  try {
    await api.delete(`/admin/collections/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const fetchPublicCollections = createAsyncThunk('collections/fetchPublicCollections', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/collections');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const fetchPublicCollectionBySlug = createAsyncThunk('collections/fetchPublicCollectionBySlug', async (slug: string, { rejectWithValue }) => {
  try {
    const response = await api.get(`/collections/${slug}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

const collectionSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    clearCurrentCollection: (state) => {
      state.currentCollection = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.collections = action.payload;
      })
      .addCase(addCollection.fulfilled, (state, action: PayloadAction<any>) => {
        state.collections.unshift(action.payload);
      })
      .addCase(updateCollection.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.collections.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.collections[index] = action.payload;
      })
      .addCase(deleteCollection.fulfilled, (state, action: PayloadAction<string>) => {
        state.collections = state.collections.filter(c => c._id !== action.payload);
      })
      .addCase(fetchPublicCollections.pending, (state) => { state.publicStatus = 'loading'; })
      .addCase(fetchPublicCollections.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.publicStatus = 'succeeded';
        state.publicCollections = action.payload;
      })
      .addCase(fetchPublicCollections.rejected, (state) => { state.publicStatus = 'failed'; })
      .addCase(fetchPublicCollectionBySlug.pending, (state) => {
        state.collectionProductsStatus = 'loading';
      })
      .addCase(fetchPublicCollectionBySlug.fulfilled, (state, action: PayloadAction<any>) => {
        state.collectionProductsStatus = 'succeeded';
        state.currentCollection = action.payload;
        state.collectionProducts = action.payload.products || [];
      })
      .addCase(fetchPublicCollectionBySlug.rejected, (state) => {
        state.collectionProductsStatus = 'failed';
      })
      .addMatcher((action) => (action.type.startsWith('collections/') && !action.type.includes('Public')) && action.type.endsWith('/pending'), (state) => { state.status = 'loading'; })
      .addMatcher((action) => (action.type.startsWith('collections/') && !action.type.includes('Public')) && action.type.endsWith('/fulfilled'), (state) => { state.status = 'succeeded'; })
      .addMatcher((action) => action.type.startsWith('collections/') && action.type.endsWith('/rejected'), (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentCollection } = collectionSlice.actions;
export default collectionSlice.reducer;