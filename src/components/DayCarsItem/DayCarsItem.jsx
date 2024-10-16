import styles from './DayCarsItem.module.css';
import carImage from '../../assets/images/carsItem.png';
import clsx from 'clsx';

export default function DayCarsItem({ carNumber, auto, timeInfo, photoUrl, isModal }) {
  console.log("isModal:", isModal);
  console.log("props:", { carNumber, auto, timeInfo, photoUrl, isModal });


  const defaultCarImage = carImage;
  const carPhoto = photoUrl ? photoUrl : defaultCarImage;

  return (
    <div
      className={clsx(
        styles.dayCarsItemContainer,
        isModal && styles.modalDayCarsItemContainer 
      )}
    >
      <div className={clsx(styles.carPhoto, isModal && styles.modalCarPhoto)}>
        <img src={carPhoto} alt="Фото автомобіля" />
      </div>
      <div className={styles.carsInfo}>
        <div className={styles.aboutCars}>
          <p className={styles.carNumber}>
            {carNumber}
          </p>
          <p className={styles.auto}>{auto}</p>
        </div>
        <p className={styles.timeInfo}>
          {timeInfo}
        </p>
      </div>
    </div>
  );
}
