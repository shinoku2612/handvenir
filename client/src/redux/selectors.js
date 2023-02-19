// [GLOBAL SELECTOR]
export const getToast = (state) => state.global.toast;
// [AUTHENTICATION SELECTOR]
export const getUserId = (state) => state.authentication.userId;
// [USER SELETOR]
export const getUser = (state) => state.user.currentUser;
export const getUserAddress = (state) => state.user.address;
