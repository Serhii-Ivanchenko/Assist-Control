import { useState } from "react";
import styles from "./DetailsBtn.module.css";
import { IoCarSportSharp } from "react-icons/io5";
import Modal from "../../Modals/Modal/Modal.jsx";
import DayCarsModal from "../../Modals/DayCarsModal/DayCarsModal.jsx";

export default function DetailsBtn({ carsData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailsBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.btnContainer}>
      <button className={styles.btn} onClick={handleDetailsBtnClick}>
        Авто в роботі
        <IoCarSportSharp className={styles.iconAvto} />
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <DayCarsModal
            carsData={carsData}
            isModal={true}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
}
