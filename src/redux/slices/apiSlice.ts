import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  ApiSuccessResponse,
  ApiErrorResponse,
  UserDto,
  SessionDto,
  TaskDto,
} from '@@external-models/types';
import {
  ApiRequest,
  Credentials,
  SignupUser,
  User,
  Session,
  Task,
} from '@@/models/types';
import { RootState } from '@@/redux/store';

const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, api) => {
      const accessToken = (api.getState() as RootState).loggedUser?.accessToken;

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<string, Credentials>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiSuccessResponse<string>) =>
        response.data, // returns the accessToken
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
    signup: builder.mutation<void, SignupUser>({
      query: (body) => ({
        url: '/users/signup',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
    getMySession: builder.query<Session, void>({
      query: () => '/users/me',
      forceRefetch: () => true,
      transformResponse: (response: ApiSuccessResponse<SessionDto>) =>
        response.data,
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
    getUsers: builder.query<User[], object>({
      query: (params) => ({
        url: '/users',
        params, // query parameters (e.g.: filters, pagination)
      }),
      transformResponse: (response: ApiSuccessResponse<UserDto[]>) =>
        response.data,
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: ApiSuccessResponse<UserDto>) =>
        response.data,
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
    createUser: builder.mutation<void, User>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
    updateUser: builder.mutation<void, ApiRequest<User>>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
    getMyTasks: builder.query<Task[], void>({
      query: () => `/tasks`,
      transformResponse: (response: ApiSuccessResponse<TaskDto[]>) =>
        response.data,
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
    getMyTask: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      transformResponse: (response: ApiSuccessResponse<TaskDto>) =>
        response.data,
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
    createTask: builder.mutation<void, Task>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
    updateMyTask: builder.mutation<void, ApiRequest<Task>>({
      query: ({ id, body }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body,
      }),
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
    deleteMyTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: (response: ApiErrorResponse) => response.data,
    }),
  }),
});

// Auto-generated hooks
export const {
  useLoginMutation,
  useSignupMutation,
  useGetMySessionQuery,

  useLazyGetUsersQuery,
  useLazyGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,

  useGetMyTasksQuery,
  useGetMyTaskQuery,
  useCreateTaskMutation,
  useUpdateMyTaskMutation,
  useDeleteMyTaskMutation,
} = apiSlice;

export default apiSlice;

// Selectors
// const selectUrgentTask = createSelector([(state) => state.tasks], (tasks) =>
//   tasks.filter((taks) => task.priority === TaskPriority.urgent)
// );
