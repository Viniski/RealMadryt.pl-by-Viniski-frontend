import { Link } from "react-router-dom";
import styles from "./MainArticle.module.css";

export function MainArticle({
  articleId,
  image,
  title,
  subtitle,
  commentsAmount,
}) {
  return (
    <Link to={`news/${articleId}`} className={styles.main_article}>
      <article className={styles.main_article}>
        <img
          className={styles.main_img}
          src={require(`./../../../assets/images/${image}`)}
          alt="zdjęcie do artykułu"
        />
        <div className={styles.main_div}>
          <p className={styles.main_title}>{title}</p>
          <p className={styles.main_p}>{subtitle}</p>
          <p className={styles.comments_p}>
            Komentarze: <span>{commentsAmount}</span>
          </p>
        </div>
      </article>
    </Link>
  );
}
