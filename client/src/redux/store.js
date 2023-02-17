import { configureStore, combineReducers } from '@reduxjs/toolkit';
import globalSlice from './slice/global.slice';
import userSlice from './slice/user.slice';

const rootReducer = combineReducers({
    global: globalSlice,
    user: userSlice,
});
export const Store = configureStore({
    reducer: rootReducer,
});
