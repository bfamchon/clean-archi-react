import { RootState } from '@/lib/create-store';
import { WatchBox, watchBoxAdapter } from '@/lib/watch-box/model/watch-box.entity';
import {
  getAuthUserWatchBox,
  getAuthUserWatchBoxPending
} from '@/lib/watch-box/usecases/get-auth-user-watch-box.usecase';
import { EntityState, createSlice } from '@reduxjs/toolkit';

export type WatchBoxesSliceState = EntityState<WatchBox> & {
  loadingWatchBoxesByUser: { [userId: string]: boolean };
};

export const watchBoxesSlice = createSlice({
  name: 'watchBoxes',
  initialState: watchBoxAdapter.getInitialState({
    loadingWatchBoxesByUser: {}
  }) as WatchBoxesSliceState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAuthUserWatchBoxPending, (state, action) => {
      state.loadingWatchBoxesByUser[action.payload.authUser] = true;
    });
    builder.addCase(getAuthUserWatchBox.fulfilled, (state, action) => {
      const watchBox = action.payload;
      watchBoxAdapter.addOne(state, {
        id: watchBox.id,
        name: watchBox.name,
        user: watchBox.user,
        articles: watchBox.articles.map((a) => a.id)
      });
      state.loadingWatchBoxesByUser[watchBox.user] = false;
    });
  }
});

export const selectWatchBoxes = (state: RootState) =>
  watchBoxAdapter.getSelectors().selectAll(state.watchBoxes.watchBoxes);
export const selectWatchBox = (id: string, state: RootState) =>
  watchBoxAdapter.getSelectors().selectById(state.watchBoxes.watchBoxes, id);
export const selectIsUserWatchBoxLoading = (userId: string, state: RootState) =>
  state.watchBoxes.watchBoxes.loadingWatchBoxesByUser[userId] ?? false;
export const selectWatchBoxOfUser = (userId: string, state: RootState) =>
  watchBoxAdapter
    .getSelectors()
    .selectAll(state.watchBoxes.watchBoxes)
    .filter((wb) => wb.user === userId)[0];
