import { apiSlice } from "../../app/api/authApi";

export const messageApi = apiSlice.injectEndpoints({
  tagTypes: ['getMessageByIdChat'],
  endpoints: (builder) => ({
    getMessageByIdChat: builder.query({
      query: (id) => ({
        url: `messages/chat/${id}`,
      }),

      providesTags:[`getMessageByIdChat`],
      invalidatesTags:[`getMessageByIdChat`],
      transformResponse: (response, meta, args) => response.data
    }),

    sendMessage: builder.mutation({
      query: ({chatId, data}) => ({
        url: `messages/${chatId}`,
        method: `PUT`,
        body: data,
      }),

      invalidatesTags: ['getUserChat', "getMessageByIdChat"],
      transformResponse: (response, meta, args) => response.data
    }),
  }),
});

export const { useGetMessageByIdChatQuery, useSendMessageMutation } = messageApi