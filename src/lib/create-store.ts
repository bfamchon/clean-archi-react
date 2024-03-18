import { onAuthStateChangeListener } from '@/lib/auth/listeners/on-auth-state-change.listener';
import { AuthGateway } from '@/lib/auth/model/auth.gateway';
import { rootReducer } from '@/lib/root-reducer';
import { WatchBoxGateway } from '@/lib/watch-box/model/watch-box.gateway';
import { Action, Middleware, ThunkDispatch, configureStore, isAction } from '@reduxjs/toolkit';
import { FakeAuthGateway } from './auth/adapters/fake-auth.gateway';
import { FakeArticleGateway } from './watch-box/adapters/fake-article.gateway';
import { FakeWatchBoxGateway } from './watch-box/adapters/fake-watch-box-gateway';
import { RealDateProvider } from './watch-box/adapters/real-date-provider';
import { ArticleGateway } from './watch-box/model/article.gateway';
import { DateProvider } from './watch-box/model/date-provider';

export type Dependencies = {
  authGateway: AuthGateway;
  watchBoxesGateway: WatchBoxGateway;
  articleGateway: ArticleGateway;
  dateProvider: DateProvider;
};

export const createStore = (dependencies: Dependencies, preloadedState?: Partial<RootState>) => {
  const actions: Action[] = [];
  const logActionsMiddleware: Middleware = () => (next) => (action) => {
    if (isAction(action)) {
      actions.push(action);
    }
    return next(action);
  };

  const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies
        }
      }).prepend(logActionsMiddleware);
    },
    preloadedState
  });

  onAuthStateChangeListener({ store, authGateway: dependencies.authGateway });

  return { ...store, getActions: () => actions };
};

export const createTestStore = (
  {
    authGateway = new FakeAuthGateway(),
    watchBoxesGateway = new FakeWatchBoxGateway(),
    articleGateway = new FakeArticleGateway(),
    dateProvider = new RealDateProvider()
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<RootState>
) => createStore({ authGateway, watchBoxesGateway, articleGateway, dateProvider }, preloadedState);

type AppStoreWithGetActions = ReturnType<typeof createStore>;
export type AppStore = Omit<AppStoreWithGetActions, 'getActions'>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>;
