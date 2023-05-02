import { createSlice } from '@reduxjs/toolkit';

import { LoggedUser } from '@@/models/types';
import apiSlice from '@@/redux/slices/apiSlice';

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: null as LoggedUser | null,
  reducers: {
    localAccessTokenFound: (state, action) => {
      // starts a clean state object only with the accessToken
      state = {
        accessToken: action.payload,
      };
    },
    updatesModeChanged: (state, action) => {
      if (state) {
        state.updatesMode = action.payload;
      }
    },
    updatesJustChecked: (state) => {
      if (state) {
        state.updatesLastTimeCheck = new Date().toISOString();
      }
    },
    loggedOut: (state) => {
      // completely clear the state (make it "null")
      if (state) {
        state = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
        if (state) {
          // save the token in the Redux store (to be easily accessed/available)
          state.accessToken = action.payload;

          // also, save the token in Local Storage (to be persisted after the page refresh/close)
          window.localStorage.setItem('accessToken', action.payload);
        }
      })
      .addMatcher(
        apiSlice.endpoints.getMySession.matchFulfilled,
        (state, action) => {
          if (state) {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.photoUrl = action.payload.photoUrl;
            state.permissions = action.payload.permissions;
            state.theme = action.payload.theme;
          }
        }
      )
      .addMatcher(
        apiSlice.endpoints.getMySession.matchRejected,
        (state, action) => {
          if (state && action.error.code === '401') {
            // clear the logged user and remove the accessToken from Local Storage
            state = null;
            window.localStorage.removeItem('accessToken');
          }
        }
      );
  },
});

export const { localAccessTokenFound } = loggedUserSlice.actions;

export default loggedUserSlice;
