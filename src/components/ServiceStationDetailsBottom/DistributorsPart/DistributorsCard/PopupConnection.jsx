import Popup from "../Popup/Popup";
import { IoMdClose } from "react-icons/io";
import styles from "./DistributorsCard.module.css";

function PopupConnection({ isOpen, popupRef, onClose }) {
  if (!isOpen) return null;
  return (
    <Popup isOpen={isOpen} popupRef={popupRef}>
      <div className={styles.popupConnectionWrapper}>
        <button
          className={styles.closeConnectionPopupBtn}
          onClick={() => {
            onClose();
          }}
        >
          <IoMdClose />
        </button>
        <div className={styles.popupInnerContainer}>
          <p className={styles.connectDesc}>
            Для отримання токена перейдіть на сторінку{" "}
            <a
              href="https://login.bm.parts/api"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              login.bm.parts/api
            </a>
            , натисніть кнопку &quot;Новий токен&quot;, введіть будь-яку назву
            та натисніть кнопку &quot;СГЕНЕРУВАТИ&quot;.
          </p>
        </div>
      </div>
    </Popup>
  );
}

export default PopupConnection;
