import styles from "./Champions.module.css";

const headerText = [
  "35-krotni mistrzowie Hiszpanii",
  "14-krotni mistrzowie Europy",
  "7-krotni mistrzowie świata",
];

export function Champions() {
  const randomQuotes = () => {
    return headerText[Math.floor(Math.random() * headerText.length)];
  };

  return <p className={styles.championsText}>{randomQuotes()}</p>;
}
