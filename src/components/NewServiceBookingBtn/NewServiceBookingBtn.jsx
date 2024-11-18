import { useState } from "react";
import css from "./NewServiceBookingBtn.module.css";
import Modal from "../Modals/Modal/Modal.jsx";
import { BsPlusLg } from "react-icons/bs";
import ServiceBookingModal from "../Modals/ServiceBookingModal/ServiceBookingModal.jsx";

export default function NewServiceBookingBtn() {
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
        {/* <BsPlusSquareFill className={css.icon} /> */}
        <BsPlusLg className={css.icon} />
      </button>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
          <ServiceBookingModal
            onClose={handleModalClose}
            recordId={null}
            postId={null}
          />
        </Modal>
      )}
      <span className={css.tooltipContent}>Створити запис</span>
    </div>
  );
}
