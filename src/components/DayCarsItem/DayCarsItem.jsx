import styles from "./DayCarsItem.module.css";
import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import clsx from "clsx";
import {
  BsPersonFill,
  BsTelephoneOutboundFill,
  BsStopwatch,
  BsFiles,
} from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { SlSpeedometer } from "react-icons/sl";
import flag from "../../assets/images/flagUa.webp";
import { renderTime } from "../../utils/renderTime.jsx";
import renderStatusCars from "../../utils/renderStatusCars.jsx";
import { getBackgroundStyle } from "../../utils/getBackgroundStyle";
import CarDetailButton from "../sharedComponents/CarDetailButton/CarDetailButton.jsx";
import StatusBtn from "../sharedComponents/StatusBtn/StatusBtn.jsx";
import { copyToClipboard } from "../../utils/copy.js";
import { useSelector } from "react-redux";
import RatingStars from "../sharedComponents/RatingStars/RatingStars.jsx";
import { selectVisibilityCar } from "../../redux/visibility/selectors.js";
import { useState } from "react";
import { GiAlarmClock } from "react-icons/gi";
import Modal from "../Modals/Modal/Modal.jsx";
import NotificationModal from "../sharedComponents/NotificationModal/NotificationModal.jsx";

export default function DayCarsItem({ car, isModal }) {
  const visibility = useSelector(selectVisibilityCar);
  const [isMonitoring, setisMonitoring] = useState("main");
  const [modalState, setModalState] = useState({ notifications: false });

  const {
    car_id,
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

  const formatCarNumber = (number) => {
    if (!number) return "";
    return number.replace(/\s+/g, "");
  };

  const openNotificationModal = () => {
    setModalState((prev) => ({ ...prev, notifications: true }));
  };

  const closeModals = () => {
    setModalState((prev) => ({ ...prev, notifications: false }));
  };

  return (
    <div
      className={clsx(
        styles.dayCarsItemContainer,
        isModal && styles.modalDayCarsItemContainer
      )}
      style={getBackgroundStyle(status)}
    >
      <div className={styles.userInfo}>
        <div>{renderStatusCars(status, complete_d, styles)}</div>
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
                {client ? client.name : "Гість"}
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
                {client ? client.phone : "ххх-ххххххх"}
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
              <span className={styles.vinNumber}>
                {vin || "VIN не вказано"}
              </span>
            </p>
            <button
              className={styles.copyButton}
              onClick={() => copyToClipboard(vin ? vin : "VIN не вказано")}
            >
              <BsFiles size={13} />
            </button>
          </div>
        )}

        <div className={styles.btnContainer}>
          <StatusBtn car={car} />
          <CarDetailButton
            carId={car_id}
            // location={isMonitoring}
            carName={car.auto}
            car={car}
          />
          {status === "complete" && (
            <button
              className={styles.clockContainer}
              onClick={openNotificationModal}
            >
              <GiAlarmClock className={styles.iconClock} size={20} />
            </button>
          )}
          <Modal isOpen={modalState.notifications} onClose={closeModals}>
            <NotificationModal
              onClose={closeModals}
              time="clientTime"
              date="clientDate"
              comment="clientComment"
              connectionType="clientConnection"
              accountingModal={true}
              service="clientService"
              setNotificationSent={setModalState}
            />
          </Modal>
        </div>
      </div>

      <div className={clsx(styles.carsInfo, isModal && styles.modalCarsInfo)}>
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
              <p className={styles.time}>{renderTime(complete_d, date_s)}</p>
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
