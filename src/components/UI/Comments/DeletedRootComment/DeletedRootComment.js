import { Comment } from "../Comment/Comment";
import styles from "./DeletedRootComment.module.css";

export function DeletedRootComment({
  replies,
  onDelete,
  onReply,
  onEdit,
  data,
}) {
  return (
    <div className={styles.base}>
      <div className="comment-time">{data.time}</div>
      <div className="comment-text">
        <p>
          <em>{data.text}</em>
        </p>
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
