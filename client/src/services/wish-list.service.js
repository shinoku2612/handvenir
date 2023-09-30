import { privateRequest } from "../config/axios.config";
import { setToast } from "../redux/slice/global.slice";
import { WishListDB } from "../utils/indexedDB";
export async function getLocalWishList() {
    try {
        const productList = await WishListDB.getAll();
        return productList;
    } catch (error) {
        return null;
    }
}
export async function getWishListService(userId) {
    try {
        const res = await privateRequest.get(`/wish-list/${userId}`);
        return res.data;
    } catch (error) {
        const productList = await WishListDB.getAll();
        if (productList === null) return null;
        return { product_list: productList };
    }
}
export async function addToWishListService(userId, dispatch, productId) {
    let data;
    try {
        const res = await privateRequest.post(`/wish-list/add/${userId}`, {
            productId,
        });
        data = res.data;
    } catch (error) {
        const productList = await WishListDB.insertOne({ product: productId });
        data = { product_list: productList };
    }
    dispatch(
        setToast({
            show: true,
            type: "success",
            message: "Your wish list is up to date",
        }),
    );
    return data;
}
export async function removeFromWishListService(userId, dispatch, productId) {
    let data;
    try {
        const res = await privateRequest.delete(
            `/wish-list/remove/${userId}/${productId}`,
        );
        data = res.data;
    } catch (error) {
        const productList = await WishListDB.deleteOne(productId);
        data = { product_list: productList };
    }
    dispatch(
        setToast({
            show: true,
            type: "success",
            message: "Your wish list is up to date",
        }),
    );
    return data;
}
export async function syncLocalWishListService(userId) {
    try {
        const wishList = await WishListDB.getAll();
        if (!wishList) return null;
        const res = await privateRequest.put(
            `/wish-list/sync-local/${userId}`,
            {
                productList: wishList || [],
            },
        );
        await WishListDB.deleteAll();
        return res.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
