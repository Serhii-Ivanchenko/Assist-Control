import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";
import Loader from "./Loader/Loader.jsx";

export default function RestrictedRoute({
  component: Component,
  redirectTo = "/",
}) {
  const { isLoggedIn, isRefreshing } = useSelector(selectAuth);

   if (isRefreshing) {
     return <Loader />; // Показуємо лоадер під час перевірки
   }

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}
