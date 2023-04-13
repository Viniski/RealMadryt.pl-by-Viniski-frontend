import { useState } from "react";
import { FormInput } from "../../../Input/FormInput";
import styles from "./EditComment.module.css";

export function EditComment({ onEdit, data }) {
  const [newTextComment, setNewTextComment] = useState(data.text);

  const editComment = () => {
    const newComment = {
      articleId: data.articleId,
      _id: data._id,
      parentId: data.parentId,
      time: data.time,
      isEdited: true,
      user: data.user,
      text: newTextComment,
      className: data.className,
    };
    onEdit(newComment);
    setNewTextComment("");
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      editComment();
    }
  };

  return (
    <div className={styles.editDiv}>
      <FormInput
        placeholder={`Dodaj komentarz`}
        value={newTextComment}
        onChange={setNewTextComment}
        onKeyDown={onKeyDownHandler}
        className={styles.editForm}
      />
      <button
        className={
          newTextComment.length !== 0
            ? styles.activeButton
            : styles.inactiveButton
        }
        onClick={() => editComment()}
      >
        Edytuj
      </button>
    </div>
  );
}
