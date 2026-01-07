import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface AdminProfileState {
  profile: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AdminProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};

export const fetchAdminProfile = createAsyncThunk('adminProfile/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/profile');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
  }
});

export const updateAdminProfile = createAsyncThunk('adminProfile/updateProfile', async (profileData: { fullName: string; mobile: string }, { rejectWithValue }) => {
  try {
    const response = await api.patch('/admin/profile', profileData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
  }
});

export const changeAdminPassword = createAsyncThunk('adminProfile/changePassword', async (passwordData: any, { rejectWithValue }) => {
  try {
    const response = await api.patch('/admin/profile/change-password', passwordData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Password change failed');
  }
});

export const updateAdminAvatar = createAsyncThunk('adminProfile/updateAvatar', async (avatarFile: File, { rejectWithValue }) => {
    try {
        const { data: { signedUrl, imageUrl } } = await api.get('/admin/profile/avatar-upload-url', {
            params: { contentType: avatarFile.type }
        });
        
        await fetch(signedUrl, {
            method: 'PUT',
            body: avatarFile,
            headers: { 'Content-Type': avatarFile.type }
        });

        const response = await api.patch('/admin/profile/avatar', { avatarUrl: imageUrl });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Avatar update failed');
    }
});


const adminProfileSlice = createSlice({
  name: 'adminProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.profile = action.payload;
      })
      .addCase(updateAdminAvatar.fulfilled, (state, action: PayloadAction<any>) => {
          state.profile = action.payload;
      });
  },
});

export default adminProfileSlice.reducer;