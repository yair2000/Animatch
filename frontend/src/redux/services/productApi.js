import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1"
  }),
  tagTypes: ["AdminProducts", "Product", "Reviews"],
  endpoints: (builder) =>({
    getProducts: builder.query({
      query: (params) =>({
        url: "/products",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          "rating[gte]": params?.rating,
          "price[gte]": params.min,
          "price[lte]": params.max
        }
      })
    }),
    getAdminProducts: builder.query({
      query: () => "/admin/products",
      providesTags: ["AdminProducts"]
    }),
    getProductDetails: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: ["Product"]
    }),
    createProduct: builder.mutation({
      query(body){
        return{
          url: "/product/new",
          method: "POST",
          body
        }
      },
      invalidatesTags: ["AdminProducts"]
    }),
    updateProduct: builder.mutation({
      query({ body, id }){
        return{
          url: `/admin/product/${id}`,
          method: "PUT",
          body
        }
      },
      invalidatesTags: ["AdminProducts", "Product"]
    }),
    deleteProduct: builder.mutation({
      query(id){
        return{
          url: `/admin/product/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["AdminProducts"]
    }),
    submitReview: builder.mutation({
      query(body){
        return{
          url: "/review",
          method: "PUT",
          body
        }
      },
      invalidatesTags: ["Product"]
    }),
    getProductReviews: builder.query({
      query: (productId) => `/review?id=${productId}`,
      providesTags: ["Reviews"]
    }),
    deleteProductReview: builder.mutation({
      query({ productId, id }){
        return{
          url: `/admin/reviews?productId=${productId}&id=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Reviews"]
    })
  })
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSubmitReviewMutation,
  useLazyGetProductReviewsQuery,
  useDeleteProductReviewMutation
} = productAPI;