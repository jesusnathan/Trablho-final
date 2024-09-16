import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}` : undefined,
    headers: {
        Accept: 'application/json'
    }
});

let isRequestPending = false;

axiosInstance.interceptors.request.use(function (config) {
    if (isRequestPending) {
        return Promise.reject(new Error('Canceled by request interception.'));
    }

    isRequestPending = true;

    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    isRequestPending = false;

    return response;
}, function (error) {
    isRequestPending = false;

    return Promise.reject(error);
});

export default axiosInstance;
