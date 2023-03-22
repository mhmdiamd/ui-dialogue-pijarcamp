import { apiSlice } from "../../app/api/authApi";

export const userChatApi = apiSlice.injectEndpoints({
  tagTypes: ['getUserChat'],
  endpoints: (builder) => ({
    getUserChat: builder.query({
      query: () => ({
        url: "user-chats",
      }),

      providesTags: ['getUserChat'],
      transformResponse: (response, meta, args) => response.data
    }),
  }),
});

export const { useGetUserChatQuery } = userChatApi