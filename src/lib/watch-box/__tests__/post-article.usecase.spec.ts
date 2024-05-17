import { AuthFixture, createAuthFixture } from '@/lib/auth/__tests__/auth.fixture';
import { stateBuilderProvider } from '@/lib/state.builder';
import { beforeEach, describe, test } from 'vitest';
import { watchBoxBuilder } from '../utils/watch-box.builder';
import { WatchBoxFixture, createWatchBoxFixture } from './watch-box.fixture';

describe('Feature: Posting an article in a watch-box', () => {
  let fixture: WatchBoxFixture;
  let authFixture: AuthFixture;

  beforeEach(() => {
    const testStateBuilderProvider = stateBuilderProvider();
    fixture = createWatchBoxFixture(testStateBuilderProvider);
    authFixture = createAuthFixture(testStateBuilderProvider);
  });

  test('Example: Baptiste post an article on his empty watch-box', async () => {
    const builder = watchBoxBuilder();
    const now = new Date('2024-01-01T01:00:00.000Z');
    authFixture.givenAuthenticatedUserIs('Baptiste');
    fixture.givenNow(now);
    fixture.givenWatchBox({
      id: 'wb-1',
      name: 'wb-1',
      user: 'Baptiste',
      articles: []
    });
    await fixture.whenUserPostArticle({
      articleId: 'art-1',
      name: 'Frontend weekly',
      watchBoxId: 'wb-1'
    });
    fixture.thenArticleShouldHaveBeenPosted({
      id: 'art-1',
      watchBoxId: 'wb-1',
      name: 'Frontend weekly',
      sharedAt: now.toISOString(),
      sharedBy: 'Baptiste'
    });
    fixture.thenWatchBoxShouldBe(
      builder
        .withId('wb-1')
        .withName('wb-1')
        .withUser('Baptiste')
        .withArticles([
          {
            id: 'art-1',
            name: 'Frontend weekly',
            sharedAt: now.toISOString(),
            sharedBy: 'Baptiste'
          }
        ])
        .build()
    );
  });

  test('Example: Baptiste post an article on his watch-box already containing articles', async () => {
    const builder = watchBoxBuilder();
    const now = new Date('2024-01-01T01:00:00.000Z');

    authFixture.givenAuthenticatedUserIs('Baptiste');
    fixture.givenNow(now);
    fixture.givenWatchBox({
      id: 'wb-1',
      name: 'wb-1',
      user: 'Baptiste',
      articles: [
        {
            id: 'art-1',
            name: 'Frontend weekly',
            sharedAt: now.toISOString(),
            sharedBy: 'Baptiste'
          }
      ]
    });
    await fixture.whenUserPostArticle({
      articleId: 'art-2',
      name: 'Backend weekly',
      watchBoxId: 'wb-1'
    });
    fixture.thenArticleShouldHaveBeenPosted({
      id: 'art-2',
      watchBoxId: 'wb-1',
      name: 'Backend weekly',
      sharedAt: now.toISOString(),
      sharedBy: 'Baptiste'
    });
    fixture.thenWatchBoxShouldBe(
      builder
        .withId('wb-1')
        .withName('wb-1')
        .withUser('Baptiste')
        .withArticles([
          {
            id: 'art-1',
            name: 'Frontend weekly',
            sharedAt: now.toISOString(),
            sharedBy: 'Baptiste'
          },
           {
            id: 'art-2',
            name: 'Backend weekly',
            sharedAt: now.toISOString(),
            sharedBy: 'Baptiste'
          }
        ])
        .build()
    );
  });
});
