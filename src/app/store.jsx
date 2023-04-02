import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authSlice";
import { apiSlice } from "./api/authApi";
import messageReducer from "../features/message/messageSlice";
import userReducer from "../features/user/userSlice";
import userChatReducer from "../features/userChat/userChatSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    message: messageReducer,
    user: userReducer,
    userChat: userChatReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(apiSlice.middleware),
  devTools: true,
});