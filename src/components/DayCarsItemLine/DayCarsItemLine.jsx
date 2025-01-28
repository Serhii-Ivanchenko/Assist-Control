import styles from "./DayCarsItemLine.module.css";
import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import { BsStopwatch } from "react-icons/bs";
import { SlSpeedometer } from "react-icons/sl";
import { IoCarSportSharp } from "react-icons/io5";
import renderStatusCars from "../../utils/renderStatusCars";
import { renderTime } from "../../utils/renderTime.jsx";
import clsx from "clsx";
import { useSelector } from "react-redux";
import StatusBtn from "../sharedComponents/StatusBtn/StatusBtn";
import CarDetailButton from "../sharedComponents/CarDetailButton/CarDetailButton";
import RatingStars from "../sharedComponents/RatingStars/RatingStars";
import { selectVisibilityCar } from "../../redux/visibility/selectors.js";
import { useState } from "react";

export default function DayCarsItemLine({ car }) {
  const visibility = useSelector(selectVisibilityCar);
  const [isMonitoring, setisMonitoring] = useState("main");

  const {
    car_id,
    photo_url: photoUrl,
    complete_d,
    status,
    plate,
    mileage,
    auto,
    vin,
    date_s,
    client,
  } = car;

  const formatCarNumber = (number) => {
    if (!number) return "";
    return number.replace(/\s+/g, "");
  };

  const carPhoto = photoUrl || absentAutoImg;

  return (
    <div className={styles.carLineContainer}>
      <div className={styles.leftContainer}>
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
              alt="Car"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = absentAutoImg;
              }}
            />
          </div>
        )}

        {visibility?.name && (
          <div
            className={clsx(styles.infoName, !visibility.name && styles.hidden)}
          >
            <span className={styles.textName}>
              {client ? client.name : "Гість"}
            </span>
          </div>
        )}
      </div>
      {visibility?.rating && (
        <div className={clsx(!visibility.rating && styles.hidden)}>
          <RatingStars rating={car.rating} />
        </div>
      )}

      {visibility?.status && (
        <div
          className={clsx(styles.status, !visibility.status && styles.hidden)}
        >
          {renderStatusCars(status, complete_d, styles)}
        </div>
      )}

      {visibility.carNum && (
        <p
          className={clsx(
            styles.carNumber,
            !visibility.carNum && styles.hidden
          )}
        >
          {plate ? formatCarNumber(plate) : "хххххх"}
        </p>
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

      {visibility?.vin && (
        <div className={clsx(styles.infoVin, !visibility.vin && styles.hidden)}>
          <span className={styles.vinNum}>{vin || "VIN не вказано"}</span>
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
          <p className={styles.mileage}>{mileage || "хххххх"}</p>
        </div>
      )}

      {visibility?.time && (
        <div
          className={clsx(styles.timeWork, !visibility.time && styles.hidden)}
        >
          <BsStopwatch size={13} color="#D5ACF3" />
          <p className={styles.time}>{renderTime(complete_d, date_s)}</p>
        </div>
      )}

      <div className={styles.rightContainer}>
        {visibility?.totalPrice && (
          <div
            className={clsx(
              styles.totalPay,
              !visibility.totalPrice && styles.hidden
            )}
          >
            <p className={styles.total}>₴ 6,613.83</p>
          </div>
        )}
        <div className={styles.btnContainer}>
          {visibility?.status && <StatusBtn car={car} />}
          {visibility?.info && (
            <CarDetailButton
              carId={car_id}
              car={car}
              // location={isMonitoring}
              carName={car.auto}
            />
          )}
        </div>
      </div>
    </div>
  );
}
