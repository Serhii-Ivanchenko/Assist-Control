import LoginForm from "../../components/LogInForm/LoginForm";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import css from "../LoginPage/LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={css.loginPage}>
      <WelcomeSection />
      <LoginForm />
    </div>
  );
}
