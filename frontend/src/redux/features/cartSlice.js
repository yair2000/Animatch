import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  cart: localStorage.getItem("Products") ? JSON.parse(localStorage.getItem("Products")) : [],
  shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
}

export const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {
    setCartProduct(state, action){
      const item = action.payload;
      
      const isItemExists = state.cart.find((i) => i.product === item.product);

      // If there's a new product,
      // it will be added to the cart. If added an existing one, only its quantity value will be updated
      if(isItemExists){
        state.cart = state.cart.map( // item - new product | i - existing product
          (i) => i.product === isItemExists.product ? item : i
        )
      }
      else{
        state.cart = [...state.cart, item]
      }

      localStorage.setItem("Products", JSON.stringify(state.cart));
    },
    removeCartProduct: (state, action) =>{
      state.cart = state?.cart?.filter((i) => i.product !== action.payload);
      localStorage.setItem("Products", JSON.stringify(state.cart));
    },
    clearCart: (state, action) =>{
      localStorage.removeItem("Products");
      state.cart = [];
    },
    saveShippingInfo: (state, action) =>{
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  }
});

export const { setCartProduct, removeCartProduct, clearCart, saveShippingInfo } = cartSlice.actions
export default cartSlice.reducer;