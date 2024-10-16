import { HiOutlineHashtag } from "react-icons/hi";
import { BsWrench, BsCalendar2CheckFill } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCars } from "../../redux/cars/operations.js";
import { selectCurrentCars } from "../../redux/cars/selectors.js";
import { calculateTimeInService } from "../../utils/calculateTimeInService.js";
import { getStatusDetails } from "../../utils/getStatusDetails.js";
import clsx from "clsx";
import carImg from "../../assets/images/carListImg.webp";
import CurrentCarModal from "../Modals/CurrentCarModal/CurrentCarModal";
import Modal from "../Modals/Modal/Modal.jsx";
import styles from "./CurrentCarsItem.module.css";
import toast from "react-hot-toast";

export default function CurrentCarsItem() {
  const dispatch = useDispatch();
  const currentCars = useSelector(selectCurrentCars);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    dispatch(getCurrentCars()).catch((error) => {
      toast.error(
        "Помилка при завантаженні поточних автомобілів",
        error.message
      );
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

  const handleStatusChange = () => {
    dispatch(getCurrentCars());
  };

  return (
    <>
      {currentCars?.map((car) => {
        let icon;
        switch (car.status) {
          case "new":
            icon = <HiOutlineHashtag stroke="#246D4D" fill="#246D4D" />;
            break;
          case "repair":
            icon = <BsWrench stroke="#246D4D" fill="#246D4D" />;
            break;
          case "check_repair":
            icon = <BsCalendar2CheckFill stroke="#246D4D" fill="#246D4D" />;
            break;
          case "complete":
            icon = <FaCircleCheck stroke="#246D4D" fill="#246D4D" />;
            break;
          default:
            icon = null;
        }

        const { label, className } = getStatusDetails(car.status, icon);

        return (
          <div className={clsx(styles.wrapper, className)} key={car.id}>
            <div className={styles.imgContainer}>
              <img
                className={styles.carImg}
                src={car.photo_url || carImg}
                alt="Car image"
              />
            </div>
            <div className={styles.carInfoContainer}>
              <h3 className={styles.carReg}>{car.plate}</h3>
              <p className={styles.carBrand}>
                {car.auto || "Марку не визначено"}
              </p>
              <h4 className={styles.carTimeStamp}>
                {calculateTimeInService(car.date_s, car.date_e)}
              </h4>
            </div>
            <div className={styles.detailsContainer}>
              <button
                className={styles.carDetails}
                onClick={() => handleModal(car)}
              >
                Деталі
              </button>
              <p className={clsx(styles.carStatus, className)}>
                {icon} {label}
              </p>
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
          </div>
        );
      })}
    </>
  );
}
