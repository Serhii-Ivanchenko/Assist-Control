import styles from "./DayCarsItem.module.css";
import carImage from "../../assets/images/carsItem.png";
import clsx from "clsx";
import {
  BsPersonFill,
  BsTelephoneOutboundFill,
  BsStopwatch,
} from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectDayCars } from "../../redux/cars/selectors.js";
import { AiFillStar } from "react-icons/ai";
import { SlSpeedometer } from "react-icons/sl";
import flag from "../../assets/images/flagUa.webp";
import { renderTime } from "../../utils/renderTime.js";
import renderStatus from "../../utils/renderStatus.jsx";

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
  const defaultCarImage = carImage;
  const carPhoto = photoUrl || defaultCarImage;

  return (
    <div
      className={clsx(
        styles.dayCarsItemContainer,
        isModal && styles.modalDayCarsItemContainer
      )}
    >
      <div className={styles.userInfo}>
        <div>{renderStatus(status, complete_d, styles)}</div>
        <div className={styles.infoCard}>
          <div className={styles.infoName}>
            <BsPersonFill className={styles.iconHuman} color="#617651" />
            <span className={styles.textName}>Іван Петренко</span>
          </div>
          <div className={styles.infoTel}>
            <BsTelephoneOutboundFill
              className={styles.iconTel}
              color="#006D95"
            />
            <span className={styles.textTel}>0733291217</span>
          </div>
          <div className={styles.infoCar}>
            <IoCarSportSharp size={13} color="#A97878" />
            <span className={styles.nameCar}>{auto}</span>
          </div>
        </div>
        <div className={styles.infoVin}>
          <span className={styles.vinNum}>{vin ? vin : "VIN-XXXXXXXXXXX"}</span>
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
            <p className={styles.time}>{renderTime(complete_d, date_s)}</p>
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
