import { useDispatch } from "react-redux";
import { useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";

import { calculateTimeInService } from "../../../utils/calculateTimeInService";
import { getStatusDetails } from "../../../utils/getStatusDetails";
import { changeCarStatus } from "../../../redux/cars/operations";
import { getCurrentCars } from "../../../redux/cars/operations";

import absentAutoImg from "../../../assets/images/absentAutoImg.webp";
import flag from "../../../assets/images/flagUa.webp";
import CustomRadioBtn from "../../CustomRadioBtn/CustomRadioBtn";

import { BsWrench, BsCalendar2CheckFill } from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";
import { BsUiChecksGrid } from "react-icons/bs";
import { BsEyeFill, BsCheckCircleFill } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

import styles from "./CurrentCarModal.module.css";

function CurrentCarModal({ onClose, car, status }) {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(status);

  // let icon;
  // switch (car.status) {
  //   case "new":
  //     icon = <HiOutlineHashtag stroke="var(--light-gray)" fill="var(--light-gray)" />;
  //     break;
  //   case "repair":
  //     icon = <BsWrench stroke="var(--light-gray)" fill="var(--light-gray)" />;
  //     break;
  //   // case "check_repair":
  //   //   icon = <BsCalendar2CheckFill stroke="var(--light-gray)" fill="var(--light-gray)" />;
  //   //   break;
  //   case "complete":
  //     icon = <BsCheckCircleFill stroke="var(--light-gray)" fill="var(--light-gray)" />;
  //     break;
  //   case "diagnostic":
  //     return <BsUiChecksGrid stroke="var(--light-gray)" fill="var(--light-gray)" />;
  //   case "view_repair":
  //     return <BsEyeFill stroke="var(--light-gray)" fill="var(--light-gray)" />;
  //   default:
  //     icon = null;
  // }
  // Функція для отримання іконки відповідно до статусу
  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return (
          <HiOutlineHashtag
            stroke="var(--light-gray)"
            fill="var(--light-gray)"
          />
        );
      case "repair":
        return <BsWrench stroke="var(--light-gray)" fill="var(--light-gray)" />;
      case "complete":
        return (
          <BsCheckCircleFill
            stroke="var(--light-gray)"
            fill="var(--light-gray)"
          />
        );
      case "diagnostic":
        return (
          <BsUiChecksGrid stroke="var(--light-gray)" fill="var(--light-gray)" />
        );
      case "view_repair":
        return (
          <BsEyeFill stroke="var(--light-gray)" fill="var(--light-gray)" />
        );
      default:
        return null;
    }
  };

  const icon = getStatusIcon(selectedStatus); // Динамічне оновлення іконки
  const { label, className } = getStatusDetails(selectedStatus);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(changeCarStatus({ carId: car.id, status: selectedStatus }))
      .then(() => {
        dispatch(getCurrentCars());
      })
      .catch((error) => {
        toast.error("Помилка при оновленні статусу автомобіля", error.message);
      });
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={styles.currentCarContainer}>
          <img
            src={car.photo_url || absentAutoImg}
            className={styles.currentCarImg}
            alt="Current car image"
          />
          <div className={styles.nameContainer}>
            <h3 className={styles.carBrand}>
              {car.auto || "Марку не визначено"}
            </h3>
            <p className={clsx(styles.carStatus, className)}>
              {icon} {label}
            </p>
            <div className={styles.carRegContainer}>
              <div className={styles.carRegCountry}>
                <img
                  className={styles.carRegFlag}
                  src={flag}
                  alt="Car registration country flag"
                />
                <p className={styles.carRegCountry}>ua</p>
              </div>
              <p className={styles.carRegNumber}>{car.plate}</p>
            </div>
          </div>
        </div>
        <button className={styles.closeBtn} type="button" onClick={onClose}>
          <IoMdClose className={styles.iconClose} />
        </button>

        <p className={styles.vinCode}>
          VIN:{" "}
          <span className={styles.vinNumber}>
            {car.vin || "VIN не визначено"}
          </span>
        </p>
        <div className={styles.serviceInfo}>
          <p className={styles.serviceTime}>
            {<MdOutlineTimer className={styles.icon} />}
            {calculateTimeInService(car.date_s)}
          </p>
        </div>
        <div className={styles.radioGroup}>
          <label className={styles.radioNew}>
            <input
              type="radio"
              name="carStatus"
              value="diagnostic"
              checked={selectedStatus === "diagnostic"}
              onChange={handleStatusChange}
              className={styles.radioInput}
            />
            <CustomRadioBtn isChecked={selectedStatus === "diagnostic"} />
            {<BsUiChecksGrid className={styles.iconRadio} />}
            Діагностика
          </label>
          <label className={styles.radioCheckRepair}>
            <input
              type="radio"
              name="carStatus"
              value="view_repair"
              checked={selectedStatus === "view_repair"}
              onChange={handleStatusChange}
              className={styles.radioInput}
            />
            <CustomRadioBtn isChecked={selectedStatus === "view_repair"} />
            {<BsEyeFill className={styles.iconRadio} />}
            Огляд ПР
          </label>
          <label className={styles.radioRepair}>
            <input
              type="radio"
              name="carStatus"
              value="repair"
              checked={selectedStatus === "repair"}
              onChange={handleStatusChange}
              className={styles.radioInput}
            />
            <CustomRadioBtn isChecked={selectedStatus === "repair"} />
            {<BsWrench className={styles.iconRadio} />} В ремонті
          </label>
          <label className={styles.radioComplete}>
            <input
              type="radio"
              name="carStatus"
              value="complete"
              checked={selectedStatus === "complete"}
              onChange={handleStatusChange}
              className={styles.radioInput}
            />
            <CustomRadioBtn isChecked={selectedStatus === "complete"} />
            {<BsCheckCircleFill className={styles.iconRadio} />}
            Завершено
          </label>
        </div>
        <button
          className={styles.submitBtn}
          type="submit"
          onClick={handleSubmit}
        >
          {<IoMdCheckmark className={styles.iconSubmit} />}
          Підтвердити
        </button>
      </div>
    </div>
  );
}

export default CurrentCarModal;
