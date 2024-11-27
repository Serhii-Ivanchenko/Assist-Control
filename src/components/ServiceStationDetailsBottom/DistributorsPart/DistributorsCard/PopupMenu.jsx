import Popup from "../Popup/Popup";
import { BsPencil, BsTrash } from "react-icons/bs";
import styles from "./DistributorsCard.module.css";

function PopupMenu({ isOpen }) {
  if (!isOpen) return null;

  return (
    <Popup isOpen={isOpen}>
      <ul className={styles.popup}>
        <li>
          <button className={styles.editBtn}>
            <BsPencil /> Редагувати
          </button>
        </li>
        <li>
          <button className={styles.deleteBtn}>
            <BsTrash /> Видалити
          </button>
        </li>
      </ul>
    </Popup>
  );
}

export default PopupMenu;
