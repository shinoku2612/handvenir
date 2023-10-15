import { privateRequest } from "../config/axios.config";
import { setLoading, setToast } from "../redux/slice/global.slice";
import { checkType } from "../utils/helper";

export async function makeOrderService(userId, payload, dispatch) {
    try {
        dispatch(setLoading(true));
        const res = await privateRequest.post(`order/${userId}/check-out`, {
            product_list: payload.product_list,
            address: payload.address,
            receiver: payload.receiver,
            method: payload.method || "cod",
        });
        dispatch(setLoading(false));
        return res.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function getOrderService(userId, sortQuery) {
    try {
        let url = `/order/${userId}`;
        if (checkType(sortQuery) === "object") {
            const queryString = Object.keys(sortQuery)
                .reduce(
                    (urlString, query) =>
                        urlString + `${query}=${sortQuery[query]}&`,
                    "?",
                )
                .slice(0, -1);
            url += queryString;
        }
        const res = await privateRequest.get(url);
        return res.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
export async function getOrderDetailService(userId, orderId) {
    try {
        const res = await privateRequest.get(
            `/order/${userId}/detail/${orderId}`,
        );
        return res.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function cancelOrderService(userId, orderId, dispatch) {
    try {
        const res = await privateRequest.put(
            `/order/${userId}/cancel/${orderId}`,
        );
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: "This order was canceled successfully",
            }),
        );
        return res.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
