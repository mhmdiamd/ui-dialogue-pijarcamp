import { apiSlice } from "../../app/api/authApi";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),

      transformResponse: (response, meta, args) => response,
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),

      transformResponse: (response, meta, args) => response,
    }),
    emailActivation: builder.query({
      query: (token) => ({
        url: `verification/${token}`,
      }),

      transformResponse: (response, meta, args) => response,
    }),

    getCurrentData: builder.query({
      query: () => ({
        url: `me`,
      }),

      transformResponse: (response, meta, args) => response.data,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useEmailActivationQuery, useGetCurrentDataQuery } = authApi