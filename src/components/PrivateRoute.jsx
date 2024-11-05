import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";
import Loader from "./Loader/Loader.jsx";
import { useEffect, useState } from "react";

export default function PrivateRoute({
  component: Component,
  redirectTo = "/",
}) {
  const { isLoggedIn, apiKey, isRefreshing } = useSelector(selectAuth);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!isRefreshing) {
      setIsAuthChecked(true); // Встановлюємо прапорець після завершення перевірки
    }
  }, [isRefreshing]);

  // Показуємо лоадер до завершення перевірки автентифікації
  if (isRefreshing || !isAuthChecked) {
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
