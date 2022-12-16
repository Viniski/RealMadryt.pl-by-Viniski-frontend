import { axiosInstance } from "../axios";

function useGetArticleDataBase() {
    let articlesDatabase;
    async function getData() {
        const res = await axiosInstance.get(`${process.env.API_URL}/articles`);
        articlesDatabase = res.data; 
     };
      getData();
      return [articlesDatabase];
}

export default useGetArticleDataBase;
