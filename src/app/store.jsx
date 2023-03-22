import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authSlice";
import { apiSlice } from "./api/authApi";
import messageReducer from "../features/message/messageSlice";


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    message: messageReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(apiSlice.middleware),
  devTools: true,
});