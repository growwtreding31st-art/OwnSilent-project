import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface NewsState {
  articles: any[];
  currentArticle: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  currentArticle: null,
  status: 'idle',
  error: null,
};

const uploadImage = async (imageFile: File) => {
    const { data: { signedUrl, imageUrl } } = await api.post('/admin/products/generate-upload-url', { folder: 'news', contentType: imageFile.type });
    await fetch(signedUrl, { method: 'PUT', body: imageFile, headers: { 'Content-Type': imageFile.type } });
    return imageUrl;
};

export const fetchPublicNews = createAsyncThunk('news/fetchPublicNews', async (filters: any = {}, { rejectWithValue }) => {
  try { 
      const response = await api.get('/news', { params: filters }); 
      return response.data; 
  }
  catch (error: any) { return rejectWithValue(error.response.data.message); }
});

export const fetchPublicNewsBySlug = createAsyncThunk('news/fetchPublicNewsBySlug', async (slug: string, { rejectWithValue }) => {
  try { const response = await api.get(`/news/${slug}`); return response.data; }
  catch (error: any) { return rejectWithValue(error.response.data.message); }
});

export const fetchNews = createAsyncThunk('news/fetchNews', async (_, { rejectWithValue }) => {
    try { const response = await api.get('/admin/news'); return response.data; }
    catch (error: any) { return rejectWithValue(error.response.data.message); }
});

export const addNews = createAsyncThunk('news/addNews', async (newsData: any, { rejectWithValue }) => {
    try {
        const imageUrl = await uploadImage(newsData.imageFile);
        const finalData = { ...newsData, image: imageUrl };
        delete finalData.imageFile;
        const response = await api.post('/admin/news', finalData);
        return response.data;
    } catch (error: any) { return rejectWithValue(error.response.data.message); }
});

export const updateNews = createAsyncThunk('news/updateNews', async ({ id, data }: { id: string, data: any }, { rejectWithValue }) => {
    try {
        let finalData = { ...data };
        if (data.imageFile) {
            const imageUrl = await uploadImage(data.imageFile);
            finalData.image = imageUrl;
        }
        delete finalData.imageFile;
        const response = await api.patch(`/admin/news/${id}`, finalData);
        return response.data;
    } catch (error: any) { return rejectWithValue(error.response.data.message); }
});

export const deleteNews = createAsyncThunk('news/deleteNews', async (id: string, { rejectWithValue }) => {
    try {
        await api.delete(`/admin/news/${id}`);
        return id;
    } catch (error: any) { return rejectWithValue(error.response.data.message); }
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearCurrentArticle: (state) => {
        state.currentArticle = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicNews.fulfilled, (state, action: PayloadAction<any>) => { 
        state.articles = action.payload.articles; 
      })
      .addCase(fetchPublicNewsBySlug.fulfilled, (state, action: PayloadAction<any>) => { 
        state.currentArticle = action.payload; 
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<any>) => { 
        state.articles = action.payload.articles || action.payload; 
      })
      .addCase(addNews.fulfilled, (state, action: PayloadAction<any>) => { 
        state.articles.unshift(action.payload); 
      })
      .addCase(updateNews.fulfilled, (state, action: PayloadAction<any>) => {
          const index = state.articles.findIndex((a: any) => a._id === action.payload._id);
          if (index !== -1) state.articles[index] = action.payload;
      })
      .addCase(deleteNews.fulfilled, (state, action: PayloadAction<string>) => {
          state.articles = state.articles.filter((a: any) => a._id !== action.payload);
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => { 
        state.status = 'loading';
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => { 
        state.status = 'succeeded';
      })
      .addMatcher((action): action is PayloadAction<string> => action.type.endsWith('/rejected'), (state, action) => { 
        state.status = 'failed'; 
        state.error = action.payload; 
      });
  },
});

export const { clearCurrentArticle } = newsSlice.actions;
export default newsSlice.reducer;