import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setIsAuthenticated, setIsLoading, setUser } from "../features/userSlice";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1"
  }),
  tagTypes: ["AdminUser", "AdminUsers", "User"],
  endpoints: (builder) =>({
    getCurrentUser: builder.query({
      query: () => "/me",
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }){
        try{
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setIsLoading(false));
        }
        catch(error){
          dispatch(setIsLoading(false));
          console.log(error);
        }
      },
      providesTags: ["User"]
    }),
    updateProfile: builder.mutation({
      query(body){
        return{
          url: "/me/update",
          method: "PUT",
          body
        }
      },
      invalidatesTags: ["User"]
    }),
    updatePassword: builder.mutation({
      query(body){
        return{
          url: "/password/update",
          method: "PUT",
          body
        }
      }
    }),
    forgotPassword: builder.mutation({
      query(body){
        return{
          url: "/password/forgot",
          method: "POST",
          body
        }
      }
    }),
    resetPassword: builder.mutation({
      query({ token, body }){
        return{
          url: `/password/reset/${token}`,
          method: "PUT",
          body
        }
      }
    }),
    getAdminUsers: builder.query({
      query: () => "/admin/userlist",
      providesTags: ["AdminUsers"]
    }),
    getUserDetails: builder.query({
      query: (id) => `/admin/user/${id}`,
      providesTags: ["AdminUser"]
    }),
    updateUser: builder.mutation({
      query({ body, id }){
        return{
          url: `/admin/user/${id}`,
          method: "PUT",
          body
        }
      },
      invalidatesTags: ["AdminUsers"]
    }),
    deleteUser: builder.mutation({
      query(id){
        return{
          url: `/admin/user/${id}`,
          method: "DELETE"
        }
      },
      invalidatesTags: ["AdminUsers"]
    })
  })
});

export const {
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAdminUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userAPI;