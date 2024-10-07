import { useState } from 'react';
import styles from './UserBar.module.css';
import { FiSettings } from "react-icons/fi";
import UserSettingsModal from '../Modals/UserSettingsModal/UserSettingsModal';

export default function UserBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.userBarContainer}>
      <button className={styles.btn} onClick={toggleModal}>
        <FiSettings className={styles.iconSettings} />
      </button>
      {isModalOpen && <UserSettingsModal onClose={toggleModal} />}
      {/* <button className={styles.btn}><FiLogOut  /></button> */}
    </div>
  );
}
