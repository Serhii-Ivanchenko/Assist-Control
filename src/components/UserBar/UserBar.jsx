import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './UserBar.module.css';
import { FiSettings } from "react-icons/fi";
import UserSettingsModal from '../Modals/UserSettingsModal/UserSettingsModal';
import Modal from '../Modals/Modal/Modal.jsx';

export default function UserBar() {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const buttonRef = useRef(null);

  const openSettingsModal = () => {
    setSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setSettingsModalOpen(false);
  };

  return (
    <div className={styles.userBarContainer}>
      <button className={styles.btn} onClick={openSettingsModal} ref={buttonRef}>
        <FiSettings className={styles.iconSettings} />
      </button>

      {isSettingsModalOpen && (
        <Modal isOpen={isSettingsModalOpen} onClose={closeSettingsModal}>
          <UserSettingsModal onClose={closeSettingsModal} />
        </Modal>
      )}
    </div>
  );
}
