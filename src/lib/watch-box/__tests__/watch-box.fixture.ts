import { FakeAuthGateway } from '@/lib/auth/adapters/fake-auth.gateway';
import { selectAuthenticatedUser } from '@/lib/auth/reducer';
import { AppStore, createTestStore } from '@/lib/create-store';
import { stateBuilder, stateBuilderProvider } from '@/lib/state.builder';
import { FakeWatchBoxGateway } from '@/lib/watch-box/adapters/fake-watch-box-gateway';
import { WatchBoxResponse } from '@/lib/watch-box/model/watch-box.gateway';
import { selectIsUserWatchBoxLoading } from '@/lib/watch-box/slices/watch-boxes.slice';
import { getUserWatchBox } from '@/lib/watch-box/usecases/get-user-watch-box.usecase';
import { expect } from 'vitest';
import { FakeArticleGateway } from '../adapters/fake-article.gateway';
import { StubDateProvider } from '../adapters/stub-date-provider';
import { PostArticleParams, postArticles } from '../usecases/post-article.usecase';

export const createWatchBoxFixture = (testStateBuilderProvider = stateBuilderProvider()) => {
  const authGateway = new FakeAuthGateway();
  const watchBoxesGateway = new FakeWatchBoxGateway();
  const articleGateway = new FakeArticleGateway();
  const dateProvider = new StubDateProvider();
  let store: AppStore;

  return {
    givenNow(now: Date) {
      dateProvider.now = now;
    },
    givenExistingRemoteWatchBox(watchBox: WatchBoxResponse) {
      watchBoxesGateway.watchBoxByUser.set(watchBox.user, watchBox);
    },
    givenWatchBox(watchBox: WatchBoxResponse) {
      testStateBuilderProvider.setState((builder) =>
        builder.withWatchBox({
          ...watchBox,
          articles: watchBox.articles.map((a) => a.id)
        }).withArticles(watchBox.articles).withLoadedWatchBoxOf({ user: watchBox.user })
      );
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
    async whenUserPostArticle(postArticleParams: PostArticleParams) {
      store = createTestStore(
        {
          dateProvider,
          articleGateway
        },
        testStateBuilderProvider.getState()
      );
      return store.dispatch(postArticles(postArticleParams));
    },
    thenArticleShouldHaveBeenPosted(expectedPostedMessage: {
      id: string;
      watchBoxId: string;
      name: string;
      sharedAt: string;
      sharedBy: string;
    }) {
      expect(articleGateway.lastPostedArticle).toEqual(expectedPostedMessage);
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
