import { RootState } from '@/lib/create-store';
import { WatchBox, watchBoxAdapter } from '@/lib/watch-box/model/watch-box.entity';
import {
  getAuthUserWatchBox,
  getAuthUserWatchBoxPending
} from '@/lib/watch-box/usecases/get-auth-user-watch-box.usecase';
import { getUserWatchBox } from '@/lib/watch-box/usecases/get-user-watch-box.usecase';
import { EntityState, createSlice, isAnyOf } from '@reduxjs/toolkit';

export type WatchBoxesSliceState = EntityState<WatchBox, ''> & {
  loadingWatchBoxesByUser: { [userId: string]: boolean };
};

export const watchBoxesSlice = createSlice({
  name: 'watchBoxes',
  initialState: watchBoxAdapter.getInitialState({
    loadingWatchBoxesByUser: {}
  }) as WatchBoxesSliceState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAuthUserWatchBoxPending, (state, action) => {
        setUserWatchBoxLoadingState(state, {
          userId: action.payload.authUser,
          loading: true
        });
      })
      .addCase(getUserWatchBox.pending, (state, action) => {
        setUserWatchBoxLoadingState(state, {
          userId: action.meta.arg.userId,
          loading: true
        });
      })
      .addMatcher(isAnyOf(getAuthUserWatchBox.fulfilled, getUserWatchBox.fulfilled), (state, action) => {
        const watchBox = action.payload;
        watchBoxAdapter.addOne(state, {
          id: watchBox.id,
          name: watchBox.name,
          user: watchBox.user,
          articles: watchBox.articles.map((a) => a.id)
        });
        setUserWatchBoxLoadingState(state, {
          userId: watchBox.user,
          loading: false
        });
      });
  }
});

const setUserWatchBoxLoadingState = (
  state: WatchBoxesSliceState,
  { userId, loading }: { userId: string; loading: boolean }
) => {
  state.loadingWatchBoxesByUser[userId] = loading;
};

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
