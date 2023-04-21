import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../Input/FormInput";
import styles from "./Searchbar.module.css";

export function Searchbar({ targetDevice }) {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const inputRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    if (term === "") return;
    navigate(`/wyszukaj/${term}`);
    setTerm("");
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    focusInput();
  }, [term]);

  return (
    <form
      onSubmit={handleSearch}
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
        className={styles.input}
      />
      <button className={styles.button}>Szukaj</button>
    </form>
  );
}
