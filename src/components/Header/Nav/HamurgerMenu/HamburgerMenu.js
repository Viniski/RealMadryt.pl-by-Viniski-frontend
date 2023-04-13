import styles from "./HamburgerMenu.module.css";

export function HamburgerMenu({ isClicked }) {
  return (
    <div
      className={
        isClicked
          ? `${styles.hamburgerMenu} ${styles.clicked}`
          : `${styles.hamburgerMenu} ${styles.unclicked}`
      }
    >
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
    </div>
  );
}
