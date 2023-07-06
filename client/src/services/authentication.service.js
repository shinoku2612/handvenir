import { privateRequest, publicRequest } from "../config/axios.config";
import { login, logout } from "../redux/slice/authentication.slice";
import { clearCart } from "../redux/slice/cart.slice";
import { setToast } from "../redux/slice/global.slice";
import { clearUser } from "../redux/slice/user.slice";

export async function sendRegisterLinkService(email, dispatch) {
    try {
        const res = await publicRequest.post("/auth/register", { email });
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: res.data,
            }),
        );
        return true;
    } catch (error) {
        dispatch(
            setToast({
                show: true,
                type: "danger",
                message: error.message,
            }),
        );
        return false;
    }
}

export async function registerService({ token }, dispatch) {
    try {
        await publicRequest.get(`auth/register?t=${token}`);
        return true;
    } catch (error) {
        return false;
    }
}

export async function sendLoginLinkService(email, dispatch) {
    try {
        const res = await publicRequest.post("/auth/login", { email });
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: res.data,
            }),
        );
        return true;
    } catch (error) {
        dispatch(
            setToast({
                show: true,
                type: "danger",
                message: error.message,
            }),
        );
        return false;
    }
}
export async function loginService({ userId, token }, dispatch) {
    try {
        const res = await publicRequest.get(
            `auth/login?i=${userId}&t=${token}`,
        );
        dispatch(login(res.data?.userId));
        return true;
    } catch (error) {
        return false;
    }
}

export async function refreshTokenService(userId, dispatch) {
    try {
        const res = await privateRequest.put(`/auth/refresh-token/${userId}`);
        dispatch(login(res.data.data.userId));
        return true;
    } catch (error) {
        dispatch(
            setToast({
                show: true,
                type: "danger",
                message: error.message,
            }),
        );
        return false;
    }
}

export async function logoutService(userId, dispatch) {
    try {
        await privateRequest.delete(`/auth/logout/${userId}`);
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearUser());
        return true;
    } catch (error) {
        dispatch(
            setToast({
                show: true,
                type: "danger",
                message: error.message,
            }),
        );
        return false;
    }
}
