import axios from 'axios';

const instance = axios.create({
    baseURL: process.browser === true ? process.env.API_PATH : process.env.API_HOST,
    headers: {
        'content-type': 'application/json',
    },
});

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return '';
};

if (process.browser === true) {
    const token = getCookie('rd-auth');
    instance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
}

export default instance;
