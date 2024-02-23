import { createAppAsyncThunk } from '@/lib/create-app-thunk';
import { createAction } from '@reduxjs/toolkit';

export const getUserWatchBoxPending = createAction<{ userId: string }>('watchBoxes/getUserWatchBoxPending');

export const getUserWatchBox = createAppAsyncThunk(
  'watchBoxes/getUserWatchBox',
  async (params: { userId: string }, { extra: { watchBoxesGateway } }) => {
    const { watchBox } = await watchBoxesGateway.getUserWatchBox({ userId: params.userId });
    return watchBox;
  }
  // {
  //   condition(_, { getState }) {
  //     const authUser = selectAuthenticatedUser(getState());
  //     const isWatchBoxLoading = selectIsUserWatchBoxLoading(authUser, getState());
  //     return !isWatchBoxLoading;
  //   }
  // }
);
