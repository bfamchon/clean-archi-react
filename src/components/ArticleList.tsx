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
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <article>
            <h3>{article.name}</h3>
            <p>Shared by {article.sharedBy}</p>
          </article>
        </li>
      ))}
    </ul>
  );
};
