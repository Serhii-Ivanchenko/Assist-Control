import styles from "./RecommendationsCardsItem.module.css";
import absentAutoImg from "../../../assets/images/absentAutoImg.webp";
import clsx from "clsx";
import {
  BsPersonFill,
  BsTelephoneOutboundFill,
  BsPlusLg,
  BsTrash,
} from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { SlSpeedometer } from "react-icons/sl";
import flag from "../../../assets/images/flagUa.webp";
import { getBackgroundStyle } from "../../../utils/getBackgroundStyle.js";
import CarDetailButton from "../../sharedComponents/CarDetailButton/CarDetailButton.jsx";
import { useSelector } from "react-redux";
import RatingStars from "../../sharedComponents/RatingStars/RatingStars.jsx";
import { selectVisibilityRecomendations } from "../../../redux/visibility/selectors.js";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import renderStatusRecomendations from "../../../utils/renderStatusRecomendations.jsx";
import { GiAlarmClock } from "react-icons/gi";
import Modal from "../../Modals/Modal/Modal.jsx";
import ServiceBookingModal from "../../Modals/ServiceBookingModal/ServiceBookingModal.jsx";
import ArchiveModal from "../../Modals/ArchiveModal/ArchiveModal.jsx";
import NotificationModal from "../../sharedComponents/NotificationModal/NotificationModal.jsx";

export default function RecommendationsCardsItem({ car, isRecommendation }) {
  const visibility = useSelector(selectVisibilityRecomendations);
  const [isMonitoring, setisMonitoring] = useState("main");
  const [modalState, setModalState] = useState({
    serviceBooking: false,
    archive: false,
    notifications: false,
  });

  const {
    id,
    status,
    plate: carNumber,
    name,
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

  const openServiceBookingModal = () => {
    setModalState({ serviceBooking: true });
  };

  const openArchiveModal = () => {
    setModalState({ ...modalState, archive: true });
  };

  const openNotificationModal = () => {
    setModalState({ ...modalState, notifications: true });
  };

  const closeModals = () => {
    setModalState({
      serviceBooking: false,
      archive: false,
      notifications: false,
    });
  };

  return (
    <div
      className={styles.dayCarsItemContainer}
      style={getBackgroundStyle(status)}
    >
      <div className={styles.userInfo}>
        <div>{renderStatusRecomendations(status, styles)}</div>
        <div className={styles.infoCard}>
          {visibility?.name && (
            <div
              className={clsx(
                styles.infoName,
                !visibility.name && styles.hidden
              )}
            >
              <BsPersonFill className={styles.iconHuman} color="#617651" />
              <span className={styles.textName}>{name ? name : "Гість"}</span>
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
        {visibility?.timeForTO && (
          <div
            className={clsx(
              styles.vinContainer,
              !visibility.timeForTO && styles.hidden
            )}
          >
            <p className={styles.vinCode}>До ТО залишилось...</p>
            <button className={styles.copyButton}>
              <FaEye size={16} />
            </button>
          </div>
        )}

        <div className={styles.btnContainer}>
          <CarDetailButton
            carId={id}
            car={car}
            // location={isMonitoring}
            carName={car.auto}
          />

          <button className={styles.plus} onClick={openServiceBookingModal}>
            <BsPlusLg className={styles.iconPlus} />
          </button>

          {modalState.serviceBooking && (
            <Modal isOpen={modalState.serviceBooking} onClose={closeModals}>
              <ServiceBookingModal onClose={closeModals} />
            </Modal>
          )}

          <button
            className={styles.clockContainer}
            onClick={openNotificationModal}
          >
            <GiAlarmClock className={styles.iconClock} size={20} />
          </button>

          {modalState.notifications && (
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
          )}

          <button className={styles.clockContainer} onClick={openArchiveModal}>
            <BsTrash className={styles.iconTrash} size={18} />
          </button>

          {modalState.archive && (
            <Modal isOpen={modalState.archive} onClose={closeModals}>
              <ArchiveModal
                onClose={closeModals}
                isRecommendation={isRecommendation}
              />
            </Modal>
          )}
        </div>
      </div>
      <div className={styles.carsInfo}>
        <div className={styles.carInfoLeft}>
          {visibility?.rating && (
            <div className={clsx(!visibility.rating && styles.hidden)}>
              <RatingStars rating={client_rating} />
            </div>
          )}

          {visibility?.KP && (
            <div className={clsx(styles.KP, !visibility.KP && styles.hidden)}>
              <p className={styles.money}>КП</p>
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
