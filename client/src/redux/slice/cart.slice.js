import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        details: null,
    },
    reducers: {
        setCart: (state, action) => {
            state.details = action.payload;
        },
        clearCart: (state) => {
            state.details = null;
        },
    },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
