import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../customBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,

  // Define tag types
  tagTypes: ["User", "Users"],

  endpoints: (builder) => ({
    // LOGIN
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

      // Refetch profile after login
      invalidatesTags: ["User"],
    }),

    // PROFILE
    getProfile: builder.query({
      query: () => "/users/profile",

      // Cache single user
      providesTags: ["User"],
    }),

    // USERS LIST
    getUsers: builder.query({
      query: ({ search, page, limit, skip, status }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (skip) params.append("skip", skip);

        return {
          url: `/users?${params.toString()}`,
        };
      },

      // Tag list + individual users
      providesTags: (result) =>
        result?.users
          ? [
              ...result.users.map((user) => ({
                type: "Users",
                id: user._id,
              })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),

    // UPDATE USER STATUS
    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/users/${userId}/status`,
        method: "PUT",
        body: { status },
      }),

      // Invalidate specific user + list
      invalidatesTags: (result, error, { userId }) => [
        { type: "Users", id: userId },
        { type: "Users", id: "LIST" },
        "User", // if profile updated
      ],
    }),

    // DELETE USER
    deleteUserAccount: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),

      // Remove from cache + refetch list
      invalidatesTags: (result, error, { userId }) => [
        { type: "Users", id: userId },
        { type: "Users", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useDeleteUserAccountMutation,
} = authApi;
