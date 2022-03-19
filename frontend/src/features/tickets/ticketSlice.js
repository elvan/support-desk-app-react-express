import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
  tickets: [],
  ticket: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const listTickets = createAsyncThunk(
  'ticket/list',
  async (_ticket, thunkAPI) => {
    try {
      // @ts-ignore
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.list(token);
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

export const createTicket = createAsyncThunk(
  'ticket/create',
  async (ticket, thunkAPI) => {
    try {
      // @ts-ignore
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.create(ticket, token);
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

export const ticketSlice = createSlice({
  name: 'tickets',

  initialState,

  reducers: {
    reset: (_state) => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(listTickets.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(listTickets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tickets = action.payload;
    });

    builder.addCase(listTickets.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = `${action.payload}`;
    });

    builder.addCase(createTicket.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });

    builder.addCase(createTicket.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = `${action.payload}`;
    });
  },
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;
