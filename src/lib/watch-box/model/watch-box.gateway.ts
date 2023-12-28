export type WatchBoxResponse = {
  name: string;
  id: string;
  user: string;
  articles: {
    name: string;
    id: string;
    sharedBy: string;
    sharedAt: string;
  }[];
};

export type GetUserWatchBoxResponse = {
  watchBox: WatchBoxResponse;
};

export interface WatchBoxGateway {
  getUserWatchBox({ userId }: { userId: string }): Promise<GetUserWatchBoxResponse>;
}
