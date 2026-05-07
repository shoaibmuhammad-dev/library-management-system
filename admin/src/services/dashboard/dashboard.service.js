import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../customBaseQuery";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => `/dashboard/stats`,
    }),
  }),
});

export const { useGetStatsQuery } = dashboardApi;
