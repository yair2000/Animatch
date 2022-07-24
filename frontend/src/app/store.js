import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import userSlice from "../reducers/userSlice";
import { productSlice, productDetailsSlice } from "../reducers/product/productSlice";
import { authSlice, updateUserSlice } from "../reducers/user/userReducer";
import { cartSlice } from "../reducers/cart/cartSlice";
import api from "../services/api";

const reducer = combineReducers({
    user: userSlice,
    auth: authSlice,
    products: productSlice,
    productDetails: productDetailsSlice,
    cart: cartSlice,
    update: updateUserSlice,
    [api.reducerPath]: api.reducer
});

let initialState = { // Get all the information from the Store page
    cart: {
       cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
}

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