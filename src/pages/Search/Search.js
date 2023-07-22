import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useWebsiteTitle } from "./../../hooks/useWebsiteTitle";
import { Main } from "./../../components/Main/Main";
import { fetchArticles } from "../../api/helpers";
import styles from "./Search.module.css";

export function Search() {
  const { data: articles } = useQuery(["articles"], fetchArticles);

  const { term } = useParams();

  const getSearchArticles = () => {
    return articles.filter((article) =>
      article.title.toLowerCase().includes(term.toLowerCase())
    );
  };

  const getUndefined = () => undefined;

  useWebsiteTitle(`Wyszykaj: ${term} | RealMadryt.pl by Viniski`);

  return (
    <div className={styles.searchPage}>
      <h2 className={styles.searchPageHeader}>
        Wyniki wyszukiwania dla frazy"{term}":
      </h2>
      <>
        {getSearchArticles().length === 0 ? (
          <div className={styles.searchPageDiv}>
            <p className={styles.searchPageParagraph}>
              Brak artykułów na naszej stronie zawierających w tytule szukaną
              frazę.
            </p>
          </div>
        ) : (
          <Main articles={getSearchArticles} mainArticle={getUndefined} />
        )}
      </>
    </div>
  );
}
