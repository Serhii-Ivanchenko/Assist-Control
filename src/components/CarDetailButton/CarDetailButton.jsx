import Modal from '../Modals/Modal/Modal'; 
import DetailedClientInfo from '../DetailedClientInfo/DetailedClientInfo'; 
import { useState } from 'react';
import styles from './CarDetailButton.module.css';

const CarDetailButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.btnContainer}>
      <button className={styles.btnDetail} onClick={openModal}>
        <p className={styles.btnDetailText}>Інфо</p>
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <DetailedClientInfo onClose={handleModalClose} />
        </Modal>
      )}
    </div>
  );
};

export default CarDetailButton;
