// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../redux/user/selectors";
// import { Navigate } from "react-router-dom";

export default function RestrictedRoute({
  component: Component,
  // redirectTo = "/",
}) {
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  // return isLoggedIn ? <Navigate to={redirectTo} /> :
    return Component;
}
