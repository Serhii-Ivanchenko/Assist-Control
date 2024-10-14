import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";
import Loader from "./Loader/Loader.jsx";

export default function PrivateRoute({
  component: Component,
  redirectTo = "/",
}) {
  const { isLoggedIn, apiKey, isRefreshing } = useSelector(selectAuth);

  if (isRefreshing) {
    return <Loader />;
  }

  if (!isLoggedIn && !apiKey) {
    return <Navigate to={redirectTo} />;
  }

  if (!isLoggedIn && apiKey) {
    return <Navigate to="/login" />;
  }

  return Component;
}
