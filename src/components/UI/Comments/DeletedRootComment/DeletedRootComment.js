import Comment from "../Comment/Comment";
import styles from "./DeletedRootComment.module.css";

function DeletedRootComment(props) {
  return (
    <div className={styles.base}>
      <div className="comment-time">{props.data.time}</div>
      <div className="comment-text">
        <p><em>{props.data.text}</em></p>
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

export default DeletedRootComment;
