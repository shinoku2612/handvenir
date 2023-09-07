import { privateRequest } from "../config/axios.config";

export async function getOrderService(userId) {
    try {
        const res = await privateRequest.get(`/order/${userId}`);
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
