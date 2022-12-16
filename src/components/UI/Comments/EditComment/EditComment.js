import { useState } from "react";
import FormInput from "../../../Input/FormInput";
import styles from "./EditComment.module.css";

function EditComment(props) {
  const [newTextComment, setNewTextComment] = useState(props.data.text);

  const editComment = () => {
    const newComment = {
      articleId: props.data.articleId,
      _id: props.data._id,
      parentId: props.data.parentId,
      time: props.data.time,
      isEdited: true,
      user: props.data.user,
      text: newTextComment,
      className: props.data.className,
    };
    props.onEdit(newComment);
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
          newTextComment.length !== 0 ? styles.activeButton : styles.inactiveButton
        }
        onClick={() => editComment()}
      >
        Edytuj
      </button>
    </div>
  );
}

export default EditComment;
