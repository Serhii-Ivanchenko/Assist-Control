import styles from "./DayCarsItemLine.module.css";
import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import {  BsStopwatch } from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import renderStatus from "../../utils/renderStatus.jsx";
import { renderTime } from "../../utils/renderTime.js";

export default function DayCarsItemLine({
  photoUrl,
  complete_d,
  status,
  carNumber,
  auto,
  vin,
  date_s,
  
}) {
  const carPhoto = photoUrl || absentAutoImg;

  return (
    <div className={styles.carLineContainer}>
      <div className={styles.carPhoto}>
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
      <div className={styles.infoName}>
        <span className={styles.textName}>Іван Петренко</span>
      </div>
      <div className={styles.status}>{renderStatus(status, complete_d, styles)}</div>
      <p className={styles.carNumber}>{carNumber ? carNumber : "хххххх"}</p>
      <div className={styles.infoCar}>
        <IoCarSportSharp size={13} color="#A97878" />
        <span className={styles.nameCar}>{auto}</span>
      </div>
      <div className={styles.infoVin}>
        <span className={styles.vinNum}>{vin ? vin : "VIN-XXXXXXXXXXX"}</span>
      </div>
      <div className={styles.timeWork}>
        <BsStopwatch size={13} color="#D5ACF3" />
        <p className={styles.time}>{renderTime(complete_d, date_s)}</p>
      </div>
      <div className={styles.totalPay}>
        <p className={styles.total}>₴ 6,613.83 </p>
      </div>
      <div className={styles.daySContainer}>
        <p className={styles.dayS}>{date_s} </p>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btnDetail}>
          <p className={styles.btnDetailText}>Деталі</p>
        </button>
      </div>
    </div>
  );
}
