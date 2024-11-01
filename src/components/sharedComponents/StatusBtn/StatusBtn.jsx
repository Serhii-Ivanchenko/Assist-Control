import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentCars } from "../../../redux/cars/operations";
import Modal from "../../Modals/Modal/Modal";
import CurrentCarModal from "../../Modals/CurrentCarModal/CurrentCarModal";
import styles from "./StatusBtn.module.css";

function StatusBtn({ car }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const openModal = () => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  const handleStatusChange = () => {
    dispatch(getCurrentCars());
  };

  return (
    <>
      <div>
        <button className={styles.carDetails} onClick={openModal}>
          Статус
        </button>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CurrentCarModal
            car={selectedCar}
            status={selectedCar?.status}
            onClose={closeModal}
            onStatusChange={handleStatusChange}
          />
        </Modal>
      )}
    </>
  );
}

export default StatusBtn;
