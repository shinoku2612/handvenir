import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        details: null,
        total: 0,
    },
    reducers: {
        setCart: (state, action) => {
            state.details = action.payload;
        },
        setCartTotal: (state, action) => {
            state.total = action.payload;
        },
        clearCart: (state) => {
            state.details = null;
        },
    },
});

export const { setCart, setCartTotal, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
