export interface ArticleGateway {
  postArticle(article: {
    id: string;
    watchBoxId: string;
    name: string;
    sharedAt: string;
    sharedBy: string;
  }): Promise<void>;
}
