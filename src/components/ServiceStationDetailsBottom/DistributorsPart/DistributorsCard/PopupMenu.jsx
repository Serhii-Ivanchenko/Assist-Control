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
            <BsPencil size={18} /> Редагувати
          </button>
        </li>
        <li>
          <button
            className={styles.deleteBtn}
            onClick={() => {
              onClose();
            }}
          >
            <BsTrash size={18} /> Видалити
          </button>
        </li>
      </ul>
    </Popup>
  );
}

export default PopupMenu;
