import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface UserProfileState {
  profile: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};

export const fetchUserProfile = createAsyncThunk('userProfile/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
  }
});

export const updateUserProfile = createAsyncThunk('userProfile/updateProfile', async (profileData: { fullName: string; mobile: string }, { rejectWithValue }) => {
  try {
    const response = await api.patch('/user/profile', profileData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
  }
});

export const changeUserPassword = createAsyncThunk('userProfile/changePassword', async (passwordData: any, { rejectWithValue }) => {
  try {
    const response = await api.patch('/user/profile/change-password', passwordData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Password change failed');
  }
});

export const updateUserAvatar = createAsyncThunk('userProfile/updateAvatar', async (avatarFile: File, { rejectWithValue }) => {
    try {
        const { data: { signedUrl, imageUrl } } = await api.get('/user/profile/avatar-upload-url', {
            params: { contentType: avatarFile.type }
        });
        
        await fetch(signedUrl, {
            method: 'PUT',
            body: avatarFile,
            headers: { 'Content-Type': avatarFile.type }
        });

        const response = await api.patch('/user/profile/avatar', { avatarUrl: imageUrl });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Avatar update failed');
    }
});

export const addAddress = createAsyncThunk('userProfile/addAddress', async (addressData: any, { rejectWithValue }) => {
    try {
        const response = await api.post('/user/addresses', addressData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
    }
});

export const updateAddress = createAsyncThunk('userProfile/updateAddress', async ({ addressId, addressData }: { addressId: string, addressData: any }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/user/addresses/${addressId}`, addressData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
    }
});

export const deleteAddress = createAsyncThunk('userProfile/deleteAddress', async (addressId: string, { rejectWithValue }) => {
    try {
        const response = await api.delete(`/user/addresses/${addressId}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
    }
});

export const setDefaultAddress = createAsyncThunk('userProfile/setDefaultAddress', async (addressId: string, { rejectWithValue }) => {
    try {
        const response = await api.post(`/user/addresses/${addressId}/set-default`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
    }
});

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action): action is PayloadAction<string> => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action: PayloadAction<any>) => {
          state.status = 'succeeded';
          if (action.type.startsWith('userProfile/fetchProfile') || action.type.startsWith('userProfile/updateProfile') || action.type.startsWith('userProfile/updateAvatar')) {
            state.profile = action.payload;
          }
          if (action.type.startsWith('userProfile/addAddress') || action.type.startsWith('userProfile/updateAddress') || action.type.startsWith('userProfile/deleteAddress') || action.type.startsWith('userProfile/setDefaultAddress')) {
            if (state.profile) {
              state.profile.addresses = action.payload;
            }
          }
        }
      );
  },
});

export default userProfileSlice.reducer;