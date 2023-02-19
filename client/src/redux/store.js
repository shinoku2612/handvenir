import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authenticationSlice from './slice/authentication.slice';
import globalSlice from './slice/global.slice';
import userSlice from './slice/user.slice';

const rootReducer = combineReducers({
    global: globalSlice,
    user: userSlice,
    authentication: authenticationSlice,
});
export const Store = configureStore({
    reducer: rootReducer,
});
