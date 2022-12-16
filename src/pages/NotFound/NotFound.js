import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import styles from "./NotFound.module.css";

export default function NotFound() {
  useWebsiteTitle(`Błąd | RealMadryt.pl by Viniski`);

  return (
    <div className={styles.container}>
      <p className={styles.number}>404</p>
      <p className={styles.info}>Nie znaleziono strony.</p>
    </div>
  );
}
