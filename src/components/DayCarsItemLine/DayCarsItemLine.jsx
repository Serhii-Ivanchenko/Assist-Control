import styles from "./DayCarsItemLine.module.css";
import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import { BsStopwatch } from "react-icons/bs";
import { SlSpeedometer } from "react-icons/sl";
import { IoCarSportSharp } from "react-icons/io5";
import renderStatus from "../../utils/renderStatus";
import { renderTime } from "../../utils/renderTime";

export default function DayCarsItemLine({ car }) {
  const {
    photoUrl,
    complete_d,
    status,
    plate,
    mileage,
    auto,
    vin,
    date_s,
    client,
  } = car; // Деструктуризація пропсів car

  console.log('car', car);
  
  const carPhoto = photoUrl || absentAutoImg;

  return (
    <div className={styles.carLineContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.carPhoto}>
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
        <div className={styles.infoName}>
          <span className={styles.textName}>{client ? client.name : "Гість"}</span>
        </div>
      </div>

      <div className={styles.status}>
        {renderStatus(status, complete_d, styles)}
      </div>
      <p className={styles.plate}>{plate || "хххххх"}</p>
      <div className={styles.infoCar}>
        <IoCarSportSharp size={13} color="#A97878" />
        <span className={styles.nameCar}>{auto}</span>
      </div>
      <div className={styles.infoVin}>
        <span className={styles.vinNum}>{vin || "VIN не вказано"}</span>
      </div>
      <div className={styles.mileInfo}>
        <SlSpeedometer size={13} color="var(--mint)" />
        <p className={styles.mileage}>{mileage || "хххххх"}</p>
      </div>
      <div className={styles.timeWork}>
        <BsStopwatch size={13} color="#D5ACF3" />
        <p className={styles.time}>{renderTime(complete_d, date_s)}</p>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.totalPay}>
          <p className={styles.total}>₴ 6,613.83</p>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.btnDetail}>
            <p className={styles.btnDetailText}>Деталі</p>
          </button>
        </div>
      </div>
    </div>
  );
}
