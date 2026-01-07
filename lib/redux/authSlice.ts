import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

interface AuthState {
  user: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk('auth/registerUser', async (userData: any, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || 'Registration failed');
  }
});

export const verifyOtp = createAsyncThunk('auth/verifyOtp', async (otpData: { email: string; otp: string }, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/verify-email', otpData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || 'OTP verification failed');
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials: any, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || 'Login failed');
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await api.post('/auth/logout');
    return {};
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || 'Logout failed');
  }
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/user/profile');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message || 'Not authenticated');
    }
});

export const requestLoginOtp = createAsyncThunk('auth/requestLoginOtp', async (email: string, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/login/otp/request', { email });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message || 'Failed to send OTP');
    }
});

export const verifyLoginOtp = createAsyncThunk('auth/verifyLoginOtp', async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/login/otp/verify', data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message || 'OTP verification failed');
    }
});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handleFulfilled = (state: AuthState, action: any) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
        if (action.payload.token) {
            localStorage.setItem('token', action.payload.token);
        }
    };
    const handleRejected = (state: AuthState, action: any) => {
        state.status = 'failed';
        state.error = action.payload as string;
    };
    const handlePending = (state: AuthState) => {
        state.status = 'loading';
    };

    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state) => { state.status = 'succeeded'; state.error = null; })
      .addCase(registerUser.rejected, handleRejected)
      
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      
      .addCase(verifyOtp.pending, handlePending)
      .addCase(verifyOtp.fulfilled, handleFulfilled)
      .addCase(verifyOtp.rejected, handleRejected)

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        localStorage.removeItem('token');
      })

      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(fetchCurrentUser.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.user = action.payload; 
        state.error = null; 
      })
      .addCase(fetchCurrentUser.rejected, (state) => { 
        state.status = 'failed'; 
        state.user = null; 
        localStorage.removeItem('token');
      })

      .addCase(requestLoginOtp.pending, handlePending)
      .addCase(requestLoginOtp.fulfilled, (state) => { state.status = 'succeeded'; state.error = null; })
      .addCase(requestLoginOtp.rejected, handleRejected)

      .addCase(verifyLoginOtp.pending, handlePending)
      .addCase(verifyLoginOtp.fulfilled, handleFulfilled)
      .addCase(verifyLoginOtp.rejected, handleRejected);
  },
});

export default authSlice.reducer;