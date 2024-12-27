import { BsPlusLg } from "react-icons/bs";
import css from "./CreateAppointmentBtn.module.css";

export default function CreateAppointmentBtn({ onClick }) {
  return (
    <div className={css.btnContainer}>
      <button className={css.btn} onClick={onClick}>
        <div className={css.iconPlus}>
          <BsPlusLg className={css.icon} />
        </div>
        Створити запис
      </button>
    </div>
  );
}
