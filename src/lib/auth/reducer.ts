import { authenticateWithGitHub } from '@/lib/auth/usecases/authenticate-user-with-github.usecase';
import { authenticateWithGoogle } from '@/lib/auth/usecases/authenticate-user-with-google.usecase';
import { RootState } from '@/lib/create-store';
import { createAction, createReducer } from '@reduxjs/toolkit';

export type AuthState = {
  authUser?: string;
};

export const userAuthenticated = createAction<{ authUser?: string }>('auth/userAuthenticated');

export const reducer = createReducer<AuthState>(
  {
    authUser: undefined
  },
  (builder) => {
    builder
      .addCase(userAuthenticated, (state, action) => {
        state.authUser = action.payload.authUser;
      })
      .addCase(authenticateWithGoogle.fulfilled, (state, action) => {
        state.authUser = action.payload;
      })
      .addCase(authenticateWithGitHub.fulfilled, (state, action) => {
        state.authUser = action.payload;
      });
  }
);

export const selectIsUserAuthenticated = (rootState: RootState) => Boolean(rootState.auth.authUser);
export const selectAuthenticatedUser = (rootState: RootState) => rootState.auth.authUser ?? '';
