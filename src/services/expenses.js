import {setExpenses,newExpense,editExpense,deleteExpense} 
from '../app/ExpensesSlice';
import axios from 'axios';



const axiosInstance = axios.create({
    baseURL: `${process.env.React_APP_BASE_URL}/Expense`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    withCredentials: false
});

axiosInstance.interceptors.request.use(config =>{
    config.headers = {authorization:'Bearer' + sessionStorage.getItem('token')};
    return config;
});


export const GetExpenses= async(dispatch) => {
    try {

        const {data } = await axiosInstance.get();

        dispatch(setExpenses(data));
}catch {
        console.log('Error!');
    }
}

export const NewExpense = async (dispatch,expense) =>  {
    try{
       
        dispatch(newExpense({id:10 ,description: expense.description,
            amount: expense.amount}));

            const {data } = await axiosInstance.post("", expense)

            console.log('Data: ',data)

    }catch{
        console.log('Error!');
    }
}

export const EditExpense = async (dispatch,expense) => {
    try{
        await axiosInstance.put('',expense);
        dispatch(editExpense(expense));

    }catch{
        console.log('Error!');
    }
}

export const DeleteExpense = async (dispatch,expense) => {

    try{
        console.log('deleting expense: ',expense);
        await axiosInstance.delete('',{data: {...expense} });
        dispatch(deleteExpense(expense));

    }catch{
        console.log('Error!');
    }
}