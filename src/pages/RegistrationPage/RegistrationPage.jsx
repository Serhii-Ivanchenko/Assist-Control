import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import css from "../RegistrationPage/RegistrationPage.module.css";

export default function RegistrationPage() {
  return (
    <div className={css.registrationPage}>
      <WelcomeSection />
      <RegistrationForm />
    </div>
  );
}
