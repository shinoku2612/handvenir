import axios from 'axios';

export const publicRequest = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true,
});

export const privateRequest = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        "Authorization": `Bearer `
    },
    withCredentials: true,
});
