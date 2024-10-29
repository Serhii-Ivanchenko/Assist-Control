import styles from "./DayCarsItem.module.css";
import Modal from "../Modals/Modal/Modal.jsx";
import DetailedClientInfo from "../DetailedClientInfo/DetailedClientInfo.jsx";
import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import clsx from "clsx";
import { useState } from "react";
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
import { getBackgroundStyle } from "../../utils/getBackgroundStyle";

export default function DayCarsItem({
  carNumber,
  auto,
  photoUrl,
  vin,
  mileage,
  isModal,
  status,
  complete_d,
  isCRMBlock,
  date_s,
  client,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const carsData = useSelector(selectDayCars);
  const car = carsData.find((car) => car.carNumber === carNumber);

  const carPhoto = photoUrl || absentAutoImg;

  return (
    <div
      className={clsx(
        styles.dayCarsItemContainer,
        isModal && styles.modalDayCarsItemContainer,
        isCRMBlock && styles.crmBlockDayCarsItemContainer
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
        <div className={clsx(styles.infoVin, isCRMBlock && styles.crmInfoVin)}>
          <span className={styles.vinNum}>{vin ? vin : "VIN-XXXXXXXXXXX"}</span>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.btnDetail} onClick={openModal}>
            <p className={styles.btnDetailText}>Деталі</p>
          </button>
          {/* <button className={styles.btnSave}>
            <BsLayerBackward size={16} />
          </button> */}
          {modalIsOpen && (
            <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
              <DetailedClientInfo onClose={handleModalClose} />
            </Modal>
          )}
        </div>
      </div>
      <div className={clsx(styles.carsInfo, isCRMBlock && styles.crmcarsInfo)}>
        <div className={styles.carInfoLeft}>
          <div className={clsx(styles.rating, isCRMBlock && styles.crmRating)}>
            <AiFillStar color="var(--star-orange)" />
            <AiFillStar color="var(--star-orange)" />
            <AiFillStar color="var(--star-orange)" />
            <AiFillStar color="var(--star-orange)" />
            <AiFillStar color="var(--star-white)" />
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
      {car && renderStatus(car.status, car.complete_d)}
    </div>
  );
}
