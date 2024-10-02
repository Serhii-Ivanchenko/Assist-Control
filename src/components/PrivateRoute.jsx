// import { useSelector } from "react-redux";
// import { selectAuth } from "../redux/user/selectors";
// import { Navigate } from "react-router-dom";
// import Loader from "./Loader/Loader.jsx";

export default function PrivateRoute({
  component: Component,
  // redirectTo = "/",
}) {
  // const { isLoggedIn, token } = useSelector(selectAuth);

  // if (!isLoggedIn && token) {
  //   return <Loader/>;
  // }
  // if (!isLoggedIn && !token) {
  //   return <Navigate to={redirectTo} />;
  // }

  return Component;
}
