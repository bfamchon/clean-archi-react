import {
  randNumber,
  randParagraph,
  randRecentDate,
  randText,
  randTodo,
  randUserName,
  seed
} from '@ngneat/falso';

seed('42');

const randomId = () => randTodo().id.split('-')[0];

const generateRandomIds = (x: number) => new Array(x).fill(x).map(randomId);

export const randomPickFromMap = <T>(theMap: Map<string, T>) =>
  theMap.get([...theMap.keys()][randNumber({ min: 0, max: theMap.size - 1 })]) as T;

export const users = new Map(
  generateRandomIds(500).map(() => {
    const userName = randUserName();
    return [userName, userName];
  })
);

export const fakeAuthUser = randomPickFromMap(users);

export const articlesMap = new Map(
  generateRandomIds(1000).map((msgId) => [
    msgId,
    {
      id: msgId,
      name: randText({ length: randNumber({ min: 1, max: 4 }) }).join('\n'),
      sharedAt: randRecentDate(),
      sharedBy: randomPickFromMap(users)
    }
  ])
);

const userLikesByMessage = new Map<string, string[]>();

export const likesByMessage = new Map(
  [...articlesMap.values()].map((msg) => {
    const usersCopy = new Map(users);
    return [
      msg.id,
      generateRandomIds(randNumber({ min: 0, max: 150 })).map((likeId) => {
        const userId = randomPickFromMap(usersCopy);
        usersCopy.delete(userId);
        userLikesByMessage.set(msg.id, (userLikesByMessage.get(msg.id) ?? []).concat(userId));

        return {
          id: likeId,
          userId,
          articleId: msg.id
        };
      })
    ];
  })
);

export const messagesByTimeline = new Map<string, string[]>();

export const timelinesByUser = new Map(
  [...users.values()].map((user) => {
    const timelineId = randomId();
    const messagesCopy = new Map(articlesMap);
    const messageIds: string[] = (() =>
      new Array(10).fill(null).map(() => {
        const articleId = randomPickFromMap(messagesCopy).id;
        messagesCopy.delete(articleId);
        messagesByTimeline.set(timelineId, (messagesByTimeline.get(timelineId) ?? []).concat(articleId));
        return articleId;
      }))();

    messageIds.sort((mIdA, mIdB) => {
      const [mA, mB] = [articlesMap.get(mIdA), articlesMap.get(mIdB)];
      if (!mA || !mB) return 0;

      return mB.sharedAt.getTime() - mA.sharedAt.getTime();
    });
    return [
      user,
      {
        id: timelineId,
        name: randParagraph({ length: randNumber({ min: 1, max: 10 }) }).join('\n'),
        user: user,
        articles: messageIds
      }
    ];
  })
);

export const followersByUser = new Map(
  [...users.values()].map((u) => {
    const usersCopy = new Map(users);
    usersCopy.delete(u);

    return [
      u,
      new Array(randNumber({ min: 0, max: usersCopy.size })).fill(null).map(() => {
        const userId = randomPickFromMap(usersCopy);
        usersCopy.delete(userId);
        return userId;
      })
    ];
  })
);

export const followingByUser = new Map<string, string[]>();

for (const [userId, followers] of followersByUser) {
  followers.forEach((followerId) => {
    const existingFollowing = followingByUser.get(followerId) ?? [];
    followingByUser.set(followerId, existingFollowing.concat(userId));
  });
}

export const isAuthUserFollowsUser = (userId: string) =>
  (followingByUser.get(fakeAuthUser) ?? []).includes(userId);
