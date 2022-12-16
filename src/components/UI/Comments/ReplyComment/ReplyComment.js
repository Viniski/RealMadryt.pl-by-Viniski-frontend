import { useState, useContext } from "react";
import AuthContext from "../../../../context/authContext";
import FormInput from "../../../Input/FormInput";
import styles from "./ReplyComment.module.css";

function ReplyComment(props) {
  const [newTextComment, setNewTextComment] = useState(`@${props.userName} `);
  const authContext = useContext(AuthContext);
  const auth = authContext.isAuthenticated;
  let userName;
  if (auth) {
    userName = authContext.user.userName;
  }

  const addReplyComment = () => {
    const time = new Date();
    const newComment = {
      articleId: props.articleId,
      parentId: props.parentId || props.commentId,
      time: time.toLocaleString("pl", {
        dateStyle: "short",
        timeStyle: "medium",
      }),
      isEdited: false,
      user: userName,
      text: newTextComment,
      className: "reply",
    };
    props.onReply(newComment);
    setNewTextComment("");
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      addReplyComment();
    }
  };

  return (
    <div className={styles.replyDiv}>
      <FormInput
            placeholder={`Dodaj komentarz`}
            value={newTextComment}
            onChange={setNewTextComment}
            onKeyDown={onKeyDownHandler}
            className={styles.replyForm}
          />
      <button
        className={
          newTextComment.length !== 0 ? styles.activeButton : styles.inactiveButton
        }
        onClick={() => addReplyComment()}
      >
        Odpowiedz
      </button>
    </div>
  );
}

export default ReplyComment;
