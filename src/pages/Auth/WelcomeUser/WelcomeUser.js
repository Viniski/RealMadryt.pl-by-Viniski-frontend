import { Link } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./WelcomeUser.module.css";

export default function WelcomeUser() {
  useWebsiteTitle(`Witaj madridisto! | RealMadryt.pl by Viniski`);
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Witaj na RealMadryt.pl by Viniski</h1>
      <h2 className={styles.subtitle}>
        Bardzo cieszymy się, że dołączyłeś do społeczności madridistas
      </h2>
      <p className={styles.paragraph}>
        Możesz teraz w pełni korzystać z naszego portalu
      </p>
      <p className={styles.paragraph}>
        Sprawdź, swojego maila z niespodzianką specjalnie dla Ciebie i rabatem
        od naszego sponsora
      </p>
      <p className={styles.paragraph}>Hala Madrid y nada mas! </p>
      <p className={styles.paragraph}>
        <Link to={"/"}>
          Powróć do strony głównej
        </Link>
      </p>
    </div>
  );
}
