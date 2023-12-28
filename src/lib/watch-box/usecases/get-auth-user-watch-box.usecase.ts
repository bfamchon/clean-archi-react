import { createAppAsyncThunk } from '@/lib/create-app-thunk';
import { createAction } from '@reduxjs/toolkit';

export const getAuthUserWatchBoxPending = createAction<{ authUser: string }>(
  'watchBoxes/getAuthUserWatchBoxPending'
);

export const getAuthUserWatchBox = createAppAsyncThunk(
  'watchBoxes/getAuthUserWatchBox',
  async (_, { extra: { authGateway, watchBoxesGateway }, dispatch }) => {
    const authUser = authGateway.getAuthUser();
    dispatch(getAuthUserWatchBoxPending({ authUser }));
    const { watchBox } = await watchBoxesGateway.getUserWatchBox({ userId: authUser });
    return watchBox;
  }
);
