import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../customBaseQuery";

export const requestApi = createApi({
  reducerPath: "requestApi",
  baseQuery: customBaseQuery,

  tagTypes: ["Requests"],

  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,

  endpoints: (builder) => ({
    getRequests: builder.query({
      query: ({ search, page, limit, skip, status }) => {
        const params = new URLSearchParams();

        if (search) params.append(`search`, search);
        if (status) params.append("status", status);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (skip) params.append("skip", skip);

        return {
          url: `/requests?${params.toString()}`,
        };
      },

      keepUnusedDataFor: 0,

      providesTags: (result) => {
        if (!result) return [{ type: "Requests", id: "LIST" }];

        const requests = Array.isArray(result) ? result : result.data;

        return [
          ...requests.map(({ _id }) => ({
            type: "Requests",
            id: _id,
          })),
          { type: "Requests", id: "LIST" },
        ];
      },
    }),

    updateRequestStatus: builder.mutation({
      query: ({ requestId, status }) => ({
        url: `/requests/${requestId}/status`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: (result, error, { requestId }) => [
        { type: "Requests", id: requestId },
        { type: "Requests", id: "LIST" },
      ],
    }),

    deleteRequest: builder.mutation({
      query: ({ userId }) => ({
        url: `/requests/${userId}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, { userId }) => [
        { type: "Requests", id: userId },
        { type: "Requests", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useUpdateRequestStatusMutation,
  useDeleteRequestMutation,
} = requestApi;
