import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import useAuth from "../../../hooks/useAuth";
import { axiosInstance } from "../../../axios";
import FormInput from "../../../components/Input/FormInput";
import FormPasswordInput from "../../../components/Input/FormPasswordInput";
import { validate } from "../../../helpers/validation";
import styles from "./Registration.module.css";

export default function Registration() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    user: {
      value: "",
      error: "",
      showError: false,
      rules: ["required"],
    },
    email: {
      value: "",
      error: "",
      showError: false,
      rules: ["required", "email"],
    },
    password: {
      value: "",
      error: "",
      showError: false,
      rules: ["required", { rule: "min", length: 8 }, { rule: "compare" }],
    },
    repeatedPassword: {
      value: "",
      error: "",
      showError: false,
      rules: ["required", { rule: "min", length: 8 }, { rule: "compare" }],
    },
    acceptance: {
      value: false,
      error: "",
      showError: false,
      rules: ["required"],
    },
  });
  const [error, setError] = useState("");

  const valid =
    !Object.values(form)
      .map((input) => input.error)
      .filter((error) => error).length &&
    !Object.values(form)
      .map((input) => input.value)
      .filter((value) => !value).length;

  const submit = async (e) => {
    e.preventDefault();
    const newUser = {
      user: form.user.value,
      email: form.email.value,
      password: form.password.value,
    };
    const newEmail = {
      email: form.email.value,
      user: form.user.value,
    };
    try {
      const res = await axiosInstance.post("/register", newUser);
      await axiosInstance.post("/mailing", newEmail);
      setAuth(true, {
        userName: form.user.value,
        email: form.email.value,
        authenticationMethod: "default",
      });
      navigate("/rejestracja/powitanie");
    } catch (ex) {
      let errorMessage;
      if (
        ex.response.data.message.slice(0, 73) ===
        "E11000 duplicate key error collection: real-madrid-app.users index: user_"
      ) {
        errorMessage = `Niestety nazwa u??ytkownika ${form.user.value} jest ju?? zaj??ta, wybierz inn?? nazw?? u??ytkownika.`;
      }
      if (
        ex.response.data.message.slice(0, 73) ===
        "E11000 duplicate key error collection: real-madrid-app.users index: email"
      ) {
        errorMessage = `U??ytkownik o adresie email ${form.email.value} jest ju?? zarejestrowany na naszym portalu. Przejd?? do strony logowania lub zarejestruj si?? za pomoc?? innego adresu email.`;
      }
      setError(errorMessage);
    }
  };

  const changeHandler = (value, fieldName, password) => {
    const error = validate(form[fieldName].rules, value, password);
    if (fieldName === "password" && error === "") {
      setForm({
        ...form,
        [fieldName]: {
          ...form[fieldName],
          value: value,
          showError: true,
          error: error,
        },
        ["repeatedPassword"]: {
          ...form["repeatedPassword"],
          showError: true,
          error: error,
        },
      });
    } else if (fieldName === "repeatedPassword" && error === "") {
      setForm({
        ...form,
        [fieldName]: {
          ...form[fieldName],
          value: value,
          showError: true,
          error: error,
        },
        ["password"]: {
          ...form["password"],
          showError: true,
          error: error,
        },
      });
    } else {
      setForm({
        ...form,
        [fieldName]: {
          ...form[fieldName],
          value: value,
          showError: true,
          error: error,
        },
      });
    }
    if (
      fieldName === "password" &&
      error === "Podane has??a nie sa identyczne"
    ) {
      setForm({
        ...form,
        [fieldName]: {
          ...form[fieldName],
          value: value,
          showError: true,
          error: "",
        },
      });
    }
  };

  useWebsiteTitle(`Zarejestruj si?? | RealMadryt.pl by Viniski`);

  return (
    <div className={styles.registration}>
      <div className={styles.loginTitle}>
        <h1>Zarejestruj si??</h1>
        <p>Do????cz do grona Madridistas z ca??ej Polski.</p>
        <p>
          Zak??adaj??c konto na RealMadryt.pl by Viniski do????czasz do unikalnej
          spo??eczno??ci kibic??w najlepszego klubu na ??wiecie!
        </p>
      </div>
      <form onSubmit={submit} className={styles.form}>
        <FormInput
          label="Tw??j adres email"
          type="email"
          value={form.email.value}
          onChange={(value) => changeHandler(value, "email")}
          className={
            form.email.showError
              ? form.email.error
                ? styles.invalidInput
                : styles.validInput
              : ""
          }
        />
        <div
          className={
            form.email.showError
              ? form.email.error
                ? styles.invalid
                : styles.notDisplay
              : styles.notDisplay
          }
        >
          {form.email.error}
        </div>
        <div
          className={
            form.email.showError
              ? form.email.error
                ? styles.notDisplay
                : styles.valid
              : styles.notDisplay
          }
        >
          Wszystko gra
        </div>
        <FormInput
          label="Nazwa u??ytkownika"
          value={form.user.value}
          onChange={(value) => changeHandler(value, "user")}
          className={
            form.user.showError
              ? form.user.error
                ? styles.invalidInput
                : styles.validInput
              : ""
          }
        />
        <div
          className={
            form.user.showError
              ? form.user.error
                ? styles.invalid
                : styles.notDisplay
              : styles.notDisplay
          }
        >
          {form.user.error}
        </div>
        <div
          className={
            form.user.showError
              ? form.user.error
                ? styles.notDisplay
                : styles.valid
              : styles.notDisplay
          }
        >
          Wszystko gra
        </div>
        <FormPasswordInput
          label="Has??o"
          type="password"
          value={form.password.value}
          onChange={(value) => {
            changeHandler(value, "password", form.repeatedPassword.value);
          }}
          className={
            form.password.showError
              ? form.password.error
                ? styles.invalidInput
                : styles.validInput
              : ""
          }
        />
        <div
          className={
            form.password.showError
              ? form.password.error
                ? styles.invalid
                : styles.notDisplay
              : styles.notDisplay
          }
        >
          {form.password.error}
        </div>
        <div
          className={
            form.password.showError
              ? form.password.error
                ? styles.notDisplay
                : styles.valid
              : styles.notDisplay
          }
        >
          Wszystko gra
        </div>
        <FormPasswordInput
          label="Powt??rz has??o"
          type="password"
          value={form.repeatedPassword.value}
          onChange={(value) => {
            changeHandler(value, "repeatedPassword", form.password.value);
          }}
          className={
            form.user.showError
              ? form.repeatedPassword.error
                ? styles.invalidInput
                : styles.validInput
              : ""
          }
        />
        <div
          className={
            form.repeatedPassword.showError
              ? form.repeatedPassword.error
                ? styles.invalid
                : styles.notDisplay
              : styles.notDisplay
          }
        >
          {form.repeatedPassword.error}
        </div>
        <div
          className={
            form.repeatedPassword.showError
              ? form.repeatedPassword.error
                ? styles.notDisplay
                : styles.valid
              : styles.notDisplay
          }
        >
          Wszystko gra
        </div>

        <FormInput
          label="Akceptuj?? Regulamin i Polityk?? Prywatno??ci "
          type="checkbox"
          className={styles.checkbox}
          value={form.acceptance.value}
          onChange={(value) => changeHandler(value, "acceptance")}
        />

        {error ? <div className={styles.invalid}>{error}</div> : null}

        <button disabled={!valid} className={styles.loginButton}>
          Za?????? konto
        </button>
      </form>
      <div className={styles.bottomPanel}>
        <span>
          Masz ju?? konto? <Link to="/zaloguj">Zaloguj si??</Link>
        </span>
      </div>
    </div>
  );
}
