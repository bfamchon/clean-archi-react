import { FakeAuthGateway } from '@/lib/auth/adapters/fake-auth.gateway';
import { AppStore, createStore } from '@/lib/create-store';
import { stateBuilder } from '@/lib/state.builder';
import { FakeWatchBoxGateway } from '@/lib/watch-box/adapters/fake-watch-box-gateway';
import { WatchBoxResponse } from '@/lib/watch-box/model/watch-box.gateway';
import { selectIsUserWatchBoxLoading } from '@/lib/watch-box/slices/watch-boxes.slice';
import { getAuthUserWatchBox } from '@/lib/watch-box/usecases/get-auth-user-watch-box.usecase';
import { watchBoxBuilder } from '@/lib/watch-box/utils/watch-box.builder';
import { describe, expect, it } from 'vitest';

describe('Feature: Retrieving authenticated user watch box', () => {
  it('Example: Baptiste is authenticated and can see his watch box', async () => {
    const builder = watchBoxBuilder();
    // prepare store
    givenAuthenticatedUserIs('Baptiste');
    givenExistingWatchBox(
      builder
        .withId('wb-1')
        .withUser('Baptiste')
        .withName('Frontend')
        .withArticles([
          { id: 'article-1', name: 'xyz', sharedBy: 'Baptiste', sharedAt: '2023-01-01T12:00:00.000Z' }
        ])
        .build()
    );
    const retrievingWatchBox = whenRetrievingAuthenticatedUserWatchBox();

    // make action
    thenWatchBoxOfUserShouldBeLoading('Baptiste');

    await retrievingWatchBox;
    // verify that store is ok
    thenWatchBoxShouldBe(
      builder
        .withId('wb-1')
        .withUser('Baptiste')
        .withName('Frontend')
        .withArticles([
          { id: 'article-1', name: 'xyz', sharedBy: 'Baptiste', sharedAt: '2023-01-01T12:00:00.000Z' }
        ])
        .build()
    );
  });
});

const authGateway = new FakeAuthGateway();
const watchBoxesGateway = new FakeWatchBoxGateway();
let store: AppStore;
let testStateBuilder = stateBuilder();

function givenAuthenticatedUserIs(user: string) {
  authGateway.authUser = user;
  testStateBuilder = testStateBuilder.withAuthUser({ authUser: user });
}

function givenExistingWatchBox(watchBox: WatchBoxResponse) {
  watchBoxesGateway.watchBoxByUser.set('Baptiste', watchBox);
}

async function whenRetrievingAuthenticatedUserWatchBox() {
  store = createStore(
    {
      authGateway,
      watchBoxesGateway
    },
    testStateBuilder.build()
  );
  await store.dispatch(getAuthUserWatchBox());
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
    .withLoadedWatchBoxOf({ user: 'Baptiste' })
    .withAuthUser({ authUser: 'Baptiste' })
    .build();
  expect(store.getState()).toEqual(expectedState);
}

function thenWatchBoxOfUserShouldBeLoading(userId: string) {
  const isUserWatchBoxLoading = selectIsUserWatchBoxLoading(userId, store.getState());
  expect(isUserWatchBoxLoading).toBe(true);
}
