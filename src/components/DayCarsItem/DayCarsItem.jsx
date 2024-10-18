import styles from "./DayCarsItem.module.css";
import carImage from "../../assets/images/carsItem.png";
import clsx from "clsx";
import {
  BsWrench,
  BsPencil,
  BsPersonFill,
  BsTelephoneOutboundFill,
  BsLayerBackward,
  BsStopwatch,
} from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { HiOutlineHashtag } from "react-icons/hi";
import { useSelector } from "react-redux";
import { selectDayCars } from "../../redux/cars/selectors.js";
import { AiFillStar, AiOutlineCheckCircle } from "react-icons/ai";
import { SlSpeedometer } from "react-icons/sl";
import flag from "../../assets/images/flagUa.webp";
import { calculateTimeInService } from "../../utils/calculateTimeInService.js";

export default function DayCarsItem({
  carNumber,
  auto,
  photoUrl,
  vin,
  mileage,
  isModal,
  status,
  complete_d,
  date_s,
}) {
  const carsData = useSelector(selectDayCars);
  const car = carsData.find((car) => car.carNumber === carNumber);

  const renderStatus = (status, complete_d) => {
    let icon;
    let statusText;
    let statusClass = "";

    if (complete_d) {
      icon = <AiOutlineCheckCircle color="#4CAF50" size={24} />;
      statusText = "завершено";
      statusClass = styles.completed;
    } else {
      switch (status) {
        case "new":
          icon = <HiOutlineHashtag color="#246D4D" size={24} />;
          statusText = "нова";
          statusClass = styles.new;
          break;
        case "repair":
          icon = <BsWrench color="#246D4D" size={16} />;
          statusText = "ремонт";
          statusClass = styles.repair;
          break;
        case "check_repair":
          icon = <BsLayerBackward color="#246D4D" size={24} />;
          statusText = "діагностика";
          statusClass = styles.checkRepair;
          break;
        default:
          icon = null;
          statusText = "Невідомий статус";
      }
    }

    return (
      <div
        className={clsx(styles.title)}
        style={{
          borderColor: statusClass.includes("completed")
            ? "#246D4D"
            : statusClass.includes("new")
            ? "#EBD534"
            : statusClass.includes("repair")
            ? "#994CA5"
            : statusClass.includes("checkRepair")
            ? "#3956CC"
            : "#000",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {icon}
        <span className={clsx(styles.statusText, statusClass)}>
          {statusText}
        </span>
      </div>
    );
  };

  const defaultCarImage = carImage;
  const carPhoto = photoUrl || defaultCarImage;

  const renderTime = () => {
    if (complete_d) {
      const completeDate = new Date(complete_d);
      const startDate = new Date(date_s);
      const differenceInMilliseconds = completeDate - startDate;

      const hours = Math.floor(
        (differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor(
        (differenceInMilliseconds % (1000 * 60)) / 1000
      );

      return (
        <p className={styles.time}>
          {`${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
          )}:${String(seconds).padStart(2, "0")}`}
        </p>
      );
    } else {
      return (
        <p className={styles.time}>
          {calculateTimeInService(date_s, new Date().toISOString())}
        </p>
      );
    }
  };

  return (
    <div
      className={clsx(
        styles.dayCarsItemContainer,
        isModal && styles.modalDayCarsItemContainer
      )}
    >
      <div className={styles.userInfo}>
        {renderStatus(status, complete_d)}
        <div className={styles.infoCard}>
          <div className={styles.infoName}>
            <BsPersonFill size={13} color="#617651" />
            <span className={styles.textName}>Іван Петренко</span>
          </div>
          <div className={styles.infoTel}>
            <BsTelephoneOutboundFill size={13} color="#006D95" />
            <span className={styles.textTel}>0733291217</span>
          </div>
          <div className={styles.infoCar}>
            <IoCarSportSharp size={13} color="#A97878" />
            <span className={styles.nameCar}>{auto}</span>
          </div>
        </div>
        <div className={styles.infoVin}>
          <span className={styles.vinNum}>
            {vin ? vin : "VIN-XXXXXXXXXXXX"}
          </span>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.btnDetail}>
            <p className={styles.btnDetailText}>Деталі</p>
          </button>
          {/* <button className={styles.btnSave}>
            <BsLayerBackward size={16} />
          </button> */}
        </div>
      </div>
      <div className={styles.carsInfo}>
        <div className={styles.carInfoLeft}>
          <div className={styles.rating}>
            <AiFillStar color="#F5A623" />
            <AiFillStar color="#F5A623" />
            <AiFillStar color="#F5A623" />
            <AiFillStar color="#F5A623" />
            <AiFillStar color="#FFF" />
          </div>
          <button className={styles.carBtnNumber}>
            <BsPencil size={13} color="#C7C7C7" />
          </button>
          <div className={styles.prevCoast}>
            <p className={styles.money}>₴ 2,200.00</p>
          </div>
        </div>
        <div className={styles.carInfoRight}>
          <div className={styles.carPhoto}>
            <img src={carPhoto} alt="Фото автомобіля" />
          </div>
          <div className={styles.carRegContainer}>
            <div className={styles.carRegCountrys}>
              <img
                className={styles.carRegFlag}
                src={flag}
                alt="Car registration country flag"
              />
              <p className={styles.carRegCountry}>ua</p>
            </div>
            <p className={styles.carNumber}>
              {carNumber ? carNumber : "хххххх"}
            </p>
          </div>
          <div className={styles.mileInfo}>
            <SlSpeedometer size={13} color="#A1FFC5" />
            <p className={styles.mileage}>{mileage ? mileage : "хххххх"}</p>
          </div>
          <div className={styles.timeWork}>
            <BsStopwatch size={13} color="#D5ACF3" />
            <p className={styles.time}>{renderTime()}</p>
          </div>
          <div className={styles.totalPay}>
            <p className={styles.total}>₴ 6,613.83 </p>
          </div>
        </div>
      </div>
      {car && renderStatus(car.status, car.complete_d)}
    </div>
  );
}
