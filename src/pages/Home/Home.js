import { useQuery } from "@tanstack/react-query";
import { useWebsiteTitle } from "./../../hooks/useWebsiteTitle";
import { Main } from "../../components/Main/Main";
import { MostComment } from "../../components/Main/MostComment/MostComment";
import { fetchArticles } from "../../api/helpers";

export function Home() {
  const { data: articles } = useQuery(["articles"], fetchArticles);

  useWebsiteTitle("RealMadryt.pl by Viniski");

  const getMostCommentArticle = (options) => {
    let copyArray = [...articles];
    let result = copyArray.sort((a, b) =>
      a.commentsAmount > b.commentsAmount ? -1 : 1
    )[0];
    if (result.commentsAmount === undefined) {
      return null;
    }
    if (result.commentsAmount < options.minComment) {
      return null;
    } else {
      return result;
    }
  };

  const getMainArticles = () => {
    let copyArray = [];
    copyArray.push(articles[0]);
    return copyArray;
  };

  const getWithoutMainArticles = () => {
    let copyArray = articles;
    return copyArray.slice(1);
  };

  return (
    <>
      <MostComment getArticle={getMostCommentArticle} />
      <Main mainArticle={getMainArticles} articles={getWithoutMainArticles} />
    </>
  );
}
