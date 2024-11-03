import Modal from '../../Modals/Modal/Modal'; 
import PaymentDatailsModal from '../../Modals/PaymentDetailsModal/PaymentDetailsModal'; 
import { useState } from 'react';
import styles from './PaymentBtn.module.css';
import { HiOutlineCurrencyDollar } from "react-icons/hi2";


const PaymentBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.btnContainer}>
      <button className={styles.btnPay} onClick={openModal}>
      <HiOutlineCurrencyDollar size={16}/>
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <PaymentDatailsModal onClose={handleModalClose} />
        </Modal>
      )}
    </div>
  );
};

export default PaymentBtn;
