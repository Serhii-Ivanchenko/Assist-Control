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
import { FaCircleCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { selectDayCars } from "../../redux/cars/selectors.js";
import { AiFillStar, AiOutlineCheckCircle } from "react-icons/ai";
import { SlSpeedometer } from "react-icons/sl";
import flag from "../../assets/images/flagUa.webp";
import calculateTimeInService from '../../utils/calculateTimeInService.js';

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
    let textColor;
    let fontSize;
    let borderColor;

    if (complete_d) {
      icon = <AiOutlineCheckCircle color="#4CAF50" size={16} />;
      statusText = "завершено";
      textColor = { color: "#246D4D" };
      fontSize = "16px";
      borderColor = "#4CAF50";
    } else {
      switch (status) {
        case "new":
          icon = <HiOutlineHashtag color="#246D4D" size={16}/>;
          statusText = "нова";
          textColor = { color: "#EBD534" };
          fontSize = "20px";
          borderColor = "#EBD534";
          break;
        case "repair":
          icon = <BsWrench color="#246D4D" />;
          statusText = "ремонт";
          textColor = { color: "#994CA5" };
          fontSize = "20px";
          borderColor = "#246D4D";
          break;
        case "check_repair":
          icon = <BsLayerBackward color="#246D4D"size={16} />;
          statusText = "діагностика";
          textColor = { color: "#3956CC)" };
          fontSize = "16px";
          borderColor = "#3956CC";
          break;
        case "complete":
          icon = <FaCircleCheck color="#246D4D" size={16} />;
          statusText = "Завершено";
          fontSize = "16px";
          borderColor = "#4CAF50";
          break;
        default:
          icon = null;
          statusText = "Невідомий статус";
      }
    }
    return (
      <div className={styles.title} style={{ borderColor: borderColor, fontSize: fontSize, borderWidth: "1px", borderStyle: "solid" }}>
        {icon}
        <span className={styles.statusText} style={textColor}>
          {statusText}
        </span>
      </div>
    );
  };

  const defaultCarImage = carImage;
  const carPhoto = photoUrl || defaultCarImage;

  const renderTime = () => {
    if (complete_d) {
      // Якщо complete_d = true, обчислюємо різницю між complete_d та date_s
      const completeDate = new Date(complete_d);
      const startDate = new Date(date_s);
      const differenceInMilliseconds = completeDate - startDate;

      // Форматування часу у HH:MM:SS
      const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

      return (
        <p className={styles.time}>
          {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
        </p>
      );
    } else {
      // Якщо complete_d = false, розраховуємо час за допомогою утиліти calculateTimeInService
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
        <div className={styles.title}>{renderStatus(status, complete_d)}</div>
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
          <span className={styles.vinNum}>{vin ? vin : "хххххх"}</span>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.btnDetail}>
            <p className={styles.btnDetailText}>Деталі</p>
          </button>
          <button className={styles.btnSave}>
            <BsLayerBackward size={16} />
          </button>
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
