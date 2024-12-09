import Modal from "../../Modals/Modal/Modal";
import css from "./MainInfoFromVoiceMessage.module.css";
import { BsFilter } from "react-icons/bs";
import MainModal from "./MainModal/MainModal";
import { useState } from "react";

export default function MainInfoFromVoiceMessage({ summary, accounting }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button
        className={`${css.transcriptionImportantBtn} ${
          accounting && css.transcriptionImportantBtnAccounting
        }`}
        onClick={openModal}
      >
        <BsFilter size={18} />
        <p>Головне</p>
      </button>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
          <MainModal summary={summary} onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}
