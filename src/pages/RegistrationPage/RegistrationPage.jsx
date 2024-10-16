import { useSelector } from "react-redux";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import css from "../RegistrationPage/RegistrationPage.module.css";
import { selectLoading } from "../../redux/auth/selectors";
import Loader from "../../components/Loader/Loader";

export default function RegistrationPage() {
  const isLoading = useSelector(selectLoading);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={css.registrationPageWrapper}>
      <div className={css.registrationPage}>
        <WelcomeSection />
        <RegistrationForm />
      </div>
    </div>
  );
}
