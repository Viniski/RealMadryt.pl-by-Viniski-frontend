import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { AuthContext } from "../../../context/authContext";
import { Searchbar } from "../../UI/Searchbar/Searchbar";
import { HamburgerMenu } from "./HamurgerMenu/HamburgerMenu";
import styles from "./Nav.module.css";

export function Nav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cookies] = useCookies();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  let userName;

  if (auth) {
    userName = authContext.user.userName;
  }

  let loguotAuthAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${cookies.refreshjwt}`,
      AuthorizationAlternative: `Bearer ${userName}`,
    },
    withCredentials: true,
  });

  const logout = async (e) => {
    e.preventDefault();
    if (authContext.user.authenticationMethod === "social") {
      window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
    } else {
      await loguotAuthAxios.delete("/logout");
    }
    setAuth(false);
    navigate("/");
  };

  const handlerHamburgerMenu = () => {
    showMobileMenu ? setShowMobileMenu(false) : setShowMobileMenu(true);
  };

  return (
    <>
      <div className={styles.hamburgerMenuDiv} onClick={handlerHamburgerMenu}>
        <HamburgerMenu isClicked={showMobileMenu} />
      </div>
      <nav
        className={
          showMobileMenu ? `${styles.nav}` : `${styles.nav} ${styles.hidden}`
        }
      >
        <ul>
          <li className={styles.navItem} onClick={handlerHamburgerMenu}>
            <NavLink to="/">Home</NavLink>
          </li>
          {auth ? (
            <>
              <li className={styles.navItem} onClick={handlerHamburgerMenu}>
                <NavLink to="/profil">Mój profil</NavLink>
              </li>
              <li className={styles.navItem} onClick={handlerHamburgerMenu}>
                <a href="#" onClick={logout}>
                  Wyloguj
                </a>
              </li>
            </>
          ) : (
            <>
              <li className={styles.navItem} onClick={handlerHamburgerMenu}>
                <NavLink to="/rejestracja">Załóż konto</NavLink>
              </li>

              <li className={styles.navItem} onClick={handlerHamburgerMenu}>
                <NavLink to="/zaloguj">Zaloguj</NavLink>
              </li>
            </>
          )}
          <div className={styles.navItem}>
            <Searchbar targetDevice={"mobile"} />
          </div>
        </ul>
      </nav>
    </>
  );
}
