export const ArticleList = ({
  articles
}: {
  articles: {
    id: string;
    name: string;
    sharedBy: string;
    username: string;
    userId: string;
    profilePicture: string;
    sharedAt: string;
  }[];
}) => {
  return (
    <>
      <form>
        <label>
          WatchBox name
          <input type="text" />
        </label>
        <button type="submit">create new watch-box</button>
      </form>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <article>
              <h3>{article.name}</h3>
              <p>
                Shared by <a href={`/u/${article.sharedBy}`}>{article.sharedBy}</a>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
};
