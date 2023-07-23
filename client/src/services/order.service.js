import { privateRequest } from "../config/axios.config";

export async function getOrderService(userId) {
    try {
        const res = await privateRequest.get(`/order/${userId}`);
        return res.data;
    } catch (error) {
        return null;
    }
}
