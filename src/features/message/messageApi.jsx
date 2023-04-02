import { apiSlice } from "../../app/api/authApi";

export const messageApi = apiSlice.injectEndpoints({
  tagTypes: ['getMessageByIdChat'],
  endpoints: (builder) => ({
    getMessageByIdChat: builder.query({
      query: (id) => ({
        url: `messages/chat/${id}`,
      }),

      providesTags: [`getMessageByIdChat`],
      transformResponse: (response, meta, args) => response.data
    }),

    deleteMessageById: builder.mutation({
      query: ({ id_room, id_message }) => ({
        url: `messages/chat/delete/${id_room}`,
        method: "PUT",
        body: { id_message }
      }),

      invalidatesTags: ["getMessageByIdChat"],
      transformResponse: (response, meta, args) => response.data
    }),

    updateMessageById: builder.mutation({
      query: ({ id_room, id_message,text }) => ({
        url: `messages/chat/edit/${id_room}`,
        method: "PUT",
        body: { id_message, text }
      }),

      invalidatesTags: ["getMessageByIdChat"],
      transformResponse: (response, meta, args) => response.data
    }),

    sendMessage: builder.mutation({
      query: ({ chatId, data }) => {
        return {
          url: `messages/${chatId}`,
          method: `PUT`,
          body: data,
        }
      },

      providesTags: ['sendMessage'],
      invalidatesTags: ["getMessageByIdChat", "getUserChat"],
      transformResponse: (response, meta, args) => response.data
    }),
  }),
});

export const { useGetMessageByIdChatQuery, useSendMessageMutation, useDeleteMessageByIdMutation, useUpdateMessageByIdMutation } = messageApi