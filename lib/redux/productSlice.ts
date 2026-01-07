import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface ProductState {
  parts: any[];
  homepageParts: any[];
  brandSpecificParts: any[];
  categoryParts: any[];
  categories: any[];
  brands: any[];
  models: any[];
  availableFilters: { categories: any[]; brands: any[]; models: any[] };
  years: number[];
  brandsByYear: any[];
  modelsForFilter: any[];
  currentPart: any | null;
  currentCategory: any | null;
  totalPages: number;
  currentPage: number;
  totalCount: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  brandSectionStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  categoryPageStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  parts: [],
  homepageParts: [],
  brandSpecificParts: [],
  categoryParts: [],
  categories: [],
  brands: [],
  models: [],
  availableFilters: { categories: [], brands: [], models: [] },
  years: [],
  brandsByYear: [],
  modelsForFilter: [],
  currentPart: null,
  currentCategory: null,
  totalPages: 1,
  currentPage: 1,
  totalCount: 0,
  status: 'idle',
  brandSectionStatus: 'idle',
  categoryPageStatus: 'idle',
  error: null,
};

export const syncZohoData = createAsyncThunk('products/syncZoho', async (_, { rejectWithValue }) => {
  try {
    const response = await api.post('/zoho/sync');
    return response.data;
  } catch (error: any) {
  }
});

export const exportManualProductsToZoho = createAsyncThunk('products/exportToZoho', async (_, { rejectWithValue }) => {
  try {
    const response = await api.post('/zoho/sync/export');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Export failed');
  }
});

export const stopSyncZoho = createAsyncThunk('products/stopSyncZoho', async (_, { rejectWithValue }) => {
  try {
    const response = await api.post('/zoho/sync/stop');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Stop Sync failed');
  }
});

export const fetchInitialHomepageParts = createAsyncThunk('products/fetchInitialHomepageParts', async (filters: any = {}, { rejectWithValue }) => {
  try { const response = await api.get('/products', { params: { ...filters, limit: 12 } }); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchPublicParts = createAsyncThunk('products/fetchPublicParts', async (filters: { page?: number, limit?: number, brand?: string, category?: string, model?: string, search?: string } = {}, { rejectWithValue }) => {
  try { const response = await api.get('/products', { params: filters }); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchPartsForCategory = createAsyncThunk('products/fetchPartsForCategory', async (filters: any = {}, { rejectWithValue }) => {
  try { const response = await api.get('/products', { params: filters }); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchAvailableFilters = createAsyncThunk('products/fetchAvailableFilters', async (_, { rejectWithValue }) => {
  try { const response = await api.get('/products/filters'); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchPartsByBrand = createAsyncThunk('products/fetchPartsByBrand', async (filters: any = {}, { rejectWithValue }) => {
  try { const response = await api.get('/products', { params: filters }); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchPartBySlug = createAsyncThunk('products/fetchPartBySlug', async (slug: string, { rejectWithValue }) => {
  try { const response = await api.get(`/products/${slug}`); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchPublicCategories = createAsyncThunk('products/fetchPublicCategories', async (_, { rejectWithValue }) => {
  try { const response = await api.get('/categories'); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchCategoryBySlug = createAsyncThunk('products/fetchCategoryBySlug', async (slug: string, { rejectWithValue }) => {
  try {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const fetchPublicBrands = createAsyncThunk('products/fetchPublicBrands', async (_, { rejectWithValue }) => {
  try { const response = await api.get('/brands'); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchPublicModelsByBrand = createAsyncThunk('products/fetchPublicModelsByBrand', async (brandId: string, { rejectWithValue }) => {
  try { const response = await api.get(`/models/by-brand/${brandId}`); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchParts = createAsyncThunk('products/fetchParts', async (filters: { page?: number; limit?: number; search?: string; source?: string; } = {}, { rejectWithValue }) => {
  try { const response = await api.get('/admin/products/parts', { params: filters }); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async (_, { rejectWithValue }) => {
  try { const response = await api.get('/admin/products/categories'); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchBrands = createAsyncThunk('products/fetchBrands', async (_, { rejectWithValue }) => {
  try { const response = await api.get('/admin/products/brands'); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchAllModels = createAsyncThunk('products/fetchAllModels', async (_, { rejectWithValue }) => {
  try { const response = await api.get('/admin/products/models'); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchModelsByBrand = createAsyncThunk('products/fetchModelsByBrand', async (brandId: string, { rejectWithValue }) => {
  try { const response = await api.get(`/admin/products/models/by-brand/${brandId}`); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const addCategory = createAsyncThunk('products/addCategory', async (data: { name: string }, { rejectWithValue }) => {
  try { const response = await api.post('/admin/products/categories', data); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const updateCategory = createAsyncThunk('products/updateCategory', async (data: { id: string, name: string }, { rejectWithValue }) => {
  try { const response = await api.patch(`/admin/products/categories/${data.id}`, { name: data.name }); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const deleteCategory = createAsyncThunk('products/deleteCategory', async (id: string, { rejectWithValue }) => {
  try { await api.delete(`/admin/products/categories/${id}`); return id; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

const uploadImageHelper = async (logoFile: File) => {
  const { data: { signedUrl, imageUrl } } = await api.post('/admin/products/generate-upload-url', { folder: 'brands', contentType: logoFile.type });
  await fetch(signedUrl, { method: 'PUT', body: logoFile, headers: { 'Content-Type': logoFile.type } });
  return imageUrl;
};

export const addBrand = createAsyncThunk('products/addBrand', async ({ name, logoFile }: { name: string, logoFile?: File }, { rejectWithValue }) => {
  try {
    let logoUrl = '';
    if (logoFile) {
      logoUrl = await uploadImageHelper(logoFile);
    }
    const response = await api.post('/admin/products/brands', { name, logo: logoUrl });
    return response.data;
  } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const updateBrand = createAsyncThunk('products/updateBrand', async ({ id, name, logoFile }: { id: string, name: string, logoFile?: File }, { rejectWithValue }) => {
  try {
    let dataToUpdate: { name: string, logo?: string } = { name };
    if (logoFile) {
      dataToUpdate.logo = await uploadImageHelper(logoFile);
    }
    const response = await api.patch(`/admin/products/brands/${id}`, dataToUpdate);
    return response.data;
  } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const deleteBrand = createAsyncThunk('products/deleteBrand', async (id: string, { rejectWithValue }) => {
  try { await api.delete(`/admin/products/brands/${id}`); return id; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const addModel = createAsyncThunk('products/addModel', async (modelData: { name: string, brand: string }, { rejectWithValue }) => {
  try { const response = await api.post('/admin/products/models', modelData); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const deleteModel = createAsyncThunk('products/deleteModel', async (id: string, { rejectWithValue }) => {
  try { await api.delete(`/admin/products/models/${id}`); return id; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

const uploadImages = async (imageFiles: File[]) => {
  const imageUploadPromises = imageFiles.map(async (file) => {
    const { data: { signedUrl, imageUrl } } = await api.post('/admin/products/generate-upload-url', { folder: 'parts', contentType: file.type });
    await fetch(signedUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
    return imageUrl;
  });
  return await Promise.all(imageUploadPromises);
};

export const addPart = createAsyncThunk('products/addPart', async (partData: any, { rejectWithValue }) => {
  try {
    const images = await uploadImages(partData.imageFiles);
    const finalPartData = { ...partData, images };
    delete finalPartData.imageFiles;
    const response = await api.post('/admin/products/parts', finalPartData);
    return response.data;
  } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const updatePart = createAsyncThunk('products/updatePart', async ({ id, data }: { id: string, data: any }, { rejectWithValue }) => {
  try {
    let finalData = { ...data };
    if (data.imageFiles && data.imageFiles.length > 0) {
      const images = await uploadImages(data.imageFiles);
      finalData.images = images;
    }
    delete finalData.imageFiles;
    const response = await api.patch(`/admin/products/parts/${id}`, finalData);
    return response.data;
  } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const deletePart = createAsyncThunk('products/deletePart', async (id: string, { rejectWithValue }) => {
  try { await api.delete(`/admin/products/parts/${id}`); return id; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearModels: (state) => { state.modelsForFilter = []; state.models = []; },
    clearCurrentCategory: (state) => { state.currentCategory = null; },
    clearCategoryParts: (state) => { state.categoryParts = []; }
  },
  extraReducers: (builder) => {
    builder.addCase(syncZohoData.pending, (state) => { state.status = 'loading'; });
    builder.addCase(syncZohoData.fulfilled, (state) => { state.status = 'succeeded'; });

    // Zoho Export
    builder.addCase(exportManualProductsToZoho.pending, (state) => { state.status = 'loading'; });
    builder.addCase(exportManualProductsToZoho.fulfilled, (state) => { state.status = 'succeeded'; });
    builder.addCase(exportManualProductsToZoho.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload as string; });

    builder
      .addCase(fetchInitialHomepageParts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchInitialHomepageParts.fulfilled, (state, action) => { state.homepageParts = action.payload.parts; state.status = 'succeeded'; })

      .addCase(fetchPublicParts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPublicParts.fulfilled, (state, action) => {
        state.parts = action.payload.parts;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalCount = action.payload.totalCount;
        state.status = 'succeeded';
      })

      .addCase(fetchPartsForCategory.pending, (state) => { state.categoryPageStatus = 'loading'; })
      .addCase(fetchPartsForCategory.fulfilled, (state, action) => { state.categoryParts = action.payload.parts; state.categoryPageStatus = 'succeeded'; })
      .addCase(fetchAvailableFilters.fulfilled, (state, action) => { state.availableFilters = action.payload; })
      .addCase(fetchParts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchParts.fulfilled, (state, action: PayloadAction<any>) => {
        state.parts = action.payload.parts; state.totalPages = action.payload.totalPages; state.currentPage = action.payload.currentPage; state.totalCount = action.payload.totalCount; state.status = 'succeeded';
      })
      .addCase(fetchPartsByBrand.pending, (state) => { state.brandSectionStatus = 'loading'; })
      .addCase(fetchPartsByBrand.fulfilled, (state, action) => { state.brandSpecificParts = action.payload.parts; state.brandSectionStatus = 'succeeded'; })
      .addCase(fetchPartBySlug.fulfilled, (state, action) => { state.currentPart = action.payload; })
      .addCase(fetchPublicCategories.fulfilled, (state, action) => { state.categories = action.payload; })
      .addCase(fetchCategoryBySlug.fulfilled, (state, action) => { state.currentCategory = action.payload; })
      .addCase(fetchPublicBrands.fulfilled, (state, action) => { state.brands = action.payload; })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.categories = action.payload; })
      .addCase(fetchBrands.fulfilled, (state, action) => { state.brands = action.payload; })
      .addCase(fetchAllModels.fulfilled, (state, action) => { state.models = action.payload; })
      .addCase(fetchModelsByBrand.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchModelsByBrand.fulfilled, (state, action) => { state.modelsForFilter = action.payload; state.status = 'succeeded'; })
      .addCase(fetchPublicModelsByBrand.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchPublicModelsByBrand.fulfilled, (state, action) => { state.models = action.payload; state.status = 'succeeded'; })
      .addCase(addCategory.fulfilled, (state, action) => { state.categories.push(action.payload); })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((cat: any) => cat._id === action.payload._id);
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => { state.categories = state.categories.filter((cat: any) => cat._id !== action.payload); })
      .addCase(addBrand.fulfilled, (state, action) => { state.brands.push(action.payload); })
      .addCase(updateBrand.fulfilled, (state, action) => {
        const index = state.brands.findIndex((b: any) => b._id === action.payload._id);
        if (index !== -1) state.brands[index] = action.payload;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => { state.brands = state.brands.filter((b: any) => b._id !== action.payload); })
      .addCase(addModel.fulfilled, (state, action) => { state.models.push(action.payload); })
      .addCase(deleteModel.fulfilled, (state, action) => { state.models = state.models.filter((m: any) => m._id !== action.payload); })
      .addCase(addPart.fulfilled, (state, action) => { state.parts.unshift(action.payload); })
      .addCase(updatePart.fulfilled, (state, action) => {
        const index = state.parts.findIndex((p: any) => p._id === action.payload._id);
        if (index !== -1) state.parts[index] = action.payload;
      })
      .addCase(deletePart.fulfilled, (state, action) => { state.parts = state.parts.filter((p: any) => p._id !== action.payload); })
      .addMatcher((action: AnyAction) => action.type.endsWith('/rejected'), (state, action: AnyAction) => {
        state.status = 'failed'; state.brandSectionStatus = 'failed'; state.categoryPageStatus = 'failed'; state.error = action.payload as string;
      });
  },
});

export const { clearModels, clearCurrentCategory, clearCategoryParts } = productSlice.actions;
export default productSlice.reducer;