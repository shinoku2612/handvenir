import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        toast: {
            show: false,
            type: '',
            message: '',
        },
    },
    reducers: {
        setToast: (state, action) => {
            state.toast = action.payload;
        },
    },
});

export const { setToast } = globalSlice.actions;
export default globalSlice.reducer;
