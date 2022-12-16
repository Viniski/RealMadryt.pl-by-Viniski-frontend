import { useContext } from "react";
import AuthContext from "./../context/authContext";

function useAuth() {
  const authContext = useContext(AuthContext);
  const auth = authContext.isAuthenticated;

  const setAuth = (login, user) => {
    if (login) {
      authContext.login(user);
    } else {
      authContext.logout();
    }
  };

  return [auth, setAuth];
}

export default useAuth;
