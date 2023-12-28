import { RootState } from '@/lib/create-store';
import { rootReducer } from '@/lib/root-reducer';
import { Article, articleAdapter } from '@/lib/watch-box/model/article.entity';
import { WatchBox, watchBoxAdapter } from '@/lib/watch-box/model/watch-box.entity';
import { ActionCreatorWithPayload, createAction, createReducer } from '@reduxjs/toolkit';

const initialState = rootReducer(undefined, createAction(''));

const withAuthUser = createAction<{ authUser: string }>('withAuthUser');
const withWatchBox = createAction<WatchBox>('withWatchBox');
const withArticles = createAction<Article[]>('withArticles');
const withLoadingWatchBoxOf = createAction<{ user: string }>('withLoadingWatchBoxOf');
const withLoadedWatchBoxOf = createAction<{ user: string }>('withLoadedWatchBoxOf');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(withWatchBox, (state, action) => {
    watchBoxAdapter.addOne(state.watchBoxes.watchBoxes, action.payload);
  });
  builder.addCase(withAuthUser, (state, action) => {
    state.auth.authUser = action.payload.authUser;
  });
  builder.addCase(withLoadingWatchBoxOf, (state, action) => {
    state.watchBoxes.watchBoxes.loadingWatchBoxesByUser[action.payload.user] = true;
  });
  builder.addCase(withLoadedWatchBoxOf, (state, action) => {
    state.watchBoxes.watchBoxes.loadingWatchBoxesByUser[action.payload.user] = false;
  });
  builder.addCase(withArticles, (state, action) => {
    articleAdapter.addMany(state.watchBoxes.articles, action.payload);
  });
});

export const stateBuilder = (baseState = initialState) => {
  const reduce =
    <P>(actionCreator: ActionCreatorWithPayload<P>) =>
    (payload: P) =>
      stateBuilder(reducer(baseState, actionCreator(payload)));
  return {
    withWatchBox: reduce(withWatchBox),
    withAuthUser: reduce(withAuthUser),
    withArticles: reduce(withArticles),
    withLoadingWatchBoxOf: reduce(withLoadingWatchBoxOf),
    withLoadedWatchBoxOf: reduce(withLoadedWatchBoxOf),
    build(): RootState {
      return baseState;
    }
  };
};
