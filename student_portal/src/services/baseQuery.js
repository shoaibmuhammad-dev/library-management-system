import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import { getToken } from "../utils/getToken";
import { BASE_URL } from "../data/baseUrl";

let isErrorToastActive = false;

const showSingleToast = (message, options = {}) => {
  if (isErrorToastActive) return;

  isErrorToastActive = true;
  enqueueSnackbar(message, options);

  setTimeout(() => {
    isErrorToastActive = false;
  }, 3000);
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result?.error) {
    const status = result.error?.status;

    switch (status) {
      case 401:
        showSingleToast(
          result?.error?.data?.message ||
            result?.data?.message ||
            "Session expired. Please log in again.",
          {
            variant: "error",
          },
        );
        Cookies.remove("studentToken");
        Cookies.remove("studentInfo");
        if (typeof window !== "undefined") {
          window.location.replace("/login");
        }
        break;

      case 400:
        showSingleToast(
          result?.error?.data?.message || "Something went wrong.",
          { variant: "error" },
        );
        break;

      case 403:
        showSingleToast(
          result?.error?.data?.message ||
            result?.data?.message ||
            "You do not have permission.",
          { variant: "error" },
        );
        // Cookies.remove("studentToken");
        // Cookies.remove("studentInfo");
        break;

      case 404:
        showSingleToast(
          result?.error?.data?.message ||
            result?.data?.message ||
            "Resource not found.",
          {
            variant: "error",
          },
        );
        break;

      case 500:
        showSingleToast(
          result?.error?.data?.message ||
            result?.data?.message ||
            "Server error occurred.",
          { variant: "error" },
        );
        break;

      default:
        showSingleToast(
          result?.error?.data?.message ||
            result?.data?.message ||
            "Something went wrong!",
          { variant: "error" },
        );
        break;
    }
  }

  return result;
};
