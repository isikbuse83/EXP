
import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './ExpensesSlice';
import authenticationReducer from './authenticationSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    authentication: authenticationReducer,
  },
});

export default store;
