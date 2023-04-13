import { useContext } from "react";
import { Link } from "react-router-dom";
import { ReducerContext } from "../../../../../context/reducerContext";
import styles from "./MyComment.module.css";

function MyComment({ data }) {
  const reducer = useContext(ReducerContext);

  const getArticleTitle = (atricleId) => {
    const allArticle = [...reducer.state.articles];
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

export default MyComment;
