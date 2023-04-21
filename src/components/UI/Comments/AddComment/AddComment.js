import { useState, useContext } from "react";
import { AuthContext } from "../../../../context/authContext";
import { FormInput } from "../../../Input/FormInput";
import styles from "./AddComment.module.css";

export function AddComment({ articleId, onAdd }) {
  const [newTextComment, setNewTextComment] = useState("");
  const authContext = useContext(AuthContext);
  const auth = authContext.isAuthenticated;
  let userName;
  if (auth) {
    userName = authContext.user.userName;
  }

  const handleNewComment = (e) => {
    e.preventDefault();
    const time = new Date();
    const newComment = {
      articleId: articleId,
      parentId: null,
      time: time.toLocaleString("pl", {
        dateStyle: "short",
        timeStyle: "medium",
      }),
      isEdited: false,
      user: userName,
      text: newTextComment,
      className: "base",
    };
    onAdd(newComment);
    setNewTextComment("");
  };

  return (
    <form onSubmit={handleNewComment} className={styles.form}>
      {auth ? (
        <>
          <FormInput
            placeholder={`Dodaj komentarz`}
            value={newTextComment}
            onChange={setNewTextComment}
            className={styles.commentForm}
          />
          <button
            className={
              newTextComment.length !== 0
                ? styles.activeButton
                : styles.inactiveButton
            }
          >
            Dodaj
          </button>
        </>
      ) : (
        <div className={styles.form}>
          <h3>Zaloguj się, aby dodawać komentarze.</h3>
        </div>
      )}
    </form>
  );
}
