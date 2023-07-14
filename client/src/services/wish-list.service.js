// import { privateRequest } from "../config/axios.config";
import { setToast } from "../redux/slice/global.slice";
import { WishListDB } from "../utils/indexedDB";
export async function getWishListService(userId, dispatch) {
    try {
        const res = await WishListDB.getAll();
        if (res === null) return null;
        return { product_list: res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
export async function addToWishListService(userId, dispatch, productId) {
    try {
        const res = await WishListDB.insertOne({ productId });
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: "Your wish list is up to date",
            }),
        );
        return { product_list: res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
export async function removeFromWishListService(userId, dispatch, productId) {
    try {
        const res = await WishListDB.deleteOne(productId);
        dispatch(
            setToast({
                show: true,
                type: "success",
                message: "Your wish list is up to date",
            }),
        );
        return { product_list: res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
export async function syncLocalWishListService(userId, dispatch) {}
