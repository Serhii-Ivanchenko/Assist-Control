import { useState } from "react";
import css from "./Notifications.module.css";
import Modal from "../Modals/Modal/Modal.jsx";
import { BsBellFill } from "react-icons/bs";
import NotificationsModal from "../Modals/NotificationsModal/NotificationsModal.jsx";

export default function Notifications() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.tooltip}>
      <button className={css.btn} onClick={openModal}>
        <BsBellFill className={css.icon} />
      </button>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
          <NotificationsModal onClose={handleModalClose} />
        </Modal>
      )}
      <span className={css.tooltipContent}>Сповіщення</span>
    </div>
  );
}
