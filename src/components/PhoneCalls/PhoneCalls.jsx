import { useState } from "react";
import css from "./PhoneCalls.module.css";
import Modal from "../Modals/Modal/Modal.jsx";
import PhoneCallsModal from "../Modals/PhoneCallsModal/PhoneCallsModal.jsx";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function PhoneCalls() {
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
        <BsFillTelephoneFill className={css.icon} />
      </button>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
          <PhoneCallsModal onClose={handleModalClose} />
        </Modal>
      )}
      <span className={css.tooltipContent}>Дзвінки</span>
    </div>
  );
}
