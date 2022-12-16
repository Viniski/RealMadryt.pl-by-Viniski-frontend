import { Link } from "react-router-dom";
import styles from "./MainArticle.module.css";

function MainArticle(props) {
  return (
    <Link to={`news/${props.articleId}`} className={styles.main_article}>
      <article className={styles.main_article}>
        <img
          className={styles.main_img}
          src={require(`./../../../assets/images/${props.image}`)}
          alt="zdjęcie do artykułu"
        />
        <div className={styles.main_div}>
          <p className={styles.main_title}>{props.title}</p>
          <p className={styles.main_p}>{props.subtitle}</p>
          <p className={styles.comments_p}>
            Komentarze: <span>{props.commentsAmount}</span>
          </p>
        </div>
      </article>
    </Link>
  );
}

export default MainArticle;
