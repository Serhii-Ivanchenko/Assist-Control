import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";
import Loader from "./Loader/Loader.jsx";
import { useState, useEffect } from "react";

export default function RestrictedRoute({
  component: Component,
  redirectTo = "/",
}) {
  const { isLoggedIn, isRefreshing } = useSelector(selectAuth);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!isRefreshing) {
      setIsAuthChecked(true); // Позначаємо, що перевірка завершена
    }
  }, [isRefreshing]);

  // Відображаємо лоадер, поки перевірка ще триває
  if (isRefreshing || !isAuthChecked) {
    return <Loader />;
  }

  // Якщо користувач вже залогінений, перекидаємо його на сторінку `redirectTo`
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}
