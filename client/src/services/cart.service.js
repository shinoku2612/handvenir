import { privateRequest } from "../config/axios.config";
import { setCart, setCartTotal } from "../redux/slice/cart.slice";
import { setToast } from "../redux/slice/global.slice";
export async function getCartService(userId, dispatch) {
    try {
        if (!userId) return true;
        const res = await privateRequest.get(`/cart/${userId}`);
        dispatch(setCart(res.data));
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
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
        const localCart = localStorage.getItem("cart");
        const cart = JSON.parse(localCart) || { product_list: [] };
        const existingItem = cart.product_list.find(
            (product) => product.productId === productId,
        );
        if (existingItem) existingItem.quantity += quantity;
        else cart.product_list.push({ productId, quantity });
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(setCart(cart));
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
        const localCart = localStorage.getItem("cart");
        const cart = JSON.parse(localCart) || { product_list: [] };
        cart.product_list = cart.product_list.filter(
            (product) => product.productId !== productId,
        );
        if (cart.product_list.length === 0) {
            localStorage.removeItem("cart");
            dispatch(setCart(null));
        } else {
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(setCart(cart));
        }
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
export async function syncLocalCartService(userId, dispatch) {
    try {
        const localCart = localStorage.getItem("cart");
        const cart = JSON.parse(localCart);
        if (!cart) return false;
        const res = await privateRequest.put(`/cart/sync-local/${userId}`, {
            productList: cart.product_list || [],
        });
        dispatch(setCart(res.data));
        localStorage.removeItem("cart");
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
export async function getCartTotalService(dispatch, productList) {
    try {
        const res = await privateRequest.post(`/cart/total`, {
            productList,
        });
        dispatch(setCartTotal(res.data?.total));
        return true;
    } catch (error) {
        return false;
    }
}
