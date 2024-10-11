import styles from './DayCarsItem.module.css';
import carImage from '../../assets/images/carsItem.png';

export default function DayCarsItem({ carNumber, auto, timeInfo }) {
  return (
    <div className={styles.dayCarsItemContainer}>
      <div className={styles.carPhoto}>
        <img src={carImage} alt="Фото автомобіля" />
      </div>
      <div className={styles.carsInfo}>
        <div className={styles.aboutCars}>
          <p className={styles.carNumber}>{carNumber}</p>
          <p className={styles.auto}>{auto}</p>
        </div>
        <p className={styles.timeInfo}>{timeInfo}</p>
      </div>
    </div>
  );
}
