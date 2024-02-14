import { selectAuthenticatedUser } from '@/lib/auth/reducer';
import { createAppAsyncThunk } from '@/lib/create-app-thunk';
import { createAction } from '@reduxjs/toolkit';
import { selectIsUserWatchBoxLoading } from '../slices/watch-boxes.slice';

export const getAuthUserWatchBoxPending = createAction<{ authUser: string }>(
  'watchBoxes/getAuthUserWatchBoxPending'
);

export const getAuthUserWatchBox = createAppAsyncThunk(
  'watchBoxes/getAuthUserWatchBox',
  async (_, { extra: { watchBoxesGateway }, dispatch, getState }) => {
    const authUser = selectAuthenticatedUser(getState());
    dispatch(getAuthUserWatchBoxPending({ authUser }));
    const { watchBox } = await watchBoxesGateway.getUserWatchBox({ userId: authUser });
    return watchBox;
  },
  {
    condition(_, { getState }) {
      const authUser = selectAuthenticatedUser(getState());
      const isWatchBoxLoading = selectIsUserWatchBoxLoading(authUser, getState());
      return !isWatchBoxLoading;
    }
  }
);
