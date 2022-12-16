import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../../context/authContext";
import { axiosInstance } from "../../../../axios";
import FormInput from "../../../../components/Input/FormInput";
import FormPasswordInput from "../../../../components/Input/FormPasswordInput";
import styles from "./PasswordChange.module.css";

export default function PasswordChange() {
  const authContext = useContext(AuthContext);
  const authEmail = authContext.user.email;
  const [email, setEmail] = useState(authEmail); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    confirmPassword: "",
    backendError: "",
  });
  const [showError, setShowError] = useState({
    confirmPassword: false,
    backendError: false,
  });
  const [success, setSuccess] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handlerConfirmPassword = (value) => {
    setConfirmPassword(value);
    setShowError({ ...showError, confirmPassword: true });
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put("/password-change", {
        email,
        password,
        authEmail,
      });
      setSuccess(
        "Zmiana hasła przebiegła prawidłowo. Hasło zostało zaktualizowane."
      );
      setErrors({
        ...errors,
        backendError: "",
      });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowSuccess({ ...showError, backendError: false, });
      setShowSuccess(true);
    } catch (ex) {
      let error = ex.response.data.message;
      setErrors({
        ...errors,
        backendError: error,
      });
      setShowError({ ...showError, backendError: true });
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Podane hasła nie są identyczne",
      });
    } else {
      setErrors({ ...errors, confirmPassword: "" });
      setShowError({ ...showError, confirmPassword: false });
    }
  }, [password, confirmPassword]);

  return (
    <>
      <div className={styles.loginTitle}>
        <h1>Zmiana hasła</h1>
      </div>
      <form onSubmit={submit} className={styles.form}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(value) => setEmail(value)}
        />
        <FormPasswordInput
          label="Nowe hasło (min. 8 znaków)"
          type="password"
          value={password}
          onChange={(value) => setPassword(value)}
        />
        <FormPasswordInput
          label="Powtórz nowe hasło"
          type="password"
          value={confirmPassword}
          onChange={(value) => handlerConfirmPassword(value)}
          classNameButton={styles.passwordEye}
        />
        <div
          className={
            showError.confirmPassword
              ? errors.confirmPassword
                ? styles.invalid
                : styles.notDisplay
              : styles.notDisplay
          }
        >
          {errors.confirmPassword}
        </div>
        <div
          className={
            showError.backendError
              ? errors.backendError
                ? styles.invalid
                : styles.notDisplay
              : styles.notDisplay
          }
        >
          {errors.backendError}
        </div>
        <div
          className={
            showSuccess
              ? success
                ? styles.valid
                : styles.notDisplay
              : styles.notDisplay
          }
        >
          {success}
        </div>
        <button
          disabled={errors.confirmPassword}
          className={styles.loginButton}
        >
          Zapisz zmiany
        </button>
      </form>
    </>
  );
}
