import { useState, useContext } from "react";
import { AuthContext } from "../../../../context/authContext";
import { ReplyComment } from "../ReplyComment/ReplyComment";
import { EditComment } from "../EditComment/EditComment";
import styles from "./Comment.module.css";

export function Comment({ onDelete, onReply, onEdit, replies, data }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const authContext = useContext(AuthContext);
  const auth = authContext.isAuthenticated;
  let userName;
  if (auth) {
    userName = authContext.user.userName;
  }
  return (
    <div className={styles[data.className]}>
      <div className={styles.commentInfo}>
        <span className={styles.commentAuthor}>{`${data.user} `}</span>
        <span className={styles.commentTime}>
          {data.time}
          {data.isEdited ? " (edytowany)" : ""}
        </span>
      </div>
      <div className={styles.commentText}>
        <p className={styles.commentTextParagraph}>{data.text}</p>
        {auth ? (
          <>
            <button onClick={() => setShowReplyForm(!showReplyForm)}>
              Odpowiedz
            </button>
            {userName === data.user ? (
              <>
                <button onClick={() => setShowEditForm(!showEditForm)}>
                  Edytuj
                </button>
                <button onClick={() => onDelete(data._id, data.articleId)}>
                  Usuń
                </button>
              </>
            ) : null}
          </>
        ) : null}
        {showEditForm && <EditComment onEdit={onEdit} data={data} />}
        {showReplyForm && (
          <ReplyComment
            onReply={onReply}
            articleId={data.articleId}
            commentId={data._id}
            parentId={data.parentId}
            userName={data.user}
          />
        )}
      </div>
      {replies.map((comment) => (
        <Comment
          key={comment._id}
          data={comment}
          replies={[]}
          _id={comment._id}
          articleId={comment.articleId}
          onDelete={onDelete}
          onReply={onReply}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
