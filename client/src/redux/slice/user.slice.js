import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        address: [
            {
                _id: 1,
                country: 'Vietnam',
                city: 'Ho Chi Minh',
                district: 'Thu Duc',
                town: 'Linh Trung',
                street: '01 Vo Van Ngan',
                isMain: true,
            },
            {
                _id: 2,
                country: 'Japan',
                city: 'Tokyo',
                district: 'Haido',
                town: 'Beika',
                street: '221B Beika',
                isMain: false,
            },
        ],
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
        addUserAddress: (state, action) => {
            state.address.push(action.payload);
        },
        setMainAddress: (state, action) => {
            const mainAddress = state.address.find(
                (addr) => addr.isMain === true,
            );
            if (mainAddress) mainAddress.isMain = false;
            const updatedAddressId = action.payload;
            const updatedAddress = state.address.find(
                (addr) => addr._id === updatedAddressId,
            );
            updatedAddress.isMain = true;
        },
        deleteUserAddress: (state, action) => {
            const deletedAddressId = action.payload;
            const deletedAddressIndex = state.address.findIndex(
                (addr) => addr._id === deletedAddressId,
            );
            state.address.splice(deletedAddressIndex, 1);
        },
    },
});

export const { setUser, addUserAddress, setMainAddress, deleteUserAddress } =
    userSlice.actions;
export default userSlice.reducer;
