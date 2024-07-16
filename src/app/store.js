import { configureStore } from '@reduxjs/toolkit';
import  expensesSlice from './ExpensesSlice';
import authenticationSlice from './authenticationSlice';



export const store = configureStore({
  reducer: {
    authenticationSlice:  authenticationSlice,
   expensesSlice : expensesSlice,
  },
});
