import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const appAPI = createApi({
    reducerPath: "appAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5001"
    }),
    endpoints: (builder) =>({
        regUser: builder.mutation({
            query: (user) =>({
                url: "/users",
                method: "POST",
                body: user
            })
        }),
        logUser: builder.mutation({
            query: (user) =>({
                url: "/users/login",
                method: "POST",
                body: user
            })
        }),
        logOutUser: builder.mutation({
            query: (payload) =>({
                url: "/logout",
                method: "DELETE",
                body: payload
            })
        }),
        // loadUser: builder.mutation({
        //     query: (user) =>({
        //         url: "/users/me",
        //         method: "GET",
        //         body: user
        //     })
        // }),
        updateUser: builder.mutation({
            query: (user) =>({
                url: "/users/update",
                method: "PUT",
                body: user
            })
        }),
        // forgotPassword: builder.mutation({
        //     query: (user) =>({
        //         url: "/password/forgot",
        //         method: "POST",
        //         body: user
        //     })
        // }),
        // newPassword: builder.mutation({
        //     query: (user) =>({
        //         url: "/password/reset/:token",
        //         method: "PUT",
        //         body: user
        //     })
        // }),
        // updatePassword: builder.mutation({
        //     query: (user) =>({
        //         url: "/password/update",
        //         method: "PUT",
        //         body: user
        //     })
        // }),
        // allUsers: builder.mutation({
        //     query: (user) =>({
        //         url: "/admin/userlist",
        //         method: "GET",
        //         body: user
        //     })
        // }),
        // oneUser: builder.mutation({
        //     query: (user) =>({
        //         url: "/admin/user/:id",
        //         method: "GET",
        //         body: user
        //     })
        // }),
        // adminUpdateUser: builder.mutation({
        //     query: (user) =>({
        //         url: "/admin/user/:id",
        //         method: "PUT",
        //         body: user
        //     })
        // }),
        // adminDeleteUser: builder.mutation({
        //     query: (payload) =>({
        //         url: "/admin/user/:id",
        //         method: "DELETE",
        //         body: payload
        //     })
        // })
    })
});

export const {
    useRegUserMutation,
    useLogUserMutation,
    useLogOutUserMutation,
    // useLoadUserMutation,
    useUpdateUserMutation,
    // useForgotPasswordMutation,
    // useNewPasswordMutation,
    // useUpdatePasswordMutation,
    // useAllUsersMutation,
    // useOneUserMutation,
    // useAdminUpdateUserMutation,
    // useAdminDeleteUserMutation
    } = appAPI;
export default appAPI;