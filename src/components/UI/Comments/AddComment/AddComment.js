import { useState, useContext } from "react";
import AuthContext from "../../../../context/authContext";
import FormInput from "../../../Input/FormInput";
import styles from "./AddComment.module.css";

function AddComment(props) {
  const [newTextComment, setNewTextComment] = useState("");
  const authContext = useContext(AuthContext);
  const auth = authContext.isAuthenticated;
  let userName;
  if (auth) {
    userName = authContext.user.userName;
  }

  const addNewComment = () => {
    const time = new Date();
    const newComment = {
      articleId: props.articleId,
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
    props.onAdd(newComment);
    setNewTextComment("");
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      addNewComment();
    }
  };

  return (
    <div className={styles.form}>
      {auth ? (
        <>
          <FormInput
            placeholder={`Dodaj komentarz`}
            value={newTextComment}
            onChange={setNewTextComment}
            onKeyDown={onKeyDownHandler}
            className={styles.commentForm}
          />
          <button
            className={
              newTextComment.length !== 0 ? styles.activeButton : styles.inactiveButton
            }
            onClick={() => addNewComment()}
          >
            Dodaj
          </button>
        </>
      ) : (
        <div className={styles.form}>
          <h3>Zaloguj się, aby dodawać komentarze.</h3>
        </div>
      )}{" "}
    </div>
  );
}

export default AddComment;
