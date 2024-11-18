import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getProfile: builder.query({
    //   query: (token) => ({
    //     url: "/api/users/me",
    //     method: "GET",
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     }
    //   }),
    //   providesTags: ["userProfile"]
    // }),
    // getUserProfile: builder.query({
    //   query: (payload) => ({
    //     url: `/api/users/${payload.userId}`,
    //     method: "GET",
    //     headers: {
    //         'Authorization': `Bearer ${payload.token}`
    //     }
    //   }),
    //   providesTags: ["userProfile"]
    // }),
    // deleteUser: builder.mutation({
    //   query: (payload) => ({
    //     url: `/api/users/${payload.userId}`,
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `Bearer ${payload.token}`,
    //     },
    //   }),
    //   invalidatesTags: ["users"],
    // }),
    // getAllUser: builder.query({
    //   query: (token) => ({
    //     url: "/api/users",
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    //   providesTags: ["users"],
    // }),
    // promoteUser: builder.mutation({
    //   query: (payload) => ({
    //     url: `/api/users/${payload.userId}/promote`,
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${payload.token}`,
    //     },
    //   }),
    //   invalidatesTags: ["users"],
    // }),
    // followUser: builder.mutation({
    //   query: (payload) => ({
    //     url: `/api/users/${payload.userId}/follow`,
    //     method: "PATCH",
    //     body: payload.postBody,
    //     headers: {
    //       Authorization: `Bearer ${payload.token}`,
    //     },
    //   }),
    //   invalidatesTags: ["checkLogin"],
    // }),
    // unfollowUser: builder.mutation({
    //   query: (payload) => ({
    //     url: `/api/users/${payload.userId}/unfollow`,
    //     method: "PATCH",
    //     body: payload.postBody,
    //     headers: {
    //       Authorization: `Bearer ${payload.token}`,
    //     },
    //   }),
    //   invalidatesTags: ["checkLogin"],
    // }),
    // updateProfile: builder.mutation({
    //   query: (payload) => ({
    //     url: "/api/users/me",
    //     method: "PUT",
    //     body: payload.updateInfo,
    //     headers: {
    //       Authorization: `Bearer ${payload.token}`,
    //     },
    //   }),
    //   invalidatesTags: ["userProfile"],
    // }),
  }),
});

export const {
  // useGetProfileQuery,
  // useGetUserProfileQuery,
  // useUpdateProfileMutation,
  // useUnfollowUserMutation,
  // useGetAllUserQuery,
  // useDeleteUserMutation,
  // usePromoteUserMutation,
  // useFollowUserMutation,
} = userApi;
