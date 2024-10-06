import { BiSupport } from "react-icons/bi";
import css from "./Support.module.css";
import { useState } from "react";
import Modal from "../Modals/Modal/Modal.jsx";
// import SupportModal from "../Modals/SupportModal/SupportModal.jsx";
import UserSettingsModal from "../Modals/UserSettingsModal/UserSettingsModal.jsx";

export default function Support() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className={css.btn} onClick={openModal}>
        <BiSupport className={css.icon} />
      </button>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
          <UserSettingsModal onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}
