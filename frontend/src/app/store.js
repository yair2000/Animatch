import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import userSlice from "../reducers/userSlice";
import { productSlice, productDetailsSlice } from "../reducers/product/productSlice";
import { authSlice, userDetailsSlice, updateUserSlice, forgotPasswordSlice, allUsersSlice } from "../reducers/user/userReducer";
import api from "../services/api";

const reducer = combineReducers({
    user: userSlice,
    auth: authSlice,
    products: productSlice,
    productDetails: productDetailsSlice,
    update: updateUserSlice,
    allUsers: allUsersSlice,
    userDetails: userDetailsSlice,
    forgotPassword: forgotPasswordSlice,
    [api.reducerPath]: api.reducer
});

let initialState = {} // Get all the information from the Store page

const persistConfig = {
    key: "root",
    storage,
    blackList: [api.reducerPath]
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Creating The Store
const store = configureStore({
    reducer: persistedReducer,
    initialState,
    middleware: [thunk, api.middleware]
});

export default store;