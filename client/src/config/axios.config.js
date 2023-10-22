import axios from "axios";

const publicRequest = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true,
});

const privateRequest = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        Authorization: `Bearer `,
    },
    withCredentials: true,
});
privateRequest.interceptors.request.use(async (config) => {
    console.log(config);
    return config;
});

export { publicRequest, privateRequest };
