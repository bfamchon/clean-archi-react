import { GetUserWatchBoxResponse, WatchBoxGateway, WatchBoxResponse } from '../model/watch-box.gateway';

export class FakeWatchBoxGateway implements WatchBoxGateway {
  constructor(private readonly delay = 0) {}
  watchBoxByUser = new Map<string, WatchBoxResponse>();

  getUserWatchBox({ userId }: { userId: string }): Promise<GetUserWatchBoxResponse> {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        const watchBox = this.watchBoxByUser.get(userId);
        if (!watchBox) {
          return reject();
        }
        return resolve({
          watchBox
        });
      }, this.delay)
    );
  }
}

export const watchBoxGateway = new FakeWatchBoxGateway();
