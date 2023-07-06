import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authenticationSlice from "./slice/authentication.slice";
import globalSlice from "./slice/global.slice";
import userSlice from "./slice/user.slice";
import cartSlice from "./slice/cart.slice";

const rootReducer = combineReducers({
    global: globalSlice,
    user: userSlice,
    authentication: authenticationSlice,
    cart: cartSlice,
});
export const Store = configureStore({
    reducer: rootReducer,
});
