import Modal from "../../Modals/Modal/Modal";
import DetailedClientInfo from "../../DetailedClientInfo/DetailedClientInfo";
import { useState } from "react";
import styles from "./CarDetailButton.module.css";
import { useDispatch } from "react-redux";
import { getClientInfo } from "../../../redux/client/operations.js";
import { clearClientInfo } from "../../../redux/client/slice.js";

const CarDetailButton = ({ carId, carName, car }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = async () => {
    await dispatch(clearClientInfo());
    await dispatch(getClientInfo({ carId: carId }));
    console.log(carId, location);
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
          <DetailedClientInfo onClose={handleModalClose} carName={carName} car={car}  />
        </Modal>
      )}
    </div>
  );
};

export default CarDetailButton;
