import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useWebsiteTitle } from "./../../hooks/useWebsiteTitle";
import { ReducerContext } from "../../context/reducerContext";
import { Main } from "./../../components/Main/Main";
import styles from "./Search.module.css";

export function Search() {
  const reducer = useContext(ReducerContext);
  const { term } = useParams();

  const getSearchArticles = () => {
    return reducer.state.articles.filter((article) =>
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
