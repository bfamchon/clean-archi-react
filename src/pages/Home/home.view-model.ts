import { selectAuthenticatedUser } from '@/lib/auth/reducer';
import { RootState } from '@/lib/create-store';
import { selectArticles } from '@/lib/watch-box/slices/articles.slice';
import { selectIsUserWatchBoxLoading, selectWatchBoxOfUser } from '@/lib/watch-box/slices/watch-boxes.slice';
import { format as timeAgo } from 'timeago.js';

export enum HomeViewModelType {
  NO_WATCH_BOX = 'NO_WATCH_BOX',
  EMPTY_WATCH_BOX = 'EMPTY_WATCH_BOX',
  WATCH_BOX_WITH_ARTICLES = 'WATCH_BOX_WITH_ARTICLES',
  WATCH_BOX_LOADING = 'WATCH_BOX_LOADING'
}

export type HomeViewModel =
  | {
      type: HomeViewModelType.NO_WATCH_BOX;
    }
  | {
      type: HomeViewModelType.EMPTY_WATCH_BOX;
      info: string;
    }
  | {
      type: HomeViewModelType.WATCH_BOX_LOADING;
      info: string;
    }
  | {
      type: HomeViewModelType.WATCH_BOX_WITH_ARTICLES;
      articles: {
        id: string;
        name: string;
        sharedBy: string;
        username: string;
        userId: string;
        profilePicture: string;
        sharedAt: string;
      }[];
    };

export const selectHomeViewModel = (rootState: RootState, getNow: () => string) => {
  const authUser = selectAuthenticatedUser(rootState);
  const watchBox = selectWatchBoxOfUser(authUser, rootState);
  const now = getNow();
  const isUserWatchBoxLoading = selectIsUserWatchBoxLoading(authUser, rootState);
  if (isUserWatchBoxLoading) {
    return {
      type: HomeViewModelType.WATCH_BOX_LOADING as const,
      info: 'Loading...'
    };
  }
  if (!watchBox) {
    return {
      type: HomeViewModelType.NO_WATCH_BOX as const
    };
  }
  if (watchBox.articles.length === 0) {
    return {
      type: HomeViewModelType.EMPTY_WATCH_BOX as const,
      info: 'There is no articles yet in this watch box'
    };
  }
  const articles = selectArticles(watchBox.articles, rootState).map((article) => ({
    id: article.id,
    name: article.name,
    sharedBy: article.sharedBy,
    username: article.sharedBy,
    userId: article.sharedBy,
    profilePicture: 'https://picsum.photos/200?random=Baptiste',
    sharedAt: timeAgo(article.sharedAt, '', {
      relativeDate: now
    })
  }));
  return {
    type: HomeViewModelType.WATCH_BOX_WITH_ARTICLES as const,
    articles
  };
};
