import { useContext } from "react";
import { Link } from "react-router-dom";
import ReducerContext from "../../../../../context/reducerContext";
import styles from "./MyComment.module.css";

function MyComment(props) {
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
      <p className={styles.commentText}>{props.data.text}</p>
      <p className={styles.commentLink}>
        Komentarz pod artykułem{" "}
        <Link to={`/news/${props.data.articleId}`}>
          {getArticleTitle(props.data.articleId)}
        </Link>
      </p>
    </div>
  );
}

export default MyComment;
