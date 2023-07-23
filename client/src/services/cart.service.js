import { privateRequest } from "../config/axios.config";
import { setCart, setCartTotal } from "../redux/slice/cart.slice";
import { setToast } from "../redux/slice/global.slice";
import { CartDB } from "../utils/indexedDB";
export async function getLocalCart() {
    try {
        const productList = await CartDB.getAll();

        return productList;
    } catch (error) {
        return null;
    }
}
export async function getCartService(userId, dispatch) {
    try {
        const res = await privateRequest.get(`/cart/${userId}`);
        dispatch(setCart(res.data));
        return true;
    } catch (error) {
        const productList = await CartDB.getAll();

        if (productList) dispatch(setCart({ product_list: productList }));
        return true;
    }
}
export async function addToCartService(
    userId,
    dispatch,
    { productId, quantity },
) {
    try {
        const res = await privateRequest.post(`/cart/add/${userId}`, {
            productId,
            quantity,
        });
        dispatch(setCart(res.data));
    } catch (error) {
        const product = await CartDB.getOne(productId);
        let data = null;
        if (!product) data = await CartDB.insertOne({ productId, quantity });
        else
            data = await CartDB.updateOne({
                productId,
                quantity: product.quantity + quantity,
            });
        if (data) dispatch(setCart({ product_list: data }));
        else dispatch(setCart(null));
    }
    dispatch(
        setToast({
            show: true,
            type: "success",
            message: "Your cart is up to date",
        }),
    );
    return true;
}
export async function removeFromCartService(userId, dispatch, productId) {
    try {
        const res = await privateRequest.delete(
            `/cart/remove/${userId}/${productId}`,
        );
        dispatch(setCart(res.data));
    } catch (error) {
        const data = await CartDB.deleteOne(productId);
        if (data) dispatch(setCart({ product_list: data }));
        else dispatch(setCart(null));
    }
    dispatch(
        setToast({
            show: true,
            type: "success",
            message: "Product successfully removed",
        }),
    );
    return true;
}
export async function syncLocalCartService(userId, dispatch, localCart) {
    try {
        if (!localCart) return false;
        const res = await privateRequest.put(`/cart/sync-local/${userId}`, {
            productList: localCart || [],
        });
        dispatch(setCart(res.data));
        await CartDB.deleteAll();
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
export async function getCartTotalService(dispatch, productList) {
    try {
        const res = await privateRequest.post("/cart/total", {
            productList,
        });
        dispatch(setCartTotal(res.data?.total));
        return true;
    } catch (error) {
        return false;
    }
}
export async function updateCartService(
    userId,
    dispatch,
    { productId, quantity },
) {
    try {
        const res = await privateRequest.put(`/cart/update/${userId}`, {
            productId,
            quantity,
        });
        dispatch(setCart(res.data));
    } catch (error) {
        const data = await CartDB.updateOne({
            productId,
            quantity: quantity,
        });
        dispatch(setCart({ product_list: data }));
    }
    dispatch(
        setToast({
            show: true,
            type: "success",
            message: "Your cart is up to date",
        }),
    );
    return true;
}
