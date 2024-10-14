import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/login",
        method: "POST",
        body: payload,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["checkLogin"],
    }),
    checkLogin: builder.query({
      query: (token) => ({
        url: "/api/auth/check-login",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["checkLogin"],
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/change-password",
        method: "POST",
        credentials: "include",
        body: payload.postBody,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      invalidatesTags: ["checkLogin"]
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/reset-password",
        method: "POST",
        body: payload.postBody,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      invalidatesTags: ["checkLogin"]
    }),
    forgetPassword: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/forget-password",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["checkLogin"]
    }),
    logout: builder.query({
      query: () => ({
        url: "/api/auth/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useCheckLoginQuery,
  useLazyLogoutQuery,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation
} = authApi;
