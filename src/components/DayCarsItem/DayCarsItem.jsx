import styles from './DayCarsItem.module.css';
import carImage from '../../assets/images/carsItem.png';

export default function DayCarsItem() {
  return (
    <div className={styles.dayCarsItemContainer}>
      <div className={styles.carPhoto}>
        <img src={carImage} alt="Фото автомобіля" />
      </div>
      <div className={styles.carsInfo}>
        <div className={styles.aboutCars}>
          <p className={styles.carNumber}>AХ5678БУ</p>
          <p className={styles.auto}>Skoda Superb</p>
        </div>
        <p className={styles.timeInfo}>Заїзд в інший день</p>
      </div>
    </div>
  );
}
