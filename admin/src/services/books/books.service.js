import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../customBaseQuery";

export const booksAPi = createApi({
  reducerPath: "booksApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ search, limit, page }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        return {
          url: `/books?${params.toString()}`,
        };
      },
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
    }),
    editBook: builder.mutation({
      query: ({ data, bookId }) => ({
        url: `/books/${bookId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = booksAPi;
