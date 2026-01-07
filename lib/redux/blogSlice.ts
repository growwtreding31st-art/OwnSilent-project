import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface BlogState {
  posts: any[];
  categories: any[];
  currentPost: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  categories: [],
  currentPost: null,
  status: 'idle',
  error: null,
};

const uploadImage = async (imageFile: File) => {
    const { data: { signedUrl, imageUrl } } = await api.post('/admin/products/generate-upload-url', { folder: 'blog', contentType: imageFile.type });
    await fetch(signedUrl, { method: 'PUT', body: imageFile, headers: { 'Content-Type': imageFile.type } });
    return imageUrl;
};

export const fetchPublicBlogPosts = createAsyncThunk('blog/fetchPublicPosts', async (filters: any = {}, { rejectWithValue }) => {
  try { 
    const response = await api.get('/blog/posts', { params: filters }); 
    return response.data; 
  }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchPublicBlogPostBySlug = createAsyncThunk('blog/fetchPublicPostBySlug', async (slug: string, { rejectWithValue }) => {
  try { const response = await api.get(`/blog/posts/${slug}`); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchBlogCategories = createAsyncThunk('blog/fetchCategories', async (_, { rejectWithValue }) => {
  try { const response = await api.get('/admin/blog/categories'); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const addBlogCategory = createAsyncThunk('blog/addCategory', async (name: string, { rejectWithValue }) => {
  try { const response = await api.post('/admin/blog/categories', { name }); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const updateBlogCategory = createAsyncThunk('blog/updateCategory', async ({ id, name }: { id: string, name: string }, { rejectWithValue }) => {
  try { const response = await api.patch(`/admin/blog/categories/${id}`, { name }); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const deleteBlogCategory = createAsyncThunk('blog/deleteCategory', async (id: string, { rejectWithValue }) => {
  try { await api.delete(`/admin/blog/categories/${id}`); return id; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const fetchBlogPosts = createAsyncThunk('blog/fetchPosts', async (_, { rejectWithValue }) => {
  try { const response = await api.get('/admin/blog/posts'); return response.data; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const addBlogPost = createAsyncThunk('blog/addPost', async (postData: any, { rejectWithValue }) => {
  try {
    const imageUrl = await uploadImage(postData.featuredImageFile);
    const finalData = { ...postData, featuredImage: imageUrl };
    delete finalData.featuredImageFile;
    const response = await api.post('/admin/blog/posts', finalData);
    return response.data;
  } catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

export const updateBlogPost = createAsyncThunk('blog/updatePost', async ({ id, postData }: { id: string, postData: any }, { rejectWithValue }) => {
    try {
        let finalData = { ...postData };
        if (postData.featuredImageFile) {
            const imageUrl = await uploadImage(postData.featuredImageFile);
            finalData.featuredImage = imageUrl;
        }
        delete finalData.featuredImageFile;
        const response = await api.patch(`/admin/blog/posts/${id}`, finalData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
    }
});

export const deleteBlogPost = createAsyncThunk('blog/deletePost', async (id: string, { rejectWithValue }) => {
  try { await api.delete(`/admin/blog/posts/${id}`); return id; }
  catch (error: any) { return rejectWithValue(error.response?.data?.message); }
});

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
        state.currentPost = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicBlogPosts.fulfilled, (state, action: PayloadAction<any>) => { 
        state.posts = action.payload.posts; 
      })
      .addCase(fetchPublicBlogPostBySlug.fulfilled, (state, action: PayloadAction<any>) => { 
        state.currentPost = action.payload; 
      })
      .addCase(fetchBlogCategories.fulfilled, (state, action: PayloadAction<any[]>) => { 
        state.categories = action.payload; 
      })
      .addCase(addBlogCategory.fulfilled, (state, action: PayloadAction<any>) => { 
        state.categories.push(action.payload); 
      })
      .addCase(updateBlogCategory.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.categories.findIndex((cat:any) => cat._id === action.payload._id);
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.categories = state.categories.filter((cat:any) => cat._id !== action.payload);
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action: PayloadAction<any>) => { 
        state.posts = action.payload.posts; 
      })
      .addCase(addBlogPost.fulfilled, (state, action: PayloadAction<any>) => { 
        state.posts.unshift(action.payload); 
      })
      .addCase(updateBlogPost.fulfilled, (state, action: PayloadAction<any>) => {
          const index = state.posts.findIndex(p => p._id === action.payload._id);
          if (index !== -1) {
              state.posts[index] = action.payload;
          }
      })
      .addCase(deleteBlogPost.fulfilled, (state, action: PayloadAction<string>) => { 
        state.posts = state.posts.filter((p:any) => p._id !== action.payload); 
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

export const { clearCurrentPost } = blogSlice.actions;
export default blogSlice.reducer;