import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

// @ts-ignore
const user = JSON.parse(localStorage.getItem('support-desk-app-user'));

const initialState = {
  user: user ?? null,
  message: '',
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk(
  'auth/logout',
  async (user, thunkAPI) => {
    return await authService.logout();
  }
);

export const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    reset: (state) => {
      state.message = '';
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;
      state.message = `${action.payload.message}`;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = `${action.payload}`;
    });

    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;
      state.message = `${action.payload.message}`;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = `${action.payload}`;
    });

    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = null;
      state.message = `${action.payload}`;
    });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
