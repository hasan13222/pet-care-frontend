import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";

// import authReducer from './features/authSlice'
// import bikeReducer from './features/bikeSlice'
// import compareReducer from './features/compareSlice'
// import couponReducer from './features/couponSlice'
// import { imageUploadApi } from "./api/imageUploadApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // [imageUploadApi.reducerPath]: imageUploadApi.reducer,
    // authReducer: authReducer,
    // bikeReducer: bikeReducer,
    // compareReducer: compareReducer,
    // couponReducer: couponReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;