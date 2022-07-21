// Chat Reducer

import { createSlice, current } from "@reduxjs/toolkit";
import api from "../services/api"

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
      addNotifications: (state, {payload}) =>{
         // if(state.newMessages[payload]){
         //    state.newMessages[payload] = state.newMessages[payload] + 1
         // }
         // else{
         //    state.newMessages[payload] = 1
         // }
      },
      resetNotifications: (state, {payload}) =>{
         console.log(current(state));
      },
    },
    extraReducers: (builder) =>{
       builder.addMatcher(api.endpoints.regUser.matchFulfilled, (state, {payload}) => payload);
       builder.addMatcher(api.endpoints.logUser.matchFulfilled, (state, {payload}) => payload);
       builder.addMatcher(api.endpoints.updateUser.matchFulfilled, () => null);
       builder.addMatcher(api.endpoints.logOutUser.matchFulfilled, () => null);
    }
});

export const { addNotifications, resetNotifications } = userSlice.actions
export default userSlice.reducer;