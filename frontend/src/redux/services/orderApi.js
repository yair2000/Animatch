import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1"
  }),
  tagTypes: ["Order"],
  endpoints: (builder) =>({
    createNewOrder: builder.mutation({
      query(body){
        return{
          url: "/order/new",
          method: "POST",
          body
        }
      }
    }),
    myOrders: builder.query({
      query: () => "/profile/orders"
    }),
    orderDetails: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: ["Order"]
    }),
    getDashboardSales: builder.query({
      query: ({ startDate, endDate }) =>
        `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
    }),
    checkoutSession: builder.mutation({
      query(body){
        return{
          url: "/payment/checkout",
          method: "POST",
          body
        }
      }
    }),
    getAdminOrders: builder.query({
      query: () => "/admin/orders",
      providesTags: ["Order"]
    }),
    updateOrder: builder.mutation({
      query({ body, id }){
        return{
          url: `/admin/order/${id}`,
          method: "PUT",
          body
        }
      },
      invalidatesTags: ["Order"]
    }),
    deleteOrder: builder.mutation({
      query(id){
        return{
          url: `/admin/order/${id}`,
          method: "DELETE"
        }
      },
      invalidatesTags: ["Order"]
    })
  }),
});

export const {
  useCreateNewOrderMutation,
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useLazyGetDashboardSalesQuery,
  useCheckoutSessionMutation,
  useGetAdminOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation
} = orderAPI;