import { Link } from "react-router-dom";
import styles from "./Article.module.css";

function Article(props) {
  return (
    <Link to={`news/${props.articleId}`}>
      <article className={styles.basic_article}>
        <img
          className={styles.basic_img}
          src={require(`./../../../assets/images/${props.image}`)}
          alt="zdjęcie do artykułu"
        />
        <div className={styles.basic_div}>
          <p className={styles.basic_title}>{props.title}</p>
          <p className={styles.basic_p}>{props.subtitle}</p>
          <p className={styles.comments_p}>
            Komentarze: <span>{props.commentsAmount}</span>
          </p>
        </div>
      </article>
    </Link>
  );
}

export default Article;
