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

    updateUser: builder.mutation({
      query: ({id, data}) => ({
        url: `users/edit/${id}`,
        method: "PUT",
        body: data
      }),

      providesTags: ['updateUser'],
      transformResponse: (response, meta, args) => response.data
    }),
  }),
});

export const { useGetAllUserQuery, useCreateUserChatMutation, useUpdateUserMutation } = userApi