// import axios from 'axios';
// import { userAuthenticated } from '../app/authenticationSlice';


// const axiosInstance = axios.create({
//     baseURL: `${process.env.REACT_APP_BASE_URL}/Authentication`,
// });


// import { userAuthenticated } from '../app/authenticationSlice';

// import axiosInstance from './axiosInstance';

// export const SignUp = async (dispatch , credentials) => {
// try{

//     const {data} = await axiosInstance.post('/signup',credentials);
//     dispatch(userAuthenticated(data));

// }catch{
//     console.log('Error!');
//   }
// }

// export const SignIn = async (dispatch,credentials) => {
//     try{
//         const { data} = await axiosInstance.post('/signin',credentials);
//         dispatch(userAuthenticated(data));

//     }catch{
//         console.log('Error!');
//     }
// }
import axiosInstance from './axiosInstance';
import { userAuthenticated } from '../app/authenticationSlice';

// export const SignUp = async (dispatch, credentials) => {
//     try {
//         const { data } = await axiosInstance.post('/Authentication/signup', credentials);
//         dispatch(userAuthenticated(data));
//     } catch (error) {
//         console.log('Error!', error);
//     }
// }

// export const SignIn = async (dispatch, credentials) => {
//     try {
//         const { data } = await axiosInstance.post('/Authentication/signin', credentials);
//         dispatch(userAuthenticated(data));
//     } catch (error) {
//         console.log('Error!', error);
//     }
// }

export const SignUp = async (dispatch, credentials) => {
    try {
      const response = await axiosInstance.post('/authentication/signup', credentials);
      const { data } = response; // Response içinden data'yı çıkartın
      dispatch(userAuthenticated(data));
    } catch (error) {
      console.log('Error!', error);
    }
  };
  
  export const SignIn = async (dispatch, credentials) => {
    try {
      const response = await axiosInstance.post('/authentication/signin', credentials);
      const { data } = response; // Response içinden data'yı çıkartın
      dispatch(userAuthenticated(data));
    } catch (error) {
      console.log('Error!', error);
    }
  };
  
