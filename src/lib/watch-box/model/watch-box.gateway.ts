import { Article } from "@/lib/watch-box/model/article.entity";

export type WatchBoxResponse = {
  name: string;
  id: string;
  user: string;
  articles: Article[];
};

export type GetUserWatchBoxResponse = {
  watchBox: WatchBoxResponse;
};

export interface WatchBoxGateway {
  getUserWatchBox({ userId }: { userId: string }): Promise<GetUserWatchBoxResponse>;
}
