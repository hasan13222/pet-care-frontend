import { baseApi } from "./baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getMyPosts: builder.query({
    //   query: (token) => ({
    //     url: "/api/posts/my-post",
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    //   providesTags: ["posts"],
    // }),
    getUserPosts: builder.query({
      query: (payload) => ({
        url: `/api/posts/${payload.userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      providesTags: ["posts"],
    }),
    getAllPosts: builder.query({
      query: (payload) => ({
        url: "/api/posts",
        method: "GET",
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
        params: { limit: payload.limit },
      }),
      providesTags: ["allposts"],
    }),
    createPost: builder.mutation({
      query: (payload) => ({
        url: `/api/posts`,
        method: "POST",
        body: payload.postBody,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      invalidatesTags: ["posts", "allposts",],
    }),
    updatePost: builder.mutation({
      query: (payload) => ({
        url: `/api/posts/${payload.postId}`,
        method: "PATCH",
        body: payload.postBody,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      invalidatesTags: ["posts", "allposts",],
    }),
    interactPost: builder.mutation({
      query: (payload) => ({
        url: `/api/posts/${payload.postId}/interact`,
        method: "PATCH",
        body: payload.postBody,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
        params: payload.query,
      }),
      invalidatesTags: ["posts", "allposts"],
    }),
    paymentPost: builder.mutation({
      query: (payload) => ({
        url: `/api/posts/${payload.postId}/payment`,
        method: "PATCH",
        body: payload.postBody,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      invalidatesTags: ["posts", "allposts"],
    }),
    deletePost: builder.mutation({
      query: (payload) => ({
        url: `/api/posts/${payload.postId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      invalidatesTags: ["posts", "allposts"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetMyPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useInteractPostMutation,
  usePaymentPostMutation,
  useGetUserPostsQuery
} = postApi;
