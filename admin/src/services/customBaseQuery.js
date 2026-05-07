import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { DEV_BASE_URL } from "../api/api";
import { enqueueSnackbar } from "notistack";

export const customBaseQuery = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: DEV_BASE_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("adminToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  console.log(`result >> `, result);

  if (result?.error) {
    const status = result.error?.status;

    switch (status) {
      case 401:
        enqueueSnackbar("Session expired. Please log in again.", {
          variant: "error",
        });
        Cookies.remove("adminToken");
        Cookies.remove("adminData");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        break;

      case 400:
        enqueueSnackbar(
          result?.error?.data?.error ||
            result?.error?.data?.message ||
            "Something went wrong.",
          {
            variant: "error",
          },
        );
        console.warn("fwefew");
        break;

      case 403:
        enqueueSnackbar(
          result?.error?.data?.message ||
            result?.error?.data?.error ||
            "You do not have permission.",
          {
            variant: "error",
          },
        );
        console.warn("Forbidden: You do not have permission.");
        break;

      case 404:
        enqueueSnackbar(
          result?.error?.message ||
            result?.error?.data?.message ||
            "Oops! Resource not found!",
          {
            variant: "error",
          },
        );
        console.warn("Resource not found.");
        break;

      case 500:
        enqueueSnackbar(
          result?.error?.message ||
            result?.error?.data?.message ||
            "Something went wrong!",
          {
            variant: "error",
          },
        );
        console.error("Server error occurred.");
        break;

      default:
        enqueueSnackbar(
          result?.error?.data?.message ||
            result?.error?.message ||
            result?.error?.data?.error ||
            "Something went wrong!",
          {
            variant: "error",
          },
        );
        console.error("Unhandled API error:", result.error);
        break;
    }
  }

  return result;
};
