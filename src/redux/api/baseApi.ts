import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pet-care-server-nu.vercel.app",
  }),
  tagTypes: ["posts", "userProfile", "users", "checkLogin", "allposts", "otherUserProfile"],
  endpoints: () => ({}),
});