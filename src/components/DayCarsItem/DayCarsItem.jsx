import styles from './DayCarsItem.module.css';
import DetailsBtn from "../DetailsBtn/DetailsBtn";
import Modal from "../Modals/Modal/Modal.jsx";
import DayCarsModal from "../Modals/DayCarsModal/DayCarsModal.jsx";


import carImage from '../../assets/images/carsItem.png';
import clsx from 'clsx';
import { BsWrench } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { BsTelephoneOutboundFill } from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDayCars } from '../../redux/cars/selectors.js';
import { BsLayerBackward } from "react-icons/bs";



export default function DayCarsItem({ carNumber, auto, timeInfo, photoUrl, isModal }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const carsData = useSelector(selectDayCars);


  const defaultCarImage = carImage;
  const carPhoto = photoUrl ? photoUrl : defaultCarImage;

  const handleDetailsBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={clsx(
        styles.dayCarsItemContainer,
        isModal && styles.modalDayCarsItemContainer 
      )}
    >
      <div className={styles.userInfo}>
        <div className={styles.title}>
        <BsWrench  size={16} color="#246D4D" />
        <h3 className={styles.nameTitle}>ремонт</h3>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoName}>
          <BsPersonFill size={13} color="#617651"/>
          <span className={styles.textName}>Іван Петренко</span>
          </div>
          <div className={styles.infoTel}>
          <BsTelephoneOutboundFill size={13} color="#006D95"/>
          <span className={styles.textTel}>0733291217</span>
          </div>
          <div className={styles.infoCar}>
          <IoCarSportSharp size={13} color="#A97878"/>
          <span className={styles.nameCar}>2001 HONDA CIVIC</span>
          </div>
        </div>
        <div className={styles.infoVin}>
          <span className={styles.vinNum}>VW8795218794H46J</span>
        </div>
        <div className={styles.btnContainer}>
        <DetailsBtn onClick={handleDetailsBtnClick} />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <DayCarsModal
          carsData={carsData}
          isModal={true}
          onClose={handleCloseModal}
        />
      </Modal>
      <button className={styles.btnSave}>
      <BsLayerBackward size={16}/>
      </button>
        </div>
      </div>
      {/* <div className={clsx(styles.carPhoto, isModal && styles.modalCarPhoto)}>
        <img src={carPhoto} alt="Фото автомобіля" />
      </div>
      <div className={clsx(styles.carsInfo, isModal && styles.modalcarsInfo)}>
        <div className={styles.aboutCars}>
          <p className={styles.carNumber}>
            {carNumber}
          </p>
          <p className={styles.auto}>{auto}</p>
        </div>
        <p className={styles.timeInfo}>
          {timeInfo}
        </p>
      </div> */}
    </div>
  );
}
