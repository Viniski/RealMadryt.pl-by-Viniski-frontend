import { Link } from "react-router-dom";
import styles from "./MostComment.module.css";

function MostComment(props) {
  const article = props.getArticle({ minComment: 1 });
  if (!article) return null;

  return (
    <Link to={`news/${article.articleId}`}>
      <section className={styles.section}>
        <p className={styles.text}>
          Polecamy najczęściej komentowany artykuł - {article.commentsAmount}{" "}
          komentarzy - przeczytaj koniecznie!
        </p>
        <p className={styles.title}>{article.title}</p>
      </section>
    </Link>
  );
}

export default MostComment;
