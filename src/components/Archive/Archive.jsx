import { useState } from "react";
import css from "./Archive.module.css";
import Modal from "../Modals/Modal/Modal.jsx";
import ArchiveModal from "../Modals/ArchiveModal/ArchiveModal.jsx";
import { BsArchive } from "react-icons/bs";
import ServiceBookingModal from "../Modals/ServiceBookingModal/ServiceBookingModal.jsx";

export default function Archive() {
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
        <BsArchive className={css.icon} />
      </button>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
          <ServiceBookingModal onClose={handleModalClose} />
        </Modal>
      )}
      <span className={css.tooltipContent}>Архів</span>
    </div>
  );
}
