import { FakeAuthGateway } from '@/lib/auth/adapters/fake-auth.gateway';
import { selectAuthenticatedUser } from '@/lib/auth/reducer';
import { AppStore, createTestStore } from '@/lib/create-store';
import { stateBuilder, stateBuilderProvider } from '@/lib/state.builder';
import { FakeWatchBoxGateway } from '@/lib/watch-box/adapters/fake-watch-box-gateway';
import { WatchBoxResponse } from '@/lib/watch-box/model/watch-box.gateway';
import { selectIsUserWatchBoxLoading } from '@/lib/watch-box/slices/watch-boxes.slice';
import { getUserWatchBox } from '@/lib/watch-box/usecases/get-user-watch-box.usecase';
import { expect } from 'vitest';

export const createWatchBoxFixture = (testStateBuilderProvider = stateBuilderProvider()) => {
  const authGateway = new FakeAuthGateway();
  const watchBoxesGateway = new FakeWatchBoxGateway();
  let store: AppStore;

  return {
    givenExistingWatchBox(watchBox: WatchBoxResponse) {
      watchBoxesGateway.watchBoxByUser.set(watchBox.user, watchBox);
    },
    async whenRetrievingUserWatchBox(userId: string) {
      store = createTestStore(
        {
          authGateway,
          watchBoxesGateway
        },
        testStateBuilderProvider.getState()
      );
      await store.dispatch(getUserWatchBox({ userId }));
    },
    async whenRetrievingAuthenticatedUserWatchBox() {
      const authUserId = selectAuthenticatedUser(testStateBuilderProvider.getState());
      return this.whenRetrievingUserWatchBox(authUserId);
    },
    thenWatchBoxShouldBe(expectedWatchBox: WatchBoxResponse) {
      const expectedState = stateBuilder(testStateBuilderProvider.getState())
        .withWatchBox({
          id: expectedWatchBox.id,
          name: expectedWatchBox.name,
          user: expectedWatchBox.user,
          articles: expectedWatchBox.articles.map((a) => a.id)
        })
        .withArticles(expectedWatchBox.articles)
        .withLoadedWatchBoxOf({ user: expectedWatchBox.user })
        .build();
      expect(store.getState()).toEqual(expectedState);
    },
    thenWatchBoxOfUserShouldBeLoading(userId: string) {
      const isUserWatchBoxLoading = selectIsUserWatchBoxLoading(userId, store.getState());
      expect(isUserWatchBoxLoading).toBe(true);
    }
  };
};

export type WatchBoxFixture = ReturnType<typeof createWatchBoxFixture>;
