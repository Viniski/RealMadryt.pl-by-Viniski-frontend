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
