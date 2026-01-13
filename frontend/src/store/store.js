import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});

export default store;
