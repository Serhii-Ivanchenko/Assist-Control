import LoginForm from "../../components/LogInForm/LoginForm";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import css from "../LoginPage/LoginPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/auth/selectors";

export default function LoginPage() {
  const isLoading = useSelector(selectLoading);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={css.loginPageWrapper}>
      <div className={css.loginPage}>
        <WelcomeSection />
        <LoginForm />
      </div>
    </div>
  );
}
