import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserDB } from "../utils/indexedDB";

const publicRequest = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true,
});

const privateRequest = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true,
});

async function refreshTokenService(userId) {
    try {
        const res = await publicRequest.get(`/auth/refresh-token/${userId}`);
        return res.data;
    } catch (error) {
        return "";
    }
}

privateRequest.interceptors.request.use(
    async (config) => {
        const userId = JSON.parse(localStorage.getItem("userId"));

        if (!userId) throw new Error("Invalid user ID");

        const res = await UserDB.getOne(userId);
        let token = res.token;
        const currentDate = new Date();
        const currentTime = currentDate.getTime();

        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 <= currentTime) {
            console.log("Refreshing token...");
            const data = await refreshTokenService(userId);
            token = data.accessToken;
            console.log(token);
            await UserDB.updateOne({ user: userId, token });
            console.log("Successful");
        }
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        console.log("Failed with error:", error.message);
        return Promise.reject(error);
    },
);

export { publicRequest, privateRequest };
