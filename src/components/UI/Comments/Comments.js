import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { axiosInstance } from "../../../axios";
import { AddComment } from "./AddComment/AddComment";
import { Comment } from "./Comment/Comment";
import { DeletedRootComment } from "./DeletedRootComment/DeletedRootComment";
import { LoadingIcon } from "../LoadingIcon/LoadingIcon";
import {
  fetchComments,
  deleteAPIComment,
  decrementAPIComment,
  incrementAPIComment,
  editAPIComment,
  addAPIComment,
} from "../../../api/helpers";
import styles from "./Comments.module.css";

export function Comments() {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const { data: myArrayOfComments, isLoading } = useQuery(
    ["comments"],
    fetchComments
  );

  let comments = myArrayOfComments.filter((el) => el.articleId === Number(id));
  const rootComments = comments.filter((comment) => comment.parentId === null);

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteAPIComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const { mutate: decrementMutate } = useMutation({
    mutationFn: decrementAPIComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const { mutate: incrementMutate } = useMutation({
    mutationFn: incrementAPIComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: editAPIComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const { mutate: addMutate } = useMutation({
    mutationFn: addAPIComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

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
    deleteMutate(commentId);
    decrementMutate(articleId);
  }

  async function deleteDeletedRootCommentAndLastReplyComment(
    deletedRootCommentId,
    lastReplyCommentId,
    articleId
  ) {
    let data = comments.filter(
      (comment) => comment._id !== deletedRootCommentId
    );
    deleteMutate(deletedRootCommentId);
    data = data.filter((comment) => comment._id !== lastReplyCommentId);
    deleteMutate(lastReplyCommentId);
    decrementMutate(articleId);
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
    decrementMutate(articleId);
    handleEditComment(deletedRootComment);
  }

  async function handleAddComment(newComment) {
    const data = [...comments];
    try {
      addMutate(newComment);
      incrementMutate(newComment.articleId);
    } catch (err) {
      NotificationManager.error(err.response.data.message);
    }
  }

  async function handleEditComment(newComment) {
    editMutate(newComment._id, newComment);
  }

  const getReplyComments = (commentId) =>
    comments.filter((comment) => comment.parentId === commentId);

  return (
    <section className={styles.comments}>
      <NotificationContainer />
      {isLoading ? (
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
