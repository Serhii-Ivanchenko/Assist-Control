import Modal from "react-modal";
import currentCar from "../../../assets/images/carListImg.webp";
import flag from "../../../assets/images/flagUa.webp";
import { IoMdClose } from "react-icons/io";
import styles from "./CurrentCarModal.module.css";
import { useEffect } from "react";
import eclipse from "../../../assets/modalicon/ellipse_33.webp";

Modal.setAppElement("#root");

function CurrentCarModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Current Car Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalContainer}>
          <img
            src={eclipse}
            alt="Eclipse decoration"
            className={styles.eclipseFrame}
          />
          <div className={styles.currentCarContainer}>
            <img
              src={currentCar}
              className={styles.currentCarImg}
              alt="Current car image"
            />

            <div className={styles.nameContainer}>
              <h3 className={styles.carBrand}>Opel Astra</h3>
              <p className={styles.carStatus}>В ремонті</p>
            </div>
          </div>
          <button className={styles.closeBtn} type="button" onClick={onClose}>
            <IoMdClose className={styles.icon} />
          </button>

          <div className={styles.carRegContainer}>
            <div className={styles.carRegCountry}>
              <img
                className={styles.carRegFlag}
                src={flag}
                alt="Car registration country flag"
              />
              <p className={styles.carRegCountry}>ua</p>
            </div>
            <p className={styles.carRegNumber}>ax 1234 ax</p>
          </div>

          <p className={styles.vinCode}>
            VIN: <span className={styles.vinNumber}>QWERTY123456ASDF789</span>
          </p>
          <div className={styles.serviceInfo}>
            <p className={styles.serviceTime}>
              У ремонті: 7 днів 3 години 24 хвилини
            </p>
          </div>
          <p className={styles.serviceDate}>з 14.09.2024 по 21.09.2024</p>
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" name="carStatus" /> На діагностиці
            </label>
            <label>
              <input type="radio" name="carStatus" defaultChecked /> В ремонті
            </label>
            <label>
              <input type="radio" name="carStatus" /> Огляд після ремонту
            </label>
            <label>
              <input type="radio" name="carStatus" /> Завершено
            </label>
          </div>
          <button className={styles.submitBtn} type="submit" onClick={onClose}>
            Підтвердити
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CurrentCarModal;
