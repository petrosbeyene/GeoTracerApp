// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { getToken } from '../utils/authToken';

// const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ 
//       baseUrl: 'http://192.168.99.209:8000/api/v1/',
//       prepareHeaders: async (headers) => {
//         const token = await getToken();
//         if (token) {
//           headers.set('Authorization', `Bearer ${token}`);
//         }
//         return headers;
//       },
//    }),
//   endpoints: (builder) => ({}),
// });

// export default api;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

async function refreshToken() {
  const response = await fetch('http://192.168.99.209:8000/api/v1/dj-rest-auth/token/refresh/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (response.ok) {
    await SecureStore.setItemAsync('userToken', data.access);
    return data.access;
  } else {
    throw new Error('Unable to refresh token');
  }
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.99.209:8000/api/v1/',
  prepareHeaders: async (headers) => {
    let token = await SecureStore.getItemAsync('userToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const api = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      try {
        const newToken = await refreshToken();
        // console.log(newToken)
        if (newToken) {
          if (!args.headers) args.headers = new Headers();
          args.headers.set('Authorization', `Bearer ${newToken}`);
          result = await baseQuery(args, api, extraOptions);
          console.log('retry succeed!')
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    }
    return result;
  },
  endpoints: (builder) => ({}),
});

export default api;
