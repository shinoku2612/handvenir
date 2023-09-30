import { privateRequest } from "../config/axios.config";
import { checkType } from "../utils/helper";

export async function makeOrderService(userId, payload) {
    try {
        const res = await privateRequest.post(`order/check-out/${userId}`, {
            product_list: payload.product_list,
            address: payload.address,
        });
        return res.data;
    } catch (error) {
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
