// [GLOBAL SELECTOR]
export const getToast = (state) => state.global.toast;
export const getIsLoading = (state) => state.global.isLoading;
// [AUTHENTICATION SELECTOR]
export const getUserId = (state) => state.authentication.userId;
// [USER SELETOR]
export const getUser = (state) => state.user.information;
// [CART SELETOR]
export const getCart = (state) => state.cart.details;
export const getCartTotal = (state) => state.cart.total;
