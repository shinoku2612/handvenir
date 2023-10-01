export const OTP_LIFE_TIME = 90;

export const PATH = {
    auth: "auth",
    register: "register",
    login: "login",
    profile: {
        index: "me",
        address: "address",
        history: "order",
    },
    products: "products",
    productDetail: "product/:slug",
    cart: "my-cart",
    wishList: "favorite",
    payment: {
        index: "order",
        result: "payment-result",
    },
    orderDetail: "order/:orderId",
};

export const STATUS = {
    register: {
        start: "register-start",
        success: "register-success",
        failed: "register-failed",
    },
    login: {
        start: "login-start",
        success: "login-success",
        failed: "login-failed",
    },
    toast: {
        success: "success",
        failed: "danger",
    },
};
export const SORT = [
    { label: "None", value: "none" },
    { label: "Lowest price", value: "price_asc" },
    { label: "Highest price", value: "price_desc" },
];
