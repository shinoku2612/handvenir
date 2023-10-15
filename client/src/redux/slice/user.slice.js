import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        information: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.information = action.payload;
            if ("addresses" in state.information) {
                const mainAddress = state.information.addresses.find(
                    (item) => item.isMain === true,
                );
                if (mainAddress) {
                    const addressLine = [
                        mainAddress.street,
                        mainAddress.town,
                        mainAddress.district,
                        mainAddress.city,
                        mainAddress.country,
                    ];
                    state.information.mainAddress = addressLine.join(", ");
                }
            }
        },
        clearUser: (state) => {
            state.information = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
