import { useState, useRef } from 'react';
import styles from './UserBar.module.css';
import { FiSettings } from "react-icons/fi";
import UserSettingsModal from '../Modals/UserSettingsModal/UserSettingsModal';
import Modal from '../Modals/Modal/Modal.jsx';
import { selectIsChatOpen } from '../../redux/chat/selectors.js';
import { useSelector } from 'react-redux';

export default function UserBar() {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const buttonRef = useRef(null);
  const chatIsOpen = useSelector(selectIsChatOpen);


  const openSettingsModal = () => {
    setSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setSettingsModalOpen(false);
  };

  const userBarClass = chatIsOpen ? `${styles.userBarContainer} ${styles.chatOpen}` : styles.userBarContainer;

  return (
    <div className={userBarClass}>
      <button
        className={styles.btn}
        onClick={openSettingsModal}
        ref={buttonRef}
      >
        <FiSettings className={styles.iconSettings} />
        <span className={styles.tooltipContent}>Налаштування</span>
      </button>

      {isSettingsModalOpen && (
        <Modal isOpen={isSettingsModalOpen} onClose={closeSettingsModal}>
          <UserSettingsModal onClose={closeSettingsModal} />
        </Modal>
      )}
    </div>
  );
}
