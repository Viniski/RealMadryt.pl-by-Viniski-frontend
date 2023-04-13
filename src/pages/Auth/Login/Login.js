import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../../../hooks/useAuth";
import { useWebsiteTitle } from "./../../../hooks/useWebsiteTitle";
import { axiosInstance } from "./../../../axios";
import google from "../../../assets/icons/google.webp";
import github from "../../../assets/icons/github.webp";
import { FormInput } from "../../../components/Input/FormInput";
import { FormPasswordInput } from "../../../components/Input/FormPasswordInput";
import styles from "./Login.module.css";

export function Login() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid] = useState(null);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/login", {
        email,
        password,
      });
      setAuth(true, {
        userName: res.data.userName,
        email: email,
        authenticationMethod: "default",
      });
      navigate("/");
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const googleHandler = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
  };

  const githubHandler = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/github`, "_self");
  };

  useWebsiteTitle(`Zaloguj się | RealMadryt.pl by Viniski`);

  return (
    <div className={styles.container}>
      <div className={styles.loginTitle}>
        <div className={styles.loginChoose}>
          <h1>Madridisto, wybierz metodę logowania</h1>
        </div>
        <div className={styles.loginTitleOptions}>
          <span>Konta na RealMadryt.pl by Viniski</span>
        </div>
        <div className={styles.loginTitleOptions}>
          <span>Zaloguj się używając swojego konta w innym serwisie</span>
        </div>
      </div>

      <section className={styles.wrapper}>
        <div className={styles.leftPanel}>
          {valid === false ? (
            <div className={styles.error}> Niepoprawne dane logowanie</div>
          ) : null}
          <form onSubmit={submit} className={styles.form}>
            <FormInput
              label="Email"
              type="email"
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <FormPasswordInput
              label="Hasło"
              type="password"
              value={password}
              onChange={(value) => setPassword(value)}
            />
            {error ? <div className={styles.error}>{error}</div> : null}
            <button className={styles.loginButton}>Zaloguj</button>
          </form>
        </div>
        <div className={styles.rightPanel}>
          <button
            className={`${styles.socialLoginButton} ${styles.google}`}
            onClick={googleHandler}
          >
            <img
              src={google}
              alt="logowanie za pomocą konta google"
              className={styles.icon}
            />
            Google
          </button>
          <button
            className={`${styles.socialLoginButton} ${styles.github}`}
            onClick={githubHandler}
          >
            <img
              src={github}
              alt="logowanie za pomocą konta github"
              className={styles.icon}
            />
            Github
          </button>
        </div>
        <div className={styles.bottomPanel}>
          <span>
            Nie masz jeszcze konta?{" "}
            <Link to="/rejestracja" className={styles.link}>
              Zarejestruj się
            </Link>
          </span>
        </div>
      </section>
    </div>
  );
}
