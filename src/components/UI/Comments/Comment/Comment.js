import { useState, useContext } from "react";
import AuthContext from "../../../../context/authContext";
import ReplyComment from "../ReplyComment/ReplyComment";
import EditComment from "../EditComment/EditComment";
import styles from "./Comment.module.css";

function Comment(props) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const authContext = useContext(AuthContext);
  const auth = authContext.isAuthenticated;
  let userName;
  if (auth) {
    userName = authContext.user.userName;
  }
  return (
    <div className={styles[props.data.className]}>
      <div className={styles.commentInfo}>
        <span className={styles.commentAuthor}>{`${props.data.user} `}</span>
        <span className={styles.commentTime}>
          {props.data.time}
          {props.data.isEdited ? " (edytowany)" : ""}
        </span>
      </div>
      <div className={styles.commentText}>
        <p className={styles.commentTextParagraph}>{props.data.text}</p>
        {auth ? (
          <>
            <button onClick={() => setShowReplyForm(!showReplyForm)}>
              Odpowiedz
            </button>
            {userName === props.data.user ? (
              <>
                <button onClick={() => setShowEditForm(!showEditForm)}>
                  Edytuj
                </button>
                <button
                  onClick={() =>
                    props.onDelete(props.data._id, props.data.articleId)
                  }
                >
                  Usuń
                </button>
              </>
            ) : null}
          </>
        ) : null}
        {showEditForm && (
          <EditComment onEdit={props.onEdit} data={props.data} />
        )}
        {showReplyForm && (
          <ReplyComment
            onReply={props.onReply}
            articleId={props.data.articleId}
            commentId={props.data._id}
            parentId={props.data.parentId}
            userName={props.data.user}
          />
        )}
      </div>
      {props.replies.map((comment) => (
        <Comment
          key={comment._id}
          data={comment}
          replies={[]}
          _id={comment._id}
          articleId={comment.articleId}
          onDelete={props.onDelete}
          onReply={props.onReply}
          onEdit={props.onEdit}
        />
      ))}
    </div>
  );
}

export default Comment;
