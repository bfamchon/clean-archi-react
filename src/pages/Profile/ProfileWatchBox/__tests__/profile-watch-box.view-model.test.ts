import { createTestStore } from '@/lib/create-store';
import { stateBuilder } from '@/lib/state.builder';
import {
  ProfileWatchBoxViewModelType,
  selectProfileWatchBoxViewModel
} from '@/pages/Profile/ProfileWatchBox/profile-watch-box.view-model';
import { beforeEach, describe, expect, test } from 'vitest';

const getNow = () => '2023-01-01T12:00:00.000Z';

describe('Profile watch-box view model', () => {
  beforeEach(() => {});
  test('Example: there is no watch boxes in the store', () => {
    const store = createTestStore();

    const profileWatchBoxViewModel = selectProfileWatchBoxViewModel({ userId: 'Baptiste', getNow })(
      store.getState()
    );

    expect(profileWatchBoxViewModel).toEqual({
      type: ProfileWatchBoxViewModelType.NO_WATCH_BOX
    });
  });
  test('Example: there is no articles in the watch box', () => {
    const initialState = stateBuilder()
      .withAuthUser({ authUser: 'Baptiste' })
      .withWatchBox({
        id: 'wb-1',
        name: 'Frontend',
        user: 'Baptiste',
        articles: []
      })
      .build();
    const store = createTestStore({}, initialState);

    const profileWatchBoxViewModel = selectProfileWatchBoxViewModel({ userId: 'Baptiste', getNow })(
      store.getState()
    );

    expect(profileWatchBoxViewModel).toEqual({
      type: ProfileWatchBoxViewModelType.EMPTY_WATCH_BOX,
      info: 'There is no articles yet in this watch box'
    });
  });

  test('Example: there is an article in the watch box', () => {
    const initialState = stateBuilder()
      .withAuthUser({ authUser: 'Baptiste' })
      .withWatchBox({
        id: 'wb-1',
        name: 'Frontend',
        user: 'Baptiste',
        articles: ['a-1']
      })
      .withArticles([
        {
          id: 'a-1',
          name: 'xyz',
          sharedBy: 'Baptiste',
          sharedAt: '2023-01-01T12:00:00.000Z'
        }
      ])
      .build();
    const store = createTestStore({}, initialState);

    const profileWatchBoxViewModel = selectProfileWatchBoxViewModel({ userId: 'Baptiste', getNow })(
      store.getState()
    );

    expect(profileWatchBoxViewModel).toEqual({
      type: ProfileWatchBoxViewModelType.WATCH_BOX_WITH_ARTICLES,
      articles: [
        {
          id: 'a-1',
          name: 'xyz',
          userId: 'Baptiste',
          username: 'Baptiste',
          profilePicture: 'https://picsum.photos/200?random=Baptiste',
          sharedBy: 'Baptiste',
          sharedAt: 'just now'
        }
      ]
    });
  });

  test('Example: there is many articles in the watch box', () => {
    const initialState = stateBuilder()
      .withAuthUser({ authUser: 'Baptiste' })
      .withWatchBox({
        id: 'wb-1',
        name: 'Frontend',
        user: 'Baptiste',
        articles: ['a-1', 'a-2']
      })
      .withArticles([
        {
          id: 'a-1',
          name: 'xyz',
          sharedBy: 'Baptiste',
          sharedAt: '2023-01-01T11:20:00.000Z'
        },
        {
          id: 'a-2',
          name: 'abc',
          sharedBy: 'Baptiste',
          sharedAt: '2023-01-01T11:00:00.000Z'
        },
        {
          id: 'a-3',
          name: 'abc',
          sharedBy: 'Bob',
          sharedAt: '2023-01-01T10:00:00.000Z'
        }
      ])
      .build();
    const store = createTestStore({}, initialState);

    const profileWatchBoxViewModel = selectProfileWatchBoxViewModel({ userId: 'Baptiste', getNow })(
      store.getState()
    );

    expect(profileWatchBoxViewModel).toEqual({
      type: ProfileWatchBoxViewModelType.WATCH_BOX_WITH_ARTICLES,
      articles: [
        {
          id: 'a-1',
          name: 'xyz',
          userId: 'Baptiste',
          username: 'Baptiste',
          profilePicture: 'https://picsum.photos/200?random=Baptiste',
          sharedBy: 'Baptiste',
          sharedAt: '40 minutes ago'
        },
        {
          id: 'a-2',
          name: 'abc',
          userId: 'Baptiste',
          username: 'Baptiste',
          profilePicture: 'https://picsum.photos/200?random=Baptiste',
          sharedBy: 'Baptiste',
          sharedAt: '1 hour ago'
        }
      ]
    });
  });

  test('Example: WatchBox is loading', () => {
    const initialState = stateBuilder()
      .withAuthUser({ authUser: 'Baptiste' })
      .withLoadingWatchBoxOf({ user: 'Baptiste' })
      .build();
    const store = createTestStore({}, initialState);

    const profileWatchBoxViewModel = selectProfileWatchBoxViewModel({ userId: 'Baptiste', getNow })(
      store.getState()
    );

    expect(profileWatchBoxViewModel).toEqual({
      type: ProfileWatchBoxViewModelType.WATCH_BOX_LOADING,
      info: 'Loading...'
    });
  });
});
