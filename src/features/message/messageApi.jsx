import { apiSlice } from "../../app/api/authApi";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessageByIdChat: builder.query({
      query: (id) => ({
        url: `messages/chat/${id}`,
      }),

      transformResponse: (response, meta, args) => response.data
    }),

    sendMessage: builder.mutation({
      query: ({chatId, data}) => ({
        url: `messages/${chatId}`,
        method: `PUT`,
        body: data,
      }),

      invalidatesTags: ['getUserChat'],
      transformResponse: (response, meta, args) => response.data
    }),
  }),
});

export const { useGetMessageByIdChatQuery, useSendMessageMutation } = messageApi