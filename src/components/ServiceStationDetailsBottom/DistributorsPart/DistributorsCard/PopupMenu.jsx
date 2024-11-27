import Popup from "../Popup/Popup";
import { BsPencil, BsTrash } from "react-icons/bs";
import styles from "./DistributorsCard.module.css";

function PopupMenu({ isOpen, onClose, popupRef }) {
  if (!isOpen) return null;

  return (
    <Popup isOpen={isOpen} onClose={onClose} popupRef={popupRef}>
      <ul className={styles.popup}>
        <li>
          <button
            className={styles.editBtn}
            onClick={() => {
              onClose();
            }}
          >
            <BsPencil /> Редагувати
          </button>
        </li>
        <li>
          <button
            className={styles.deleteBtn}
            onClick={() => {
              onClose();
            }}
          >
            <BsTrash /> Видалити
          </button>
        </li>
      </ul>
    </Popup>
  );
}

export default PopupMenu;
