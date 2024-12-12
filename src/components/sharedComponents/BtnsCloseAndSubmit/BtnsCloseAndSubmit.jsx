import css from "../BtnsCloseAndSubmit/BtnsCloseAndSubmit.module.css";
import { FaCheck } from "react-icons/fa";

export default function BtnsCloseAndSubmit({ onClose, handleSubmit, btnSave }) {
  return (
    <div className={css.wrapper}>
      <button type="button" className={css.closeBtn} onClick={onClose}>
        Закрити
      </button>
      <button type="submit" className={css.submitBtn} onSubmit={handleSubmit}>
        <FaCheck className={css.submitBtnIcon} />
        {btnSave}
      </button>
    </div>
  );
}
