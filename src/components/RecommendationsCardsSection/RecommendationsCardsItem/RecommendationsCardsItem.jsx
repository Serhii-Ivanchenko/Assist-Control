import styles from "./RecommendationsCardsItem.module.css";
import absentAutoImg from "../../../assets/images/absentAutoImg.webp";
import clsx from "clsx";
import {
  BsPersonFill,
  BsTelephoneOutboundFill,
  BsStopwatch,
} from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { SlSpeedometer } from "react-icons/sl";
import flag from "../../../assets/images/flagUa.webp";
import renderStatusCars from "../../../utils/renderStatusCars.jsx";
import { getBackgroundStyle } from "../../../utils/getBackgroundStyle.js";
import CarDetailButton from "../../sharedComponents/CarDetailButton/CarDetailButton.jsx";
import StatusBtn from "../../sharedComponents/StatusBtn/StatusBtn.jsx";
import { useSelector } from "react-redux";
import RatingStars from "../../sharedComponents/RatingStars/RatingStars.jsx";
import { selectVisibilityCar } from "../../../redux/visibility/selectors.js";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

export default function RecommendationsCardsItem({ car}) {
  const visibility = useSelector(selectVisibilityCar);
  const [isMonitoring, setisMonitoring] = useState("main");

  const {
    id,
    status,
    plate: carNumber,
    name,
    car_id,
    date,
    phone,
    auto,
    photo_url: photoUrl,
    client_rating,
    mileage,
  } = car;
  
  const carPhoto = photoUrl || absentAutoImg;

  const formatCarNumber = (number) => {
    if (!number) return "";
    return number.replace(/\s+/g, "");
  };
  return (
    <div
      className={styles.dayCarsItemContainer}
      style={getBackgroundStyle(status)}
    >
      <div className={styles.userInfo}>
        <div>{renderStatusCars(status, styles)}</div>
        <div className={styles.infoCard}>
          {visibility?.name && (
            <div
              className={clsx(
                styles.infoName,
                !visibility.name && styles.hidden
              )}
            >
              <BsPersonFill className={styles.iconHuman} color="#617651" />
              <span className={styles.textName}>
                {name ? name : "Гість"}
              </span>
            </div>
          )}

          {visibility?.phoneNumber && (
            <div
              className={clsx(
                styles.infoTel,
                !visibility.phoneNumber && styles.hidden
              )}
            >
              <BsTelephoneOutboundFill
                className={styles.iconTel}
                color="#006D95"
              />
              <span className={styles.textTel}>
                {phone ? phone : "ххх-ххххххх"}
              </span>
            </div>
          )}

          {visibility?.carModelYear && (
            <div
              className={clsx(
                styles.infoCar,
                !visibility.carModelYear && styles.hidden
              )}
            >
              <IoCarSportSharp size={13} color="#A97878" />
              <span className={styles.nameCar}>{auto}</span>
            </div>
          )}
        </div>

        {visibility?.vin && (
          <div
            className={clsx(
              styles.vinContainer,
              !visibility.vin && styles.hidden
            )}
          >
            <p className={styles.vinCode}>
            До ТО залишилось...
            </p>
            <button className={styles.copyButton}>
            <FaEye size={16} />
            </button>
          </div>
        )}

        <div className={styles.btnContainer}>
          {visibility?.status && <StatusBtn car={car} />}
          {visibility?.info && (
            <CarDetailButton
              carId={id}
              location={isMonitoring}
              carName={car.auto}
            />
          )}
        </div>
      </div>

      <div className={styles.carsInfo}>
        <div className={styles.carInfoLeft}>
          {visibility?.rating && (
            <div className={clsx(!visibility.rating && styles.hidden)}>
              <RatingStars rating={car.rating} />
            </div>
          )}

          {visibility?.prePayment && (
            <div
              className={clsx(
                styles.prevCoast,
                !visibility.prePayment && styles.hidden
              )}
            >
              <p className={styles.money}>₴ 2,200.00</p>
            </div>
          )}
        </div>

        <div className={styles.carInfoRight}>
          {visibility?.photo && (
            <div
              className={clsx(
                styles.carPhoto,
                !visibility.photo && styles.hidden
              )}
            >
              <img
                className={styles.carImg}
                src={carPhoto}
                alt="Car image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = absentAutoImg;
                }}
              />
            </div>
          )}

          {visibility?.carNum && (
            <div
              className={clsx(
                styles.carRegContainer,
                !visibility.carNum && styles.hidden
              )}
            >
              <div className={styles.carRegCountrys}>
                <img
                  className={styles.carRegFlag}
                  src={flag}
                  alt="Car registration country flag"
                />
                <p className={styles.carRegCountry}>ua</p>
              </div>
              <p className={styles.carNumber}>
                {carNumber ? formatCarNumber(carNumber) : "хххххх"}
              </p>
            </div>
          )}

          {visibility?.mileage && (
            <div
              className={clsx(
                styles.mileInfo,
                !visibility.mileage && styles.hidden
              )}
            >
              <SlSpeedometer size={13} color="var(--mint)" />
              <p className={styles.mileage}>{mileage ? mileage : "хххххх"}</p>
            </div>
          )}

          {visibility.time && (
            <div
              className={clsx(
                styles.timeWork,
                !visibility.time && styles.hidden
              )}
            >
              <BsStopwatch size={13} color="#D5ACF3" />
            </div>
          )}

          {visibility?.totalPrice && (
            <div
              className={clsx(
                styles.totalPay,
                !visibility.totalPrice && styles.hidden
              )}
            >
              <p className={styles.total}>₴ 6,613.83 </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
