import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../../../../../api/helpers";
import styles from "./MyComment.module.css";

export function MyComment({ data }) {
  const { data: articles } = useQuery(["articles"], fetchArticles);

  const getArticleTitle = (atricleId) => {
    const allArticle = [...articles];
    const article = allArticle.filter(
      (article) => article.articleId === Number(atricleId)
    );
    return article[0].title;
  };

  return (
    <div className={styles.comment}>
      <p className={styles.commentText}>{data.text}</p>
      <p className={styles.commentLink}>
        Komentarz pod artykułem{" "}
        <Link to={`/news/${data.articleId}`}>
          {getArticleTitle(data.articleId)}
        </Link>
      </p>
    </div>
  );
}
