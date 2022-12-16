import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { axiosInstance } from "../../../axios";
import AddComment from "./AddComment/AddComment";
import Comment from "./Comment/Comment";
import DeletedRootComment from "./DeletedRootComment/DeletedRootComment";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import styles from "./Comments.module.css";

function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const rootComments = comments.filter((comment) => comment.parentId === null);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const res = await axiosInstance.get("/comments");
    let myArrayOfComments = res.data.filter((el) => el.articleId === Number(id));
    setComments(myArrayOfComments);
    setLoading(false);
  }

  function handleDeleteComment(commentId, articleId) {
    let _id = commentId;
    let article_id = articleId;
    let delComment = comments.filter((comment) => comment._id === _id);
    delComment = delComment[0];
    if (delComment.parentId !== null) {
      let rootComment = comments.filter(
        (comment) => comment._id === delComment.parentId
      );
      rootComment = rootComment[0];
      if (getReplyComments(rootComment._id).length > 1) {
        deleteComment(_id, article_id);
      } else if (getReplyComments(rootComment._id).length === 1) {
        deleteDeletedRootCommentAndLastReplyComment(
          rootComment._id,
          _id,
          article_id
        );
      }
    } else {
      if (getReplyComments(_id).length !== 0) {
        deleteRootComments(_id, article_id);
      } else {
        deleteComment(_id, article_id);
      }
    }
  }

  async function deleteComment(commentId, articleId) {
    let data = comments.filter((comment) => comment._id !== commentId);
    await axiosInstance.delete(`/comments/${commentId}`);
    await axiosInstance.put(`/articles-comments-decrement/${articleId}`);
    setComments(data);
  }

  async function deleteDeletedRootCommentAndLastReplyComment(
    deletedRootCommentId,
    lastReplyCommentId,
    articleId
  ) {
    let data = comments.filter(
      (comment) => comment._id !== deletedRootCommentId
    );
    await axiosInstance.delete(`/comments/${deletedRootCommentId}`);
    data = data.filter((comment) => comment._id !== lastReplyCommentId);
    await axiosInstance.delete(`/comments/${lastReplyCommentId}`);
    await axiosInstance.put(`/articles-comments-decrement/${articleId}`);
    setComments(data);
  }

  async function deleteRootComments(commentId, articleId) {
    let data = comments.filter((comment) => comment._id === commentId);
    data = data[0];
    const deletedRootComment = {
      articleId: data.articleId,
      _id: data._id,
      parentId: data.parentId,
      time: data.time,
      isEdited: false,
      user: null,
      userId: null,
      text: "Użytkownik usunął treść komentarza",
      className: data.className,
    };
    await axiosInstance.put(`/articles-comments-decrement/${articleId}`);
    handleEditComment(deletedRootComment);
  }

  async function handleAddComment(newComment) {
    const data = [...comments];
    try {
      const res = await axiosInstance.post("/comments", newComment);
      const addedComment = res.data;
      await axiosInstance.put(
        `/articles-comments-increment/${newComment.articleId}`
      );
      data.push(addedComment);
      setComments(data);
    } catch (err) {
      NotificationManager.error(err.response.data.message);
    }
  }

  async function handleEditComment(newComment) {
    await axiosInstance.put(`/comments/${newComment._id}`, newComment);
    const data = [...comments];
    const index = data.findIndex((el) => el._id === newComment._id);
    data[index] = newComment;
    setComments(data);
  }

  const getReplyComments = (commentId) =>
    comments.filter((comment) => comment.parentId === commentId);

  return (
    <section className={styles.comments}>
      <NotificationContainer />
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <h2>Komentarze</h2>
          <AddComment
            onAdd={(newComment) => handleAddComment(newComment)}
            articleId={id}
          />
          {rootComments.map((comment) => {
            if (comment.user === null) {
              return (
                <DeletedRootComment
                  key={comment._id}
                  data={comment}
                  replies={getReplyComments(comment._id)}
                  onDelete={(commentId, articleId) =>
                    handleDeleteComment(commentId, articleId)
                  }
                  onReply={(newComment) => handleAddComment(newComment)}
                  onEdit={(newComment) => handleEditComment(newComment)}
                />
              );
            }
            return (
              <Comment
                key={comment._id}
                data={comment}
                replies={getReplyComments(comment._id)}
                onDelete={(commentId, articleId) =>
                  handleDeleteComment(commentId, articleId)
                }
                onReply={(newComment) => handleAddComment(newComment)}
                onEdit={(newComment) => handleEditComment(newComment)}
              />
            );
          })}
        </>
      )}
    </section>
  );
}

export default Comments;
