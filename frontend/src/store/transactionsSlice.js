import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { nanoid } from 'nanoid';

const API_URL = 'http://localhost:3000/transactions';

// Categories
export const CATEGORIES = [
  { id: 'food', name: 'Food', icon: 'utensils' },
  { id: 'rent', name: 'Rent', icon: 'home' },
  { id: 'salary', name: 'Salary', icon: 'briefcase' },
  { id: 'transport', name: 'Transport', icon: 'car' },
  { id: 'entertainment', name: 'Entertainment', icon: 'film' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping-bag' },
  { id: 'utilities', name: 'Utilities', icon: 'bolt' },
  { id: 'healthcare', name: 'Healthcare', icon: 'heart' },
  { id: 'education', name: 'Education', icon: 'book' },
  { id: 'other', name: 'Other', icon: 'folder' },
];

// Filter types
export const FILTER_TYPES = {
  ALL: 'ALL',
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
};

// Async Thunks
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addTransactionAsync = createAsyncThunk(
  'transactions/addTransactionAsync',
  async ({ title, amount, category }) => {
    const numAmount = parseFloat(amount);
    const newTransaction = {
      id: nanoid(),
      title,
      amount: numAmount,
      category,
      type: numAmount >= 0 ? 'income' : 'expense',
      createdAt: new Date().toISOString(),
    };
    const response = await axios.post(API_URL, newTransaction);
    return response.data;
  }
);

export const updateTransactionAsync = createAsyncThunk(
  'transactions/updateTransactionAsync',
  async ({ id, title, amount, category }) => {
    const numAmount = parseFloat(amount);
    const updatedTransaction = {
      title,
      amount: numAmount,
      category,
      type: numAmount >= 0 ? 'income' : 'expense',
    };
    const response = await axios.patch(`${API_URL}/${id}`, updatedTransaction);
    return response.data;
  }
);

export const deleteTransactionAsync = createAsyncThunk(
  'transactions/deleteTransactionAsync',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const initialState = {
  list: [],
  filter: FILTER_TYPES.ALL,
  selectedCategory: null,
  searchQuery: '',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.reverse(); // Reverse to show latest first
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add
      .addCase(addTransactionAsync.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      // Update
      .addCase(updateTransactionAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteTransactionAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      });
  },
});

// Selectors
export const selectAllTransactions = (state) => state.transactions.list;

export const selectFilteredTransactions = (state) => {
  const { list, filter, selectedCategory, searchQuery } = state.transactions;
  
  return list.filter((transaction) => {
    const typeMatch =
      filter === FILTER_TYPES.ALL ||
      (filter === FILTER_TYPES.INCOME && transaction.type === 'income') ||
      (filter === FILTER_TYPES.EXPENSE && transaction.type === 'expense');

    const categoryMatch =
      !selectedCategory || transaction.category === selectedCategory;

    const searchMatch =
      !searchQuery ||
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase());

    return typeMatch && categoryMatch && searchMatch;
  });
};

export const selectTotalIncome = (state) =>
  state.transactions.list
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

export const selectTotalExpenses = (state) =>
  state.transactions.list
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

export const selectBalance = (state) =>
  state.transactions.list.reduce((sum, t) => sum + t.amount, 0);

export const selectCurrentFilter = (state) => state.transactions.filter;
export const selectSelectedCategory = (state) => state.transactions.selectedCategory;
export const selectSearchQuery = (state) => state.transactions.searchQuery;
export const selectTransactionsStatus = (state) => state.transactions.status;

export const {
  setFilter,
  setCategoryFilter,
  setSearchQuery,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
