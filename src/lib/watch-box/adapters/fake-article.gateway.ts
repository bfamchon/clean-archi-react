import { ArticleGateway } from '../model/article.gateway';

export class FakeArticleGateway implements ArticleGateway {
  lastPostedArticle!: {
    id: string;
    watchBoxId: string;
    name: string;
    sharedAt: string;
    sharedBy: string;
  };
  postArticle(article: {
    id: string;
    watchBoxId: string;
    name: string;
    sharedAt: string;
    sharedBy: string;
  }): Promise<void> {
    this.lastPostedArticle = article;
    return Promise.resolve();
  }
}
