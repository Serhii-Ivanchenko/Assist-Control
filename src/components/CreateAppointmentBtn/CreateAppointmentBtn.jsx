import css from "./CreateAppointmentBtn.module.css";

import { VscAdd } from "react-icons/vsc";
export default function CreateAppointmentBtn() {
  return (
    <div className={css.btnContainer}>
          <button className={css.btn} >
        <div className={css.iconPlus}> <VscAdd className={css.icon} /> </div>
        Створити запис
        
      </button>
    </div>
  );
}