import { useContext } from "react";
import { useWebsiteTitle } from "./../../hooks/useWebsiteTitle";
import { ReducerContext } from "../../context/reducerContext";
import { Main } from "../../components/Main/Main";
import { MostComment } from "../../components/Main/MostComment/MostComment";

export function Home() {
  useWebsiteTitle("RealMadryt.pl by Viniski");
  const reducer = useContext(ReducerContext);

  const getMostCommentArticle = (options) => {
    let copyArray = [...reducer.state.articles];
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
    copyArray.push(reducer.state.articles[0]);
    return copyArray;
  };

  const getWithoutMainArticles = () => {
    let copyArray = reducer.state.articles;
    return copyArray.slice(1);
  };

  return (
    <>
      <MostComment getArticle={getMostCommentArticle} />
      <Main mainArticle={getMainArticles} articles={getWithoutMainArticles} />
    </>
  );
}
