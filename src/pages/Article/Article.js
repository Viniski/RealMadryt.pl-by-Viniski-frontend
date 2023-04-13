import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useWebsiteTitle } from "./../../hooks/useWebsiteTitle";
import { ReducerContext } from "./../../context/reducerContext";
import { Comments } from "../../components/UI/Comments/Comments";
import styles from "./Article.module.css";

export function Article() {
  const reducer = useContext(ReducerContext);
  const { id } = useParams();

  const getArticleData = () => {
    let article = reducer.state.articles.filter(
      (el) => el.articleId === Number(id)
    );
    return article[0];
  };

  let article = getArticleData();

  useWebsiteTitle(`${article.title} | RealMadryt.pl by Viniski`);

  return (
    <main>
      <section className={styles.article}>
        <h1 className={styles.title}>{article.title}</h1>
        <img
          src={require(`./../../assets/images/${article.image}`)}
          className={styles.image}
          alt="zdjęcie do artykułu"
        />
        <p className={styles.titleText}>{article.subtitle}</p>
        <p className={styles.articleText}>{article.text}</p>
        <i className={styles.additionalText}>
          Całość artykułu przeczytasz na realmadryt.pl <br />
          <a href={article.link} target="_blank">
            Czytaj cały artykuł
          </a>
        </i>
      </section>
      <section className={styles.comments}>
        <Comments />
      </section>
    </main>
  );
}
