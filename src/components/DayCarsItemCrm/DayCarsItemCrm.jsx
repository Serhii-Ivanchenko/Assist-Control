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

export default function DayCarsItemCrm({ car }) {
  const [serviceBookingModalIsOpen, setServiceBookingModalIsOpen] =
    useState(false);

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
      className={styles.crmBlockDayCarsItemContainer}
      style={getBackgroundStyle(status)}
    >
      <div className={styles.userInfo}>
        <div>{renderStatus(status, complete_d, styles)}</div>
        <div className={styles.infoCard}>
          <div className={styles.infoName}>
            <BsPersonFill className={styles.iconHuman} color="#617651" />
            <span className={styles.textName}>{name ? name : "Гість"}</span>
          </div>
          <div className={styles.infoTel}>
            <BsTelephoneOutboundFill
              className={styles.iconTel}
              color="#006D95"
            />
            <span className={styles.textTel}>
              {phone ? phone : "ххх-ххххххх"}
            </span>
          </div>
          <div className={styles.infoCar}>
            <IoCarSportSharp size={13} color="#A97878" />
            <span className={styles.nameCar}>{auto}</span>
          </div>
        </div>
        <div className={styles.vinContainer}>
          <p className={styles.vinCode}>
            <span className={styles.vinNumber}>{vin || "VIN не вказано"}</span>
          </p>
          <BsFiles
            className={styles.copyIcon}
            size={13}
            onClick={() => copyToClipboard(vin || "VIN не вказано")}
          />
        </div>
        <div className={styles.btnContainer}>
          <CarDetailButton />
          {(status === "repair" ||
            status === "diagnostic" ||
            status === "complete") && <PaymentBtn />}
          {status === "new" && (
            <button className={styles.plus} onClick={openServiceBookingModal}>
              <BsPlusLg className={styles.iconPlus} />
            </button>
          )}
          {(status === "new" || status === "complete") && (
            <button className={styles.btnSave}>
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
          <div className={styles.crmRating}>
            <AiFillStar color="var(--star-orange)" size={14.5} />
            <AiFillStar color="var(--star-orange)" size={14.5} />
            <AiFillStar color="var(--star-orange)" size={14.5} />
            <AiFillStar color="var(--star-orange)" size={14.5} />
            <AiFillStar color="var(--star-white)" size={14.5} />
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