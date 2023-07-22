import { axiosInstance } from "../axios";

export async function fetchArticles() {
  try {
    const { data } = await axiosInstance.get("/articles");
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchComments() {
  try {
    const { data } = await axiosInstance.get("/comments");
    return data;
  } catch (err) {
    console.error(err);
  }
}

export const addAPIComment = async (newComment) => {
  try {
    const { data } = await axiosInstance.post("/comments", newComment);
    return data;
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};

export const editAPIComment = async (commentId, newComment) => {
  try {
    await axiosInstance.put(`/comments/${commentId}`, newComment);
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};

export const deleteAPIComment = async (commentId) => {
  try {
    await axiosInstance.delete(`/comments/${commentId}`);
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};

export const decrementAPIComment = async (articleId) => {
  try {
    await axiosInstance.put(`/articles-comments-decrement/${articleId}`);
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};

export const incrementAPIComment = async (articleId) => {
  try {
    await axiosInstance.put(`/articles-comments-increment/${articleId}`);
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};
