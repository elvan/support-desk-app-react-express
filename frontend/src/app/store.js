import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ticketReducer from '../features/tickets/ticketSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    ticketState: ticketReducer,
  },
});
