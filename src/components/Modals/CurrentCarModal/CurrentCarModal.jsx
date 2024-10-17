import { HiOutlineHashtag } from "react-icons/hi";
import { BsWrench, BsCalendar2CheckFill } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";
import { BsUiChecksGrid } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";

import Modal from "react-modal";
import currentCar from "../../../assets/images/carListImg.webp";
import flag from "../../../assets/images/flagUa.webp";
import { IoMdClose } from "react-icons/io";
import styles from "./CurrentCarModal.module.css";
import { calculateTimeInService } from "../../../utils/calculateTimeInService";
import { getStatusDetails } from "../../../utils/getStatusDetails";
import clsx from "clsx";

import { changeCarStatus } from "../../../redux/cars/operations";
import { useDispatch } from "react-redux";
import { useState } from "react";

Modal.setAppElement("#root");

function CurrentCarModal({ onClose, car, status }) {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(status);

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

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(changeCarStatus({ carId: car.id, status: selectedStatus }));
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={styles.currentCarContainer}>
          <img
            src={car.photo_url || currentCar}
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
          <IoMdClose className={styles.icon} />
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
            {calculateTimeInService(car.date_s, car.date_e)}
          </p>
        </div>
        <div className={styles.radioGroup}>
          <label className={styles.radioNew}>
            <input
              type="radio"
              name="carStatus"
              value="new"
              checked={selectedStatus === "new"}
              onChange={handleStatusChange}
            />
            {<BsUiChecksGrid className={styles.iconRadio} />}
            Діагностика
          </label>
          <label className={styles.radioCheckRepair}>
            <input
              type="radio"
              name="carStatus"
              value="check_repair"
              checked={selectedStatus === "check_repair"}
              onChange={handleStatusChange}
            />
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
            />
            {<BsWrench className={styles.iconRadio} />} В ремонті
          </label>
          <label className={styles.radioComplete}>
            <input
              type="radio"
              name="carStatus"
              value="complete"
              checked={selectedStatus === "complete"}
              onChange={handleStatusChange}
            />
            {<FaCircleCheck className={styles.iconRadio} />}
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
