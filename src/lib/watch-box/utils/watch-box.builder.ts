import { Article } from "@/lib/watch-box/model/article.entity";
import { WatchBoxResponse } from "@/lib/watch-box/model/watch-box.gateway";

export const watchBoxBuilder = ({
    id = "",
  name = "",
  user = "",
  articles = [],
}: Partial<WatchBoxResponse> = {}) => {
  const properties = {
    id,
    name,
    articles,
    user,
  };
  return {
    withId: (_id: string) => watchBoxBuilder({ ...properties, id: _id }),
    withName: (_name: string) => watchBoxBuilder({ ...properties, name: _name }),
    withUser: (_user: string) => watchBoxBuilder({ ...properties, user: _user }),
    withArticles: (_articles: Article[]) => watchBoxBuilder({ ...properties, articles: _articles }),   
    build: (): WatchBoxResponse => ({
      ...properties
    })
  };
};
