import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["User"], // ✅ important

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/users/profile",
      }),
      providesTags: ["User"], // ✅ cache
    }),

    // ✅ NEW MUTATION
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/users/edit-profile",
        method: "PUT",
        body: formData,
      }),

      // ✅ auto refetch profile
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation, // ✅ export
} = authApi;
