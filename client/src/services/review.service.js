import { publicRequest } from "../config/axios.config";

export async function getProductReviewService(productId) {
    try {
        const res = await publicRequest.get(`/review/${productId}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}
