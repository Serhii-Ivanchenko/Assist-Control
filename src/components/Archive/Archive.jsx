import { useState } from "react";
import css from "./Archive.module.css";
import Modal from "../Modals/Modal/Modal.jsx";
import { BsArchive } from "react-icons/bs";
import ArchiveInfoModal from "./ArchiveInfoModal/ArchiveInfoModal.jsx";

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
          <ArchiveInfoModal onClose={handleModalClose} />
        </Modal>
      )}
      <span className={css.tooltipContent}>Архів</span>
    </div>
  );
}
