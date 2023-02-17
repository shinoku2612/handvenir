import axios from 'axios';

const TOKEN = 'token';

export const publicRequest = axios.create({
    baseURL: process.env.REACT_APP_API,
});

export const privateRequest = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        'x-authorization': `Bearer ${TOKEN}`,
    },
});
