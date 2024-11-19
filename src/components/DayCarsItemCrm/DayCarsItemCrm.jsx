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
import { AiFillStar } from "react-icons/ai";
import { SlSpeedometer } from "react-icons/sl";
import flag from "../../assets/images/flagUa.webp";
import { renderTime } from "../../utils/renderTime.js";
import renderStatus from "../../utils/renderStatus.jsx";
import { getBackgroundStyle } from "../../utils/getBackgroundStyle";
import CarDetailButton from "../sharedComponents/CarDetailButton/CarDetailButton.jsx";
import PaymentBtn from "../sharedComponents/PaymentBtn/PaymentBtn.jsx";
import { copyToClipboard } from "../../utils/copy.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { selectVisibilityRecords } from "../../redux/crm/selectors.js";

export default function DayCarsItemCrm({ car, onDragStart }) {
  const [serviceBookingModalIsOpen, setServiceBookingModalIsOpen] =
    useState(false);
  const visibility = useSelector(selectVisibilityRecords);

  const [isDragging, setIsDragging] = useState(false);
  const [draggingElement, setDraggingElement] = useState(null);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);

  const handleDragStart = (e) => {
    setIsDragging(true);
    onDragStart(e, car.id);

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
    setServiceBookingModalIsOpen(true);
  };

  const handleModalClose = () => {
    setServiceBookingModalIsOpen(false);
  };

  const {
    auto,
    photo_url: photoUrl,
    vin,
    mileage,
    status,
    complete_d,
    date_s,
    name,
    phone,
    plate: carNumber,
  } = car;

  const carPhoto = photoUrl || absentAutoImg;

  return (
    <div
      className={`${styles.crmBlockDayCarsItemContainer} ${
        isDragging ? styles.dragging : ""
      }`}
      style={getBackgroundStyle(status)}
      id={car.id}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
    >
      <div className={styles.userInfo}>
        <div>{renderStatus(status, complete_d, styles)}</div>
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
              <span className={styles.nameCar}>{auto}</span>
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
          {visibility?.info && <CarDetailButton />}

          {(status === "repair" ||
            status === "diagnostic" ||
            status === "complete") &&
            visibility?.paymentBtn && <PaymentBtn />}

          {status === "new" && visibility?.createBtn && (
            <button
              className={clsx(styles.plus, {
                [styles.hidden]: !visibility?.createBtn,
              })}
              onClick={openServiceBookingModal}
            >
              <BsPlusLg className={styles.iconPlus} />
            </button>
          )}

          {(status === "new" || status === "complete") &&
            visibility?.archive && (
              <button
                className={clsx(styles.btnSave, {
                  [styles.hidden]: !visibility?.archive,
                })}
              >
                <BsLayerBackward size={16} />
              </button>
            )}

          {serviceBookingModalIsOpen && (
            <Modal
              isOpen={serviceBookingModalIsOpen}
              onClose={handleModalClose}
            >
              <ServiceBookingModal onClose={handleModalClose} />
            </Modal>
          )}
        </div>
      </div>
      <div className={styles.crmcarsInfo}>
        <div className={styles.carInfoLeft}>
          {visibility?.rating && (
            <div
              className={clsx(
                styles.crmRating,
                !visibility.rating && styles.hidden
              )}
            >
              <AiFillStar color="var(--star-orange)" size={14.5} />
              <AiFillStar color="var(--star-orange)" size={14.5} />
              <AiFillStar color="var(--star-orange)" size={14.5} />
              <AiFillStar color="var(--star-orange)" size={14.5} />
              <AiFillStar color="var(--star-white)" size={14.5} />
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
                {carNumber ? carNumber : "хххххх"}
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
