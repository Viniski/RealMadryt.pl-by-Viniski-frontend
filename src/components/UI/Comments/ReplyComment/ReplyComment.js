import { useState, useContext } from "react";
import { AuthContext } from "../../../../context/authContext";
import { FormInput } from "../../../Input/FormInput";
import styles from "./ReplyComment.module.css";

export function ReplyComment({
  userName,
  articleId,
  parentId,
  commentId,
  onReply,
}) {
  const [newTextComment, setNewTextComment] = useState(`@${userName} `);
  const authContext = useContext(AuthContext);
  const auth = authContext.isAuthenticated;
  let user;
  if (auth) {
    user = authContext.user.userName;
  }

  const handleReplyComment = (e) => {
    e.preventDefault();
    const time = new Date();
    const newComment = {
      articleId: articleId,
      parentId: parentId || commentId,
      time: time.toLocaleString("pl", {
        dateStyle: "short",
        timeStyle: "medium",
      }),
      isEdited: false,
      user: user,
      text: newTextComment,
      className: "reply",
    };
    onReply(newComment);
    setNewTextComment("");
  };

  return (
    <form onSubmit={handleReplyComment} className={styles.replyDiv}>
      <FormInput
        placeholder={`Dodaj komentarz`}
        value={newTextComment}
        onChange={setNewTextComment}
        className={styles.replyForm}
      />
      <button
        className={
          newTextComment.length !== 0
            ? styles.activeButton
            : styles.inactiveButton
        }
      >
        Odpowiedz
      </button>
    </form>
  );
}
