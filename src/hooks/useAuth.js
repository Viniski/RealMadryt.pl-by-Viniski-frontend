import { useContext } from "react";
import { AuthContext } from "./../context/authContext";

export function useAuth() {
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
