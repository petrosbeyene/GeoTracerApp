import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.99.209:8000/api/v1/' }),
  endpoints: (builder) => ({}),
});

export default api;
