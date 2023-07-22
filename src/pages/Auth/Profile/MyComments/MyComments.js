import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../context/authContext";
import { MyComment } from "./MyComment/MyComment";
import { LoadingIcon } from "../../../../components/UI/LoadingIcon/LoadingIcon";
import styles from "./MyComments.module.css";

export function MyComments() {
  const auth = useContext(AuthContext);
  const authUser = auth.user.userName;
  const { data: myArrayOfComments, isLoading } = useQuery(
    ["comments"],
    fetchComments
  );

  let myComments = myComments.filter((el) => el.user == authUser);

  return (
    <>
      <div className={styles.loginTitle}>
        <h1>Moje komentarze</h1>
      </div>
      {isLoading ? (
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
