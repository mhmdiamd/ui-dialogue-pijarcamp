import { apiSlice } from "../../app/api/authApi";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ name }) => ({
        url: `users?name=${name}`,
      }),

      providesTags: ['getAllUser'],
      transformResponse: (response, meta, args) => response.data
    }),

    createUserChat: builder.mutation({
      query: (data) => ({
        url: `user-chats`,
        method: "POST",
        body: data
      }),

      providesTags: ['createUserChat'],
      transformResponse: (response, meta, args) => response.data
    }),
  }),
});

export const { useGetAllUserQuery, useCreateUserChatMutation } = userApi