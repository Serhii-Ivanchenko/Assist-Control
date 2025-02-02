import css from "./DeleteServiceModal.module.css";
import { BsXLg } from "react-icons/bs";

export default function DeleteServiceModal({ onClose }) {
  return (
    <div className={css.modal}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <p className={css.text}>
        Для видалення сервісу зверніться до служби технічної підтримки
      </p>
    </div>
  );
}
