import { articlesMap, timelinesByUser } from '@/lib/fake-data';
import { GetUserWatchBoxResponse, WatchBoxGateway, WatchBoxResponse } from '../model/watch-box.gateway';

export class FakeDataWatchBoxGateway implements WatchBoxGateway {
  constructor(private readonly delay = 0) {}
  watchBoxByUser = new Map<string, WatchBoxResponse>();

  getUserWatchBox({ userId }: { userId: string }): Promise<GetUserWatchBoxResponse> {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        const watchBox = timelinesByUser.get(userId);
        if (!watchBox) {
          return reject();
        }
        const articles = watchBox.articles
          .map((articleId) => {
            const article = articlesMap.get(articleId);
            if (!article) return null;
            return {
              id: article.id,
              name: article.name,
              sharedBy: article.sharedBy,
              sharedAt: article.sharedAt.toISOString()
            };
          })
          .filter(Boolean);
        return resolve({
          watchBox: {
            name: watchBox.name,
            id: watchBox.id,
            user: watchBox.user,
            articles
          }
        });
      }, this.delay)
    );
  }
}
