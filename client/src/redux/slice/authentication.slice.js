import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    name: "authentication",
    initialState: {
        userId: JSON.parse(localStorage.getItem("userId")) || "",
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload;
            localStorage.setItem("userId", JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userId = "";
            localStorage.removeItem("userId");
        },
    },
});

export const { login, logout } = globalSlice.actions;
export default globalSlice.reducer;
