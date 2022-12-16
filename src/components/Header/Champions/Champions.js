import styles from "./Champions.module.css";

const headerText = [
  "35-krotni mistrzowie Hiszpanii",
  "14-krotni mistrzowie Europy",
  "7-krotni mistrzowie świata",
];

function Champions() {
  const randomQuotes = () => {
    return headerText[Math.floor(Math.random() * headerText.length)];
  };

  let text = randomQuotes();

  return <p className={styles.championsText}>{text}</p>;
}

export default Champions;
