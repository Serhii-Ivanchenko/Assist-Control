import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCars } from "../../redux/cars/operations.js";
import { selectCurrentCars } from "../../redux/cars/selectors.js";

import carImg from "../../assets/images/carListImg.webp";
import CurrentCarModal from "../Modals/CurrentCarModal/CurrentCarModal";
import Modal from "../Modals/Modal/Modal.jsx";

import styles from "./CurrentCarsItem.module.css";
import toast from "react-hot-toast";

const calculateTimeInService = (date_s, date_e) => {
  const startDate = new Date(date_s);
  const endDate = new Date(date_e);
  const differenceInMilliseconds = endDate - startDate;

  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  return `${days} днів ${hours} годин ${minutes} хвилин`;
};

export default function CurrentCarsItem() {
  const dispatch = useDispatch();
  const currentCars = useSelector(selectCurrentCars);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    dispatch(getCurrentCars()).catch((error) => {
      toast.error("Error fetching current cars", error.message);
    });
  }, [dispatch]);

  const handleModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <>
      {currentCars?.map((car) => (
        <div className={styles.wrapper} key={car.id}>
          <div className={styles.imgContainer}>
            <img className={styles.carImg} src={carImg} alt="Car image" />
          </div>
          <div className={styles.carInfoContainer}>
            <h3 className={styles.carReg}>{car.plate}</h3>
            <p className={styles.carBrand}>{car.auto || "Марка не вказана"}</p>
            <h4 className={styles.carTimeStamp}>
              {" "}
              {calculateTimeInService(car.date_s, car.date_e)}
            </h4>
          </div>
          <p className={styles.carStatus}>{car.status}</p>
          <button
            className={styles.carDetails}
            onClick={() => handleModal(car)}
          >
            Деталі
          </button>

          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <CurrentCarModal car={selectedCar} onClose={closeModal} />
            </Modal>
          )}
        </div>
      ))}
    </>
  );
}
