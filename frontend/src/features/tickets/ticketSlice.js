import { createSlice } from '@reduxjs/toolkit';
// import ticketService from './ticketService';

const initialState = {
  tickets: [],
  ticket: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const ticketSlice = createSlice({
  name: 'tickets',

  initialState,

  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {},
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;
