import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        information: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.information = action.payload;
        },
        clearUser: (state) => {
            state.information = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
