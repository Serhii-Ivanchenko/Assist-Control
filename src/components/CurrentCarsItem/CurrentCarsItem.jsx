/* eslint-disable react/display-name */
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import clsx from "clsx";

import { HiOutlineHashtag } from "react-icons/hi";
import { BsWrench } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { BsEyeFill } from "react-icons/bs";
import { BsUiChecksGrid } from "react-icons/bs";

import { getCurrentCars } from "../../redux/cars/operations.js";
import { selectCurrentCars } from "../../redux/cars/selectors.js";
import { calculateTimeInService } from "../../utils/calculateTimeInService.js";
import { getStatusDetails } from "../../utils/getStatusDetails.js";

import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import CurrentCarModal from "../Modals/CurrentCarModal/CurrentCarModal";
import Modal from "../Modals/Modal/Modal.jsx";
import styles from "./CurrentCarsItem.module.css";

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

  // const handleStatusChange = () => {
  //   dispatch(getCurrentCars());
  // };

  // Мемоізація іконки в залежності від статусу
  const getStatusIcon = useMemo(() => {
    return (status) => {
      switch (status) {
        case "new":
          return <HiOutlineHashtag stroke="#246D4D" fill="#246D4D" />;
        case "repair":
          return <BsWrench stroke="#246D4D" fill="#246D4D" />;
        // case "check_repair":
        //   return <BsCalendar2CheckFill stroke="#246D4D" fill="#246D4D" />;
        case "complete":
          return <FaCircleCheck stroke="#246D4D" fill="#246D4D" />;
        case "diagnostic":
          return <BsUiChecksGrid stroke="#246D4D" fill="#246D4D" />;
        case "view_repair":
          return <BsEyeFill stroke="#246D4D" fill="#246D4D" />;

        default:
          return null;
      }
    };
  }, []);

  // Мемоізація списку автомобілів для уникнення зайвих обчислень
  const renderedCars = useMemo(() => {
    return currentCars?.map((car) => {
      const icon = getStatusIcon(car.status);
      const { label, className } = getStatusDetails(car.status, icon);

      return (
        <div className={clsx(styles.wrapper, className)} key={car.id}>
          <div className={styles.imgContainer}>
            <img
              className={styles.carImg}
              src={car?.photo_url || absentAutoImg}
              alt="Car image"
              onError={(e) => {
                e.target.onerror = null; // щоб уникнути зациклення події onError
                e.target.src = absentAutoImg; // замінюємо поломаний URL на заглушку
              }}
            />
          </div>
          <div className={styles.carInfoContainer}>
            <h3 className={styles.carReg}>{car.plate}</h3>
            <p className={styles.carBrand}>
              {car.auto || "Марку не визначено"}
            </p>
            <h4 className={styles.carTimeStamp}>
              {calculateTimeInService(car.date_s)}
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
        </div>
      );
    });
  }, [currentCars, getStatusIcon]);

  return (
    <>
      {renderedCars}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CurrentCarModal
            car={selectedCar}
            status={selectedCar?.status}
            onClose={closeModal}
            // onStatusChange={handleStatusChange}
          />
        </Modal>
      )}
    </>
  );
}
