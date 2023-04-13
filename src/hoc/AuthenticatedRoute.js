import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ReducerContext } from "../context/reducerContext";
import { Profile } from "../pages/Auth/Profile/Profile";

export function AuthenticatedRoute() {
  const context = useContext(ReducerContext);

  return context.state.user ? <Profile /> : <Navigate to="/zaloguj" />;
}
