import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7281',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(config => {
    config.headers.authorization = 'Bearer ' + sessionStorage.getItem('token');
    return config;
});

export default axiosInstance;
