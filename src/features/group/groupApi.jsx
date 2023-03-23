import { apiSlice } from "../../app/api/authApi";

export const groupApi = apiSlice.injectEndpoints({
  tagTypes: ['createGroup'],
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query: (data) => ({
        url: `groups`,
        method: "POST",
        body: data
      }),

      providesTags: ['createGroup'],
      transformResponse: (response, meta, args) => response.data
    }),

    getGroupUser: builder.query({
      query: () => ({
        url: `groups`,
      }),

      providesTags: ['getGroupUser'],
      transformResponse: (response, meta, args) => response.data
    }),
  }),
});

export const { useCreateGroupMutation, useGetGroupUserQuery } = groupApi