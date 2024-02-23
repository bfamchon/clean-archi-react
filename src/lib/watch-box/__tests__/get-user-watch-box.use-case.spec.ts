import { WatchBoxFixture, createWatchBoxFixture } from '@/lib/watch-box/__tests__/watch-box.fixture';
import { watchBoxBuilder } from '@/lib/watch-box/utils/watch-box.builder';
import { beforeEach, describe, it } from 'vitest';

describe('Feature: Retrieving user watch box', () => {
  let fixture: WatchBoxFixture;
  beforeEach(() => {
    fixture = createWatchBoxFixture();
  });
  it('Example: We are on Bob profile', async () => {
    const builder = watchBoxBuilder();
    // prepare store
    fixture.givenExistingWatchBox(
      builder
        .withId('wb-1')
        .withUser('Bob')
        .withName('Frontend')
        .withArticles([
          { id: 'article-1', name: 'xyz', sharedBy: 'Bob', sharedAt: '2023-01-01T12:00:00.000Z' }
        ])
        .build()
    );
    const retrievingWatchBox = fixture.whenRetrievingUserWatchBox('Bob');

    // make action
    fixture.thenWatchBoxOfUserShouldBeLoading('Bob');

    await retrievingWatchBox;
    // verify that store is ok
    fixture.thenWatchBoxShouldBe(
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
