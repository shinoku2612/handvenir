import { privateRequest } from "../config/axios.config";
import { logout } from "../redux/slice/authentication.slice";
import { setLoading, setToast } from "../redux/slice/global.slice";
import { setUser } from "../redux/slice/user.slice";

export async function getUserService(userId, dispatch) {
    try {
        const res = await privateRequest.get(`/user/${userId}/find`);
        dispatch(setUser(res.data));
        return true;
    } catch (error) {
        let errorMessage = "";
        if (error.name === "AxiosError") {
            errorMessage = error.response.data.message;
        } else {
            errorMessage = error.message;
        }
        dispatch(
            setToast({
                show: true,
                type: "danger",
                message: errorMessage,
            }),
        );
        dispatch(logout());
        return false;
    }
}

export async function updateUserService(userId, dispatch, information) {
    try {
        const res = await privateRequest.put(
            `/user/${userId}/edit`,
            information,
        );
        dispatch(setUser(res.data));
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: "Your information is updated",
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
export async function updateAvatarService(userId, dispatch, file) {
    try {
        dispatch(setLoading(true));
        const res = await privateRequest.put(`/user/${userId}/avatar`, file);
        dispatch(setUser(res.data));
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: "Your avatar is up-to-date",
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

export async function insertAddressService(userId, dispatch, address) {
    try {
        const res = await privateRequest.post(
            `/user/${userId}/address/insert`,
            address,
        );
        dispatch(setUser(res.data));
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: "Your address is added",
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
export async function deleteAddressService(userId, dispatch, addressId) {
    try {
        const res = await privateRequest.delete(
            `/user/${userId}/address/delete?i=${addressId}`,
        );
        dispatch(setUser(res.data));
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: "Your address is deleted",
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
export async function setDefaultAddressService(userId, dispatch, addressId) {
    try {
        const res = await privateRequest.put(
            `/user/${userId}/address/default?i=${addressId}`,
        );
        dispatch(setUser(res.data));
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: "Your address is updated",
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
