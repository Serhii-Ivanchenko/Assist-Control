import styles from "./DayCarsItemCrm.module.css";
import Modal from "../Modals/Modal/Modal.jsx";
import ServiceBookingModal from "../Modals/ServiceBookingModal/ServiceBookingModal.jsx";
import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import { useState } from "react";
import {
  BsPersonFill,
  BsTelephoneOutboundFill,
  BsStopwatch,
  BsLayerBackward,
  BsPlusLg,
  BsFiles,
} from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { SlSpeedometer } from "react-icons/sl";
import flag from "../../assets/images/flagUa.webp";
import { renderTimeinWork } from "../../utils/renderTime.jsx";
import renderStatusCars from "../../utils/renderStatusCars.jsx";
import { getBackgroundStyle } from "../../utils/getBackgroundStyle";
import CarDetailButton from "../sharedComponents/CarDetailButton/CarDetailButton.jsx";
import PaymentBtn from "../sharedComponents/PaymentBtn/PaymentBtn.jsx";
import { copyToClipboard } from "../../utils/copy.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import RatingStars from "../sharedComponents/RatingStars/RatingStars.jsx";
import { selectVisibilityRecords } from "../../redux/visibility/selectors.js";
import ArchiveModal from "../Modals/ArchiveModal/ArchiveModal.jsx";
import { GiAlarmClock } from "react-icons/gi";
import NotificationModal from "../sharedComponents/NotificationModal/NotificationModal.jsx";

export default function DayCarsItemCrm({ car, onDragStart, onArchiveSuccess }) {
  // const [isCrm, setIsCrm] = useState("record");
  const visibility = useSelector(selectVisibilityRecords);
  const [modalState, setModalState] = useState({
    serviceBooking: false,
    archive: false,
    notifications: false
  });
  const [isDragging, setIsDragging] = useState(false);
  const [draggingElement, setDraggingElement] = useState(null);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);

  

  const handleDragStart = (e) => {
    setIsDragging(true);
    onDragStart(e, car.car_id);

    // Зберігаємо початкове зміщення між курсором і позицією елемента
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Зберігаємо значення зміщення в стані
    setInitialX(offsetX);
    setInitialY(offsetY);

    // Створюємо дубліката елемента для перетягування
    const dragElement = e.target.cloneNode(true);
    dragElement.style.position = "absolute";
    dragElement.style.pointerEvents = "none";
    dragElement.classList.add(styles.cloneDragging);

    document.body.appendChild(dragElement);
    setDraggingElement(dragElement);

    // Відміняємо стандартний образ перетягування
    const img = new Image();
    img.src = "";
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrag = (e) => {
    if (draggingElement) {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const rotationAngle = currentX > initialX ? 10 : -10;

      // Обновляємо позицію дубліката, додаючи зміщення
      draggingElement.style.top = `${currentY - initialY}px`;
      draggingElement.style.left = `${currentX - initialX}px`;
      draggingElement.style.transform = `rotate(${rotationAngle}deg)`;
    }
  };
  const handleDragEnd = (e) => {
    setIsDragging(false);

    // Відновлюємо початковий стан оригінального елемента
    e.target.style.transform = "";

    // Видаляємо дублікат
    if (draggingElement) {
      document.body.removeChild(draggingElement);
      setDraggingElement(null);
    }
  };

  const openServiceBookingModal = () => {
    setModalState({ serviceBooking: true, archive: false });
  };

  const openArchiveModal = () => {
    setModalState({ serviceBooking: false, archive: true });
  };

  const openNotificationModal = () => {
    setModalState({
      ...modalState,
      notifications: true,
    });
  };

  const closeModals = () => {
    setModalState({ serviceBooking: false, archive: false, notifications: false });
  };

  const {
    car_id,
    auto,
    photo_url: photoUrl,
    vin,
    mileage,
    status,
    complete_d,
    name,
    phone,
    appointment_date,
    time_slot,
    plate: carNumber,
  } = car;

  console.log('car-car-car-car', car);
  

  const carPhoto = photoUrl || absentAutoImg;

  const formatCarNumber = (number) => {
    return number.replace(/\s+/g, "");
  };

  const renderAppointmentDate = () => {
    if (appointment_date && time_slot) {
      const formattedDate = new Date(appointment_date).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
      });
      return (
        <div>
          <p className={styles.time}>
            {formattedDate} / {time_slot}
          </p>
        </div>
      );
    }
  
    if (!appointment_date) {
      const timeInWork = renderTimeinWork(car.date_s);
      return (
        <div>
          <p className={styles.time}>{timeInWork}</p>
        </div>
      );
    }
  
    return null;
  };
  

  return (
    <div
      className={`${styles.crmBlockDayCarsItemContainer} ${
        isDragging ? styles.dragging : ""
      } ${status === 'complete' && styles.cursorComplete}`}
      style={getBackgroundStyle(status)}
      id={car.car_id}
      draggable={status !== "complete"}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
    >
      <div className={styles.userInfo}>
        <div>{renderStatusCars(status, complete_d, styles)}</div>
        <div className={styles.infoCard}>
          {visibility?.name && (
            <div
              className={clsx(styles.infoName, {
                [styles.hidden]: !visibility?.name,
              })}
            >
              <BsPersonFill className={styles.iconHuman} color="#617651" />
              <span className={styles.textName}>{name ? name : "Гість"}</span>
            </div>
          )}
          {visibility?.phoneNumber && (
            <div
              className={clsx(styles.infoTel, {
                [styles.hidden]: !visibility?.phoneNumber,
              })}
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
              className={clsx(styles.infoCar, {
                [styles.hidden]: !visibility?.carModelYear,
              })}
            >
              <IoCarSportSharp size={13} color="#A97878" />
              <span className={styles.nameCar}>
                {auto ? auto : "Невідома модель"}
              </span>
            </div>
          )}
        </div>
        {visibility?.vin && (
          <div
            className={clsx(styles.vinContainer, {
              [styles.hidden]: !visibility?.vin,
            })}
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
          <CarDetailButton
            carId={car_id}
            // location={isCrm}
            carName={car.auto}
            car={car}
          />
          {(status === "repair" ||
            status === "diagnostic" ||
            status === "complete") && <PaymentBtn />}

          {status === "new" && (
            <button className={styles.plus} onClick={openServiceBookingModal}>
              <BsPlusLg className={styles.iconPlus} />
            </button>
          )}

          {status === "new" || status === "complete" ? (
            <button className={styles.btnSave} onClick={openArchiveModal}>
              <BsLayerBackward size={16} />
            </button>
          ) : null}
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

          {modalState.serviceBooking && (
            <Modal isOpen={modalState.serviceBooking} onClose={closeModals}>
              <ServiceBookingModal onClose={closeModals} />
            </Modal>
          )}

          {modalState.archive && (
            <Modal isOpen={modalState.archive} onClose={closeModals}>
              <ArchiveModal
                onClose={closeModals}
                carId={car_id}
                location="records"
                onSuccess={onArchiveSuccess}
              />
            </Modal>
          )}
        </div>
      </div>
      <div className={styles.crmcarsInfo}>
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
                draggable="false"
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
          {visibility?.time && (
            <div
              className={clsx(
                styles.timeWork,
                !visibility.time && styles.hidden
              )}
            >
              <BsStopwatch size={13} color="#D5ACF3" />
              <p className={styles.time}>{renderAppointmentDate()}</p>
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
