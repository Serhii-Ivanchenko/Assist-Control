import css from "./MainModal.module.css";
import { TfiClose } from "react-icons/tfi";

export default function MainModal({ summary, onClose }) {
  return (
    <div className={css.modalContainer}>
      <TfiClose onClick={onClose} className={css.closeBtn} />

      <div className={css.modalBox}>
        <p className={css.modalText}>{summary}</p>
      </div>
    </div>
  );
}
