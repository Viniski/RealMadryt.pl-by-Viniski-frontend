import { Link } from "react-router-dom";
import styles from "./Article.module.css";

export function Article({ articleId, image, title, subtitle, commentsAmount }) {
  return (
    <Link to={`news/${articleId}`}>
      <article className={styles.basic_article}>
        <img
          className={styles.basic_img}
          src={require(`./../../../assets/images/${image}`)}
          alt="zdjęcie do artykułu"
        />
        <div className={styles.basic_div}>
          <p className={styles.basic_title}>{title}</p>
          <p className={styles.basic_p}>{subtitle}</p>
          <p className={styles.comments_p}>
            Komentarze: <span>{commentsAmount}</span>
          </p>
        </div>
      </article>
    </Link>
  );
}
