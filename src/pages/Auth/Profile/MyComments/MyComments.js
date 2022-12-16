import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../../context/authContext";
import { axiosInstance } from "../../../../axios";
import MyComment from "./MyComment/MyComment";
import LoadingIcon from "../../../../components/UI/LoadingIcon/LoadingIcon";
import styles from "./MyComments.module.css";

function MyComments() {
  const [myComments, setMyComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);
  const authUser = auth.user.userName;

  const getMyComments = async () => {
    const res = await axiosInstance.get("/comments");
    let myComments = res.data;
    myComments = myComments.filter((el) => el.user == authUser);
    setMyComments(myComments);
    setLoading(false);
  };

  useEffect(() => {
    getMyComments();
  }, []);

  return (
    <>
      <div className={styles.loginTitle}>
        <h1>Moje komentarze</h1>
      </div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className={styles.commentsPanel}>
          {myComments.length === 0 ? (
            <div className={styles.zeroComment}>
              <p>
                Nie dodałeś jeszcze żadnego komentarza! Zapraszamy do
                komentowania naszych artykułów.
              </p>
            </div>
          ) : (
            myComments.map((comment) => (
              <MyComment key={comment._id} data={comment} />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default MyComments;
