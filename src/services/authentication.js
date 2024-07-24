
import axiosInstance from './axiosInstance';
import { userAuthenticated } from '../app/authenticationSlice';

export const SignUp = async (dispatch, credentials) => {
    try {
        
        const { data } = await axiosInstance.post('/Authentication/signup', credentials);
        dispatch(userAuthenticated(data));
    } catch (error) {
        console.log('Error!', error);
    }
}

export const SignIn = async (dispatch, credentials) => {
    try {
        const { data } = await axiosInstance.post('/Authentication/signin', credentials);
       
        return data;
    } catch (error) {
        console.log('Error!', error);
    }
}