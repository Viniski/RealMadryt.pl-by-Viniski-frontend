import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../Input/FormInput";
import styles from "./Searchbar.module.css";

export function Searchbar({ targetDevice }) {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const inputRef = useRef();

  const search = () => {
    if (term === "") return;
    navigate(`/wyszukaj/${term}`);
    setTerm("");
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    focusInput();
  }, [term]);

  return (
    <div
      className={
        targetDevice === "mobile"
          ? styles.searchBarMobile
          : styles.searchBarDeskop
      }
    >
      <FormInput
        innerRef={inputRef}
        placeholder={"Wyszukaj artykuł"}
        value={term}
        onChange={setTerm}
        onKeyDown={onKeyDownHandler}
        className={styles.input}
      />
      <button onClick={search} className={styles.button}>
        Szukaj
      </button>
    </div>
  );
}
