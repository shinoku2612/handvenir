import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
    name: 'authentication',
    initialState: {
        userId: '',
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload;
        },
    },
});

export const { login } = globalSlice.actions;
export default globalSlice.reducer;
