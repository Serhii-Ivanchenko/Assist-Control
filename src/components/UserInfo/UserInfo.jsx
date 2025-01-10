import styles from "./UserInfo.module.css";
import defaultAvatar from "../../assets/images/avatar_default.png";
import { FaChevronRight } from "react-icons/fa";
import { selectUser } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "../Modals/Modal/Modal.jsx";
import PaymentTopUpAccountModal from "../Modals/PaymentTopUpAccountModal/PaymentTopUpAccountModal.jsx";
import { selectIsChatOpen } from "../../redux/chat/selectors.js";
import clsx from "clsx";

export default function UserInfo() {
  const user = useSelector(selectUser);
  const [modalIsOpen, setIsOpen] = useState(false);
  const chatIsOpen = useSelector(selectIsChatOpen);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const avatarUrl = user?.avatar_url || defaultAvatar;
  const fullName = user?.name || "Ім'я користувача";

  const companyName = user?.company_name || "Невідомо";
  const userId = user?.id || "Невідомо";
  const balance = user && user.balance !== null ? user.balance : "0";

  return (
    <div
      className={clsx(styles.userInfo, {
        [styles.userInfoWithChat]: chatIsOpen,
      })}
    >
      <div className={styles.avatar}>
        <img src={avatarUrl} alt={fullName} />
      </div>
      <h2
        className={clsx(styles.name, {
          [styles.hidden]: chatIsOpen,
          [styles.visible]: !chatIsOpen,
        })}
      >
        {fullName}
      </h2>

      <div
        className={clsx(styles.userDetails, {
          [styles.hidden]: chatIsOpen,
          [styles.visible]: !chatIsOpen,
        })}
      >
        <p>{companyName}</p>
        <p>ID: {userId}</p>
      </div>
      <div
        className={clsx(styles.balance, {
          [styles.hidden]: chatIsOpen,
          [styles.visible]: !chatIsOpen,
        })}
      >
        <span className={styles.balanceText}>Баланс:</span>
        <button onClick={openModal} className={styles.balanceButton}>
          <span className={styles.num}>{balance} грн</span>
          <FaChevronRight className={styles.icon} />
        </button>

        {modalIsOpen && (
          <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
            <PaymentTopUpAccountModal onClose={handleModalClose} />
          </Modal>
        )}
      </div>
    </div>
  );
}
