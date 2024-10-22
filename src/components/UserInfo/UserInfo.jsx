import styles from "./UserInfo.module.css";
import defaultAvatar from "../../assets/images/avatar_default.png";
import { FaChevronRight } from "react-icons/fa";
import { selectUser } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "../Modals/Modal/Modal.jsx";
import PaymentTopUpAccountModal from "../Modals/PaymentTopUpAccountModal/PaymentTopUpAccountModal.jsx";

export default function UserInfo() {
  const user = useSelector(selectUser);
  const [modalIsOpen, setIsOpen] = useState(false);

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
    <div className={styles.userInfo}>
      <div className={styles.avatar}>
        <img src={avatarUrl} alt={fullName} />
      </div>
      <h2 className={styles.name}>{fullName}</h2>
      <div className={styles.userDetails}>
        <p>{companyName}</p>
        <p>ID: {userId}</p>
      </div>
      <div className={styles.balance}>
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
