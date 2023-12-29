import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { userAPI } from "../services/userApi";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1"
  }),
  endpoints: (builder) =>({
    regUser: builder.mutation({
      query(body){
        return{
          url: "/register",
          method: "POST",
          body
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }){
        try{
          await queryFulfilled;
          await dispatch(userAPI.endpoints.getCurrentUser.initiate(null))
        }
        catch(error){
          console.log(error);
        }
      },
    }),
    logUser: builder.mutation({
      query(body){
        return{
          url: "/login",
          method: "POST",
          body
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }){
        try{
          await queryFulfilled;
          await dispatch(userAPI.endpoints.getCurrentUser.initiate(null))
        }
        catch(error){
          console.log(error);
        }
      },
    }),
    logoutUser: builder.query({
      query: () => "/logout",
    }),
  }),
});

export const {
  useRegUserMutation,
  useLogUserMutation,
  useLazyLogoutUserQuery
} = authAPI;