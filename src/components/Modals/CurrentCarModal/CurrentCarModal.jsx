import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";

import { calculateTimeInService } from "../../../utils/calculateTimeInService";
import { getStatusDetails } from "../../../utils/getStatusDetails";
import { changeCarStatus } from "../../../redux/cars/operations";
import { getCurrentCars, getCarsByDate } from "../../../redux/cars/operations";
import { selectDate } from "../../../redux/cars/selectors.js";

import absentAutoImg from "../../../assets/images/absentAutoImg.webp";
import flag from "../../../assets/images/flagUa.webp";
import CustomRadioBtn from "../../CustomRadioBtn/CustomRadioBtn";

import { BsWrench } from "react-icons/bs";
import { BsExclamationCircle } from "react-icons/bs";
import { MdOutlineTimer } from "react-icons/md";
import { BsUiChecksGrid } from "react-icons/bs";
import { BsEyeFill, BsCheckCircleFill } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { BsFiles } from "react-icons/bs";
import { BsLayerBackward } from "react-icons/bs";

import styles from "./CurrentCarModal.module.css";

function CurrentCarModal({ onClose, car, status }) {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(status);
  const currentDate = useSelector(selectDate);

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return (
          <BsExclamationCircle
            stroke="var(--light-gray)"
            fill="var(--light-gray)"
            width="10px"
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

  const icon = getStatusIcon(selectedStatus);
  const { label, className } = getStatusDetails(styles, selectedStatus);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Текст скопійовано");
      })
      .catch((err) => {
        toast.error("Не вдалося скопіювати текст:", err);
      });
  };

  const handleSubmit = () => {
    dispatch(changeCarStatus({ carId: car.id, status: selectedStatus }))
      .then(() => {
        dispatch(getCurrentCars());
        dispatch(getCarsByDate(currentDate));
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
            <div className={styles.statusContainer}>
              <p className={clsx(styles.carStatus, className)}>
                {icon} {label}
              </p>
            </div>
            <div className={styles.vinContainer}>
              <p className={styles.vinCode}>
                <span className={styles.vinNumber}>
                  {car.vin || "VIN не визначено"}
                </span>
              </p>
              <BsFiles
                className={styles.copyIcon}
                onClick={() => copyToClipboard(car.vin || "VIN не визначено")}
              />
            </div>
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
        <div className={styles.serviceInfo}>
          <p className={styles.serviceTime}>
            {<MdOutlineTimer className={styles.icon} />}
            {calculateTimeInService(car.date_s)}
          </p>
        </div>
        <div className={styles.radioGroup}>
          <div className={styles.radioWrapper}>
            <label>
              <CustomRadioBtn isChecked={selectedStatus === "diagnostic"} />
              <div
                className={clsx(styles.inputWrapper, styles.checkRepairStatus)}
              >
                <input
                  type="radio"
                  name="carStatus"
                  value="diagnostic"
                  checked={selectedStatus === "diagnostic"}
                  onChange={handleStatusChange}
                  className={styles.radioInput}
                />
                {<BsUiChecksGrid className={styles.iconRadio} />}
                Діагностика
              </div>
            </label>
          </div>
          <div className={styles.radioWrapper}>
            <label>
              <CustomRadioBtn isChecked={selectedStatus === "repair"} />
              <div className={clsx(styles.inputWrapper, styles.repairStatus)}>
                <input
                  type="radio"
                  name="carStatus"
                  value="repair"
                  checked={selectedStatus === "repair"}
                  onChange={handleStatusChange}
                  className={styles.radioInput}
                />
                {<BsWrench className={styles.iconRadio} />} Ремонт
              </div>
            </label>
          </div>
          <div className={styles.radioWrapper}>
            <label>
              <CustomRadioBtn isChecked={selectedStatus === "complete"} />
              <div className={clsx(styles.inputWrapper, styles.completeStatus)}>
                <input
                  type="radio"
                  name="carStatus"
                  value="complete"
                  checked={selectedStatus === "complete"}
                  onChange={handleStatusChange}
                  className={styles.radioInput}
                />
                {<BsCheckCircleFill className={styles.iconRadio} />}
                Завершено
              </div>
            </label>
          </div>
          <div className={styles.radioWrapper}>
            <label>
              <CustomRadioBtn isChecked={selectedStatus === "view_repair"} />
              <div
                className={clsx(styles.inputWrapper, styles.viewRepairStatus)}
              >
                <input
                  type="radio"
                  name="carStatus"
                  value="view_repair"
                  checked={selectedStatus === "view_repair"}
                  onChange={handleStatusChange}
                  className={styles.radioInput}
                />
                {<BsEyeFill className={styles.iconRadio} />}
                Огляд ПР
              </div>
            </label>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.archiveBtn}>
            <BsLayerBackward className={styles.iconArchive} />В архів
          </button>
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
    </div>
  );
}

export default CurrentCarModal;
