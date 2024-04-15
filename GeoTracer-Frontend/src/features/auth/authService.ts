import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import api from '../../app/api';

// Define types for the user input
interface UserSigninCredentials {
    email: string;
    password: string;
}

interface UserSigninReturn {
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

export const authService = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserRegistration, UserRegistration>({
      query: (user) => ({
        url: 'users/register/',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation<UserSigninCredentials, UserSigninCredentials>({
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
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authService;
