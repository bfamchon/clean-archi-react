import { selectAuthenticatedUser } from '@/lib/auth/reducer';
import { createAppAsyncThunk } from '@/lib/create-app-thunk';
import { createAction } from '@reduxjs/toolkit';
import { Article } from '../model/article.entity';

export type PostArticleParams = {
  articleId: string;
  watchBoxId: string;
  name: string;
};

export const postArticlesPending = createAction<Article>('watchBoxes/postArticlesPending');

export const postArticles = createAppAsyncThunk(
  'watchBoxes/postArticles',
  (params: PostArticleParams, { extra: { dateProvider, articleGateway }, dispatch, getState }) => {
    const authUser = selectAuthenticatedUser(getState());
    const article: Article = {
      id: params.articleId,
      name: params.name,
      sharedAt: dateProvider.getNow().toISOString(),
      sharedBy: authUser
    };
    dispatch(postArticlesPending(article));
    return articleGateway.postArticle({
      ...article,
      watchBoxId: params.watchBoxId
    });
  }
);
