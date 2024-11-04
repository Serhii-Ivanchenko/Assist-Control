import LoginForm from "../../components/LogInForm/LoginForm";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import css from "../LoginPage/LoginPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/auth/selectors";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getUserData } from "../../redux/auth/operations.js";
// import { selectUser } from "../../redux/auth/selectors";
// import { logIn } from "../../redux/auth/operations.js";

export default function LoginPage() {
  const isLoading = useSelector(selectLoading);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector(selectUser);

  // const handleLogin =  async (credentials) => {
  //   try {
  //     await dispatch(logIn(credentials));
  //     await dispatch(getUserData()).unwrap(); // Отримуємо дані користувача після логіну
  //   } catch (error) {
  //     console.error("Login or data fetching failed", error);
  //   }
  // };

  // const firstPage = () => {
  //   const userFirstPage = user.first_page;
  //     console.log("firstPage", userFirstPage);

  //   switch (userFirstPage) {
  //     case "crm":
  //       return "/crm";
  //     case "carReport":
  //       return "/report";
  //     case "Settings":
  //       return"/settings";
  //     case "v-c":
  //       return "/video-control";
  //     case "default":
  //      default:
  //        return "/video-control";
      

  //   }
  // };
  

  return isLoading ? (
    <Loader />
  ) : (
    <div className={css.loginPageWrapper}>
      <div className={css.loginPage}>
        <WelcomeSection />
          <LoginForm
            // onSubmit={handleLogin}
          />
      </div>
    </div>
  );
}
