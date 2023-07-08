import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    name: "global",
    initialState: {
        toast: {
            show: false,
            type: "",
            message: "",
        },
        isLoading: false,
    },
    reducers: {
        setToast: (state, action) => {
            state.toast = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setToast, setLoading } = globalSlice.actions;
export default globalSlice.reducer;
