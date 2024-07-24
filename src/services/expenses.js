import { setExpenses, newExpense, editExpense, deleteExpense } from '../app/ExpensesSlice';
import axiosInstance from './axiosInstance';

export const GetExpenses = async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('/Expense');
        console.log('expense data: ', data);
        dispatch(setExpenses(data));
    } catch (error) {
        console.log('Error!', error);
    }
}

export const NewExpense = async (dispatch, expense) => {
    try {
        const { data } = await axiosInstance.post('/Expense', expense);
        dispatch(newExpense(data));
    } catch (error) {
        console.log('Error!', error);
    }
}

export const EditExpense = async (dispatch, expense) => {
    try {
        await axiosInstance.put(`/Expense`, expense);
        dispatch(editExpense(expense));
    } catch (error) {
        console.log('Error!', error);
    }
}

export const DeleteExpense = async (dispatch, expense) => {
    try {
        await axiosInstance.delete(`/Expense/${expense.id}`);
        dispatch(deleteExpense(expense));
    } catch (error) {
        console.log('Error!', error);
    }
}
