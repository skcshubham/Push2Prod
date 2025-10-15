import type { AuthResponse, LoginData, SignUpData } from "../types/auth.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User } from "../types/user.types";

const API_BASE_URL = "http://localhost:8000";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignUpData>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation<AuthResponse, LoginData>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    getUser: builder.query<{ message: string; data: User }, void>({
      query: () => ({
        url: "/profile/view",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<{ message: string; data: User }, Partial<User>>({
      query: (data) => ({
        url: "/profile/edit",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = api;
