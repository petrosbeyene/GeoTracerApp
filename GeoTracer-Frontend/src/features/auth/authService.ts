import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import api from '../../app/api';

// Define types for the user input
interface UserSigninCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    access: string;
}

interface UserRegistration {
    username: string;
    email: string;
    password1: string;
    password2: string;
    first_name: string;
    last_name: string;
}

interface ConfirmPasswordReset {
  uidb64: string;
  token: string;
  new_password1: string;
  new_password2: string;
}

export const authService = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserRegistration, UserRegistration>({
      query: (user) => ({
        url: 'users/register/',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation<LoginResponse, UserSigninCredentials>({
      query: (credentials) => ({
        url: 'dj-rest-auth/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'dj-rest-auth/logout/',
        method: 'POST',
      }),
    }),
    verifyEmail: builder.mutation<void, { token: string }>({
      query: (token) => ({
        url: `users/registration/account-confirm-email/${token}/`,
        method: 'GET',
      }),
    }),
    passwordReset: builder.mutation<void, { email: string }>({
      query: (email) => ({
        url: 'dj-rest-auth/password/reset/',
        method: 'POST',
        body: email,
      })
    }),
    confirmPasswordReset: builder.mutation({
      query: (data) => ({
        url: 'dj-rest-auth/password/reset/confirm/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, 
                useVerifyEmailMutation, usePasswordResetMutation,
                useConfirmPasswordResetMutation} = authService;
