import { FakeAuthGateway } from '@/lib/auth/adapters/fake-auth.gateway';
import { AppStore, createStore } from '@/lib/create-store';
import { stateBuilder } from '@/lib/state.builder';
import { FakeWatchBoxGateway } from '@/lib/watch-box/adapters/fake-watch-box-gateway';
import { WatchBoxResponse } from '@/lib/watch-box/model/watch-box.gateway';
import { selectIsUserWatchBoxLoading } from '@/lib/watch-box/slices/watch-boxes.slice';
import { getUserWatchBox } from '@/lib/watch-box/usecases/get-user-watch-box.usecase';
import { watchBoxBuilder } from '@/lib/watch-box/utils/watch-box.builder';
import { describe, expect, it } from 'vitest';

describe('Feature: Retrieving user watch box', () => {
  it('Example: We are on Bob profile', async () => {
    const builder = watchBoxBuilder();
    // prepare store
    givenExistingWatchBox(
      builder
        .withId('wb-1')
        .withUser('Bob')
        .withName('Frontend')
        .withArticles([
          { id: 'article-1', name: 'xyz', sharedBy: 'Bob', sharedAt: '2023-01-01T12:00:00.000Z' }
        ])
        .build()
    );
    const retrievingWatchBox = whenRetrievingUserWatchBox('Bob');

    // make action
    thenWatchBoxOfUserShouldBeLoading('Bob');

    await retrievingWatchBox;
    // verify that store is ok
    thenWatchBoxShouldBe(
      builder
        .withId('wb-1')
        .withUser('Bob')
        .withName('Frontend')
        .withArticles([
          { id: 'article-1', name: 'xyz', sharedBy: 'Bob', sharedAt: '2023-01-01T12:00:00.000Z' }
        ])
        .build()
    );
  });
});

const authGateway = new FakeAuthGateway();
const watchBoxesGateway = new FakeWatchBoxGateway();
let store: AppStore;
const testStateBuilder = stateBuilder();

function givenExistingWatchBox(watchBox: WatchBoxResponse) {
  watchBoxesGateway.watchBoxByUser.set('Bob', watchBox);
}

async function whenRetrievingUserWatchBox(userId: string) {
  store = createStore(
    {
      authGateway,
      watchBoxesGateway
    },
    testStateBuilder.build()
  );
  await store.dispatch(getUserWatchBox({ userId }));
}

function thenWatchBoxShouldBe(expectedWatchBox: WatchBoxResponse) {
  const expectedState = stateBuilder()
    .withWatchBox({
      id: expectedWatchBox.id,
      name: expectedWatchBox.name,
      user: expectedWatchBox.user,
      articles: expectedWatchBox.articles.map((a) => a.id)
    })
    .withArticles(expectedWatchBox.articles)
    .withLoadedWatchBoxOf({ user: 'Bob' })
    .build();
  expect(store.getState()).toEqual(expectedState);
}

function thenWatchBoxOfUserShouldBeLoading(userId: string) {
  const isUserWatchBoxLoading = selectIsUserWatchBoxLoading(userId, store.getState());
  expect(isUserWatchBoxLoading).toBe(true);
}
