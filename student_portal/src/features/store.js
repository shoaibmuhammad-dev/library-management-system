import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bookApi } from "../services/bookApi";
import { requestApi } from "../services/requestApi";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [requestApi.reducerPath]: requestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      bookApi.middleware,
      requestApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
