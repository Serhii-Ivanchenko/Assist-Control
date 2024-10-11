import { useState } from "react";
import carImg from "../../assets/images/carListImg.webp";
import CurrentCarModal from "../Modals/CurrentCarModal/CurrentCarModal";

import styles from "./CurrentCarsItem.module.css";
import Modal from "../Modals/Modal/Modal.jsx";

export default function CurrentCarsItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img className={styles.carImg} src={carImg} alt="Car image" />
      </div>
      <div className={styles.carInfoContainer}>
        <h3 className={styles.carReg}>AХ5678БУ</h3>
        <p className={styles.carBrand}>Opel Astra</p>
        <h4 className={styles.carTimeStamp}>2 дні 13:48:25</h4>
      </div>
      <p className={styles.carStatus}>В ремонті</p>
      <button className={styles.carDetails} onClick={handleModal}>
        Деталі
      </button>

      {
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CurrentCarModal onClose={closeModal} />
        </Modal>
      }
    </div>
  );
}
