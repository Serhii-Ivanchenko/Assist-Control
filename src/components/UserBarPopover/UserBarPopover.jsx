import { FiLogOut, FiSettings } from "react-icons/fi";
import css from "./UserBarPopover.module.css";
import { useEffect, useRef, useState } from "react";
import Modal from "../Modals/Modal/Modal.jsx";
import UserSettingsModal from "../Modals/UserSettingsModal/UserSettingsModal.jsx";
import LogoutModal from "../Modals/LogoutModal/LogoutModal.jsx";

export default function UserBarPopover({ isVisible, onClose, buttonRef }) {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setLogOutModalOpen] = useState(false);
  const popoverRef = useRef(null);

  const openSettingsModal = () => setSettingsModalOpen(true);
  const closeSettingsModal = () => setSettingsModalOpen(false);
  const openLogOutModal = () => setLogOutModalOpen(true);
  const closeLogOutModal = () => setLogOutModalOpen(false);

  const handleSettingsClick = () => {
    openSettingsModal();
    onClose();
  };

  const handleLogoutClick = () => {
    openLogOutModal();
    onClose();
  };

  const handleClickOutside = (event) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div
      ref={popoverRef}
      className={`${css.popover} ${
        isVisible ? css.popoverVisible : css.hidden
      }`}
    >
      <button className={css.settings} onClick={handleSettingsClick}>
        <FiSettings className={css.icon} />
        <p className={css.text}>Налаштування</p>
      </button>
      <button className={css.logout} onClick={handleLogoutClick}>
        <FiLogOut className={css.icon} />
        <p className={css.text}>Вийти</p>
      </button>

      {isSettingsModalOpen && (
        <Modal
          isOpen={isSettingsModalOpen}
          onClose={closeSettingsModal}
          isSettingsModalOpen={isSettingsModalOpen}
        >
          <UserSettingsModal onClose={closeSettingsModal} />
        </Modal>
      )}

      {isLogOutModalOpen && (
        <Modal isOpen={isLogOutModalOpen} onClose={closeLogOutModal}>
          <LogoutModal onClose={closeLogOutModal} />
        </Modal>
      )}
    </div>
  );
}
