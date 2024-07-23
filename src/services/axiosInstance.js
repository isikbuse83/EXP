import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use(config => {
    config.headers.authorization = 'Bearer ' + sessionStorage.getItem('token');
    return config;
});

export default axiosInstance;
