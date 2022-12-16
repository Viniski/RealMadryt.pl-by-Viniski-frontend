import styles from "./HamburgerMenu.module.css";

function HamburgerMenu(props) {
  return (
    <div
      className={
        props.isClicked
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

export default HamburgerMenu;
