import { publicRequest, privateRequest } from "../config/axios.config";
import { setToast } from "../redux/slice/global.slice";

export async function postReviewService(userId, productId, review, dispatch) {
    try {
        const res = await privateRequest.post(
            `/review/${userId}/${productId}`,
            {
                comment: review.comment,
                rating: review.rating,
            },
        );
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: "Thank you for reviewing our product",
            }),
        );
        return res.data;
    } catch (error) {
        dispatch(
            setToast({
                show: true,
                type: "danger",
                message: error.response.data,
            }),
        );
        return null;
    }
}

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
