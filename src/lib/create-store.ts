import { onAuthStateChangeListener } from '@/lib/auth/listeners/on-auth-state-change.listener';
import { AuthGateway } from '@/lib/auth/model/auth.gateway';
import { rootReducer } from '@/lib/root-reducer';
import { WatchBoxGateway } from '@/lib/watch-box/model/watch-box.gateway';
import { AnyAction, Middleware, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import { FakeAuthGateway } from './auth/adapters/fake-auth.gateway';
import { FakeWatchBoxGateway } from './watch-box/adapters/fake-watch-box-gateway';

export type Dependencies = {
  authGateway: AuthGateway;
  watchBoxesGateway: WatchBoxGateway;
};

export const createStore = (dependencies: Dependencies, preloadedState?: Partial<RootState>) => {
  const actions: AnyAction[] = [];
  const logActionsMiddleware: Middleware = () => (next) => (action) => {
    actions.push(action);
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
    watchBoxesGateway = new FakeWatchBoxGateway()
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<RootState>
) => createStore({ authGateway, watchBoxesGateway }, preloadedState);

type AppStoreWithGetActions = ReturnType<typeof createStore>;
export type AppStore = Omit<AppStoreWithGetActions, 'getActions'>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>;
