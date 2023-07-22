import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useWebsiteTitle } from "./../../hooks/useWebsiteTitle";
import { Comments } from "../../components/UI/Comments/Comments";
import { fetchArticles } from "../../api/helpers";
import styles from "./Article.module.css";

export function Article() {
  const { data: articles } = useQuery(["articles"], fetchArticles);
  const { id } = useParams();

  const getArticleData = () => {
    let article = articles.filter((el) => el.articleId === Number(id));
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
