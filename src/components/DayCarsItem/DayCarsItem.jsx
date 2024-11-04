import styles from "./DayCarsItem.module.css";
import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import clsx from "clsx";
import {
  BsPersonFill,
  BsTelephoneOutboundFill,
  BsStopwatch,
  BsFiles
} from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { SlSpeedometer } from "react-icons/sl";
import flag from "../../assets/images/flagUa.webp";
import { renderTime } from "../../utils/renderTime.js";
import renderStatus from "../../utils/renderStatus.jsx";
import { getBackgroundStyle } from "../../utils/getBackgroundStyle";
import CarDetailButton from "../sharedComponents/CarDetailButton/CarDetailButton.jsx";
import StatusBtn from "../sharedComponents/StatusBtn/StatusBtn.jsx";
import { copyToClipboard } from "../../utils/copy.js";

export default function DayCarsItem({
  car,
  isModal,
}) {

  const {
    auto,
    photo_url: photoUrl,
    vin,
    mileage,
    status,
    complete_d,
    date_s,
    client,
    plate: carNumber,
  } = car;

  const carPhoto = photoUrl || absentAutoImg;

  return (
    <div
      className={clsx(
        styles.dayCarsItemContainer,
        isModal && styles.modalDayCarsItemContainer
      )}
      style={getBackgroundStyle(status)}
    >
      <div className={styles.userInfo}>
        <div>{renderStatus(status, complete_d, styles)}</div>
        <div className={styles.infoCard}>
          <div className={styles.infoName}>
            <BsPersonFill className={styles.iconHuman} color="#617651" />
            <span className={styles.textName}>
              {client ? client.name : "Гість"}
            </span>
          </div>
          <div className={styles.infoTel}>
            <BsTelephoneOutboundFill
              className={styles.iconTel}
              color="#006D95"
            />
            <span className={styles.textTel}>
              {client ? client.phone : "ххх-ххххххх"}
            </span>
          </div>
          <div className={styles.infoCar}>
            <IoCarSportSharp size={13} color="#A97878" />
            <span className={styles.nameCar}>{auto}</span>
          </div>
        </div>
        <div className={styles.vinContainer}>
              <p className={styles.vinCode}>
                <span className={styles.vinNumber}>
                  {vin || "VIN не визначено"}
                </span>
              </p>
              <BsFiles
                className={styles.copyIcon}
                size={13}
                onClick={() => copyToClipboard(vin || "VIN не визначено")}
              />
            </div>

        <div className={styles.btnContainer}>
          <StatusBtn car={car}/>
          <CarDetailButton />

        </div>
      </div>
      <div
        className={clsx(styles.carsInfo, isModal && styles.modalCarsInfo)}
      >
        <div className={styles.carInfoLeft}>
          <div className={styles.rating}>
            <AiFillStar color="var(--star-orange)" size={13}/>
            <AiFillStar color="var(--star-orange)" size={13}/>
            <AiFillStar color="var(--star-orange)" size={13}/>
            <AiFillStar color="var(--star-orange)" size={13}/>
            <AiFillStar color="var(--star-white)" size={13}/>
          </div>
          <div className={styles.prevCoast}>
            <p className={styles.money}>₴ 2,200.00</p>
          </div>
        </div>
        <div className={styles.carInfoRight}>
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
            <SlSpeedometer size={13} color="var(--mint)" />
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
    </div>
  );
}
