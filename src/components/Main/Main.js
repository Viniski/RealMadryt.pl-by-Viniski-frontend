import { PureComponent } from "react";
import { MainArticle } from "./MainArticle/MainArticle";
import { Article } from "./Articles/Article";
import styles from "./Main.module.css";

export class Main extends PureComponent {
  render() {
    const mainArticle = this.props.mainArticle();
    const articles = this.props.articles();

    return (
      <main className={styles.mainPage}>
        <section className={styles.section}>
          {mainArticle &&
            mainArticle.map((article) => (
              <MainArticle key={article.articleId} {...article} />
            ))}
          {articles.map((article) => (
            <Article key={article.articleId} {...article} />
          ))}
        </section>
      </main>
    );
  }
}
