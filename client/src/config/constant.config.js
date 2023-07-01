export const OTP_LIFE_TIME = 90;

export const PATH = {
    auth: "auth",
    register: "register",
    login: "login",
    profile: {
        index: "me",
        address: "address",
        credit: "credit-card",
        history: "history",
        shopRegister: "shop-register",
        shop: "my-shop",
    },
    products: "products",
    productDetail: "product/:slug",
    cart: "my-cart",
    payment: {
        index: "order",
        result: "payment-result",
    },
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
    { label: "Lowest price" },
    { label: "Highest price" },
    { label: "Newest" },
];
