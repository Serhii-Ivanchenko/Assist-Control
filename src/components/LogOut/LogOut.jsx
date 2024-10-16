import { BsBoxArrowRight } from "react-icons/bs";
import Modal from "../Modals/Modal/Modal.jsx";
import { useState } from "react";
import css from './LogOut.module.css'
import LogoutModal from "../Modals/LogoutModal/LogoutModal.jsx";

export default function LogOut() {
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
        <BsBoxArrowRight className={css.icon} />
      </button>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
          <LogoutModal onClose={handleModalClose} />
        </Modal>
      )}
      <span className={css.tooltipContent}>Вийти</span>
    </div>
  );
}
