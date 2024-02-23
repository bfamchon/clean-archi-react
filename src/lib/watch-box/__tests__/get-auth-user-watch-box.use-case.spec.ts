import { watchBoxBuilder } from '@/lib/watch-box/utils/watch-box.builder';
import { beforeEach, describe, it } from 'vitest';
import { WatchBoxFixture, createWatchBoxFixture } from './watch-box.fixture';

describe('Feature: Retrieving authenticated user watch box', () => {
  let fixture: WatchBoxFixture;
  beforeEach(() => {
    fixture = createWatchBoxFixture();
  });
  it('Example: Baptiste is authenticated and can see his watch box', async () => {
    const builder = watchBoxBuilder();
    // prepare store
    fixture.givenAuthenticatedUserIs('Baptiste');
    fixture.givenExistingWatchBox(
      builder
        .withId('wb-1')
        .withUser('Baptiste')
        .withName('Frontend')
        .withArticles([
          { id: 'article-1', name: 'xyz', sharedBy: 'Baptiste', sharedAt: '2023-01-01T12:00:00.000Z' }
        ])
        .build()
    );
    const retrievingWatchBox = fixture.whenRetrievingAuthenticatedUserWatchBox();

    // make action
    fixture.thenWatchBoxOfUserShouldBeLoading('Baptiste');

    await retrievingWatchBox;
    // verify that store is ok
    fixture.thenWatchBoxShouldBe(
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
