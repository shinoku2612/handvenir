import { privateRequest, publicRequest } from "../config/axios.config";
import { login, logout } from "../redux/slice/authentication.slice";
import { clearCart } from "../redux/slice/cart.slice";
import { setLoading, setToast } from "../redux/slice/global.slice";
import { clearUser } from "../redux/slice/user.slice";
import { UserDB } from "../utils/indexedDB";

export async function sendRegisterLinkService(email, dispatch) {
    try {
        dispatch(setLoading(true));
        const res = await publicRequest.post("/auth/register", { email });
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: res.data,
            }),
        );
        dispatch(setLoading(false));
        return true;
    } catch (error) {
        dispatch(
            setToast({
                show: true,
                type: "danger",
                message: error.message,
            }),
        );
        dispatch(setLoading(false));
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
        dispatch(setLoading(true));
        const res = await publicRequest.post("/auth/login", { email });
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: res.data,
            }),
        );
        dispatch(setLoading(false));
        return true;
    } catch (error) {
        dispatch(
            setToast({
                show: true,
                type: "danger",
                message: error.message,
            }),
        );
        dispatch(setLoading(false));
        return false;
    }
}
export async function loginService({ userId, token }, dispatch) {
    try {
        const res = await publicRequest.get(
            `auth/login?i=${userId}&t=${token}`,
        );
        const existUser = await UserDB.getOne(userId);
        if (!existUser)
            await UserDB.insertOne({
                user: res.data?.userId,
                token: res.data?.accessToken,
            });
        else
            await UserDB.updateOne({
                user: res.data?.userId,
                token: res.data?.accessToken,
            });
        dispatch(login(res.data?.userId));
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export async function logoutService(userId, dispatch) {
    try {
        await privateRequest.delete(`/auth/logout/${userId}`);
        await UserDB.deleteAll();
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
