import { useSelector } from "react-redux";
import ChangePasswordWithEmailForm from "../../components/ChangePasswordWithEmailForm/ChangePasswordWithEmailForm";
import css from "../ChangePasswordWithEmailPage/ChangePasswordWithEmailPage.module.css";
import { selectLoading } from "../../redux/auth/selectors";
import Loader from "../../components/Loader/Loader";

export default function ChangePasswordWithEmailPage() {
  const isLoading = useSelector(selectLoading);

  return (
    <div className={css.changePasswordWithEmailContainer}>
      <ChangePasswordWithEmailForm />
      {isLoading && <Loader />}
    </div>
  );
}
