// import { useSelector } from "react-redux";
// import { selectAuth } from "../redux/user/selectors";
// import { Navigate } from "react-router-dom";
// import Loader from "./Loader/Loader.jsx";

export default function PrivateRoute({
  component: Component,
  // redirectTo = "/",
}) {
  // const { isLoggedIn, apiKey } = useSelector(selectAuth);

  // if (!isLoggedIn && apiKey) {
  //   return <Loader/>;
  // }
  // if (!isLoggedIn && !apiKey) {
  //   return <Navigate to={redirectTo} />;
  // }

  return Component;
}
