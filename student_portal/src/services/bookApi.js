import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    // get all books query (pagination + limit + search)
    getBooks: builder.query({
      query: ({ page, limit, search, department }) => ({
        url: `/books`,
        params: {
          page,
          limit,
          ...(department && { department }),
          ...(search && { search }),
        },
      }),
      providesTags: ["Books"],
    }),

    // request borrow book
    requestBook: builder.mutation({
      query: ({ bookId }) => ({
        url: `/requests/${bookId}`,
        method: "POST",
      }),
      invalidatesTags: ["Books"],
    }),

    // get borrowed books
    getBorrowedBooks: builder.query({
      query: () => ({
        url: `/requests/borrowed`,
        method: "GET",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useRequestBookMutation,
  useGetBorrowedBooksQuery,
} = bookApi;
