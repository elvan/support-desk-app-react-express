import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const storedUser = localStorage.getItem('support-desk-app-user') || '';
const user = JSON.parse(storedUser);

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  user: user ?? null,
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
  console.log(user);
});

export const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    resetAuth: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = `${action.payload}`;
    });
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
