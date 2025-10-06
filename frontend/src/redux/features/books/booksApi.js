import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});
const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    fetchAllBooks: builder.query({
      query: () => "/",
      providedTags: ["Books"],
    }),
    fetchBookById: builder.query({
      query: (id) => `/${id}`,
      providedTags: (result, error, id) => [{ type: "Books", id }],
    }),
    addBook: builder.mutation({
      query: (newBook) => {
        const formData = new FormData();
        // Append text fields
        Object.keys(newBook).forEach((key) => {
          formData.append(key, newBook[key]);
        });

        return {
          url: "/create-book",
          method: "POST",
          body: formData
        };
      },
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...rest }) => {
        const formData = new FormData();
        // Append text fields
        Object.keys(rest).forEach((key) => {
          formData.append(key, rest[key]);
        });
        return {
        url: `/edit/${id}`,
        method: "PUT",
        body: formData,
      };},
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useFetchAllBooksQuery,
  useFetchBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
export default booksApi;
