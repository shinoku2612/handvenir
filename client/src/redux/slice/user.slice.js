import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        information: {
            email: "",
            name: "",
            phone: "",
            gender: "",
            date_of_birth: new Date().toISOString(),
            avatar: "",
            addresses: [],
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.information = action.payload;
        },
        clearUser: (state) => {
            state = state.initialState;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
