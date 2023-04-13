import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { useWebsiteTitle } from "../../../hooks/useWebsiteTitle";
import { MyComments } from "./MyComments/MyComments";
import { PasswordChange } from "./PasswordChange/PasswordChange";
import styles from "./Profile.module.css";

export function Profile() {
  const authContext = useContext(AuthContext);
  useWebsiteTitle(`Mój profil | RealMadryt.pl by Viniski`);

  return (
    <div className={styles.profile}>
      {authContext.user.authenticationMethod === "social" ? (
        <MyComments />
      ) : (
        <>
          <PasswordChange />
          <MyComments />
        </>
      )}
    </div>
  );
}
