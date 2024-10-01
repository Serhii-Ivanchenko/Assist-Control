import carImg from "../../img/image 2.webp";
import { NavLink } from "react-router-dom";

import styles from "./CurrentCarsItem.module.css";

export default function CurrentCarsItem() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img src={carImg} alt="Car image" />
      </div>
      <div className={styles.carInfoContainer}>
        <h3 className={styles.carReg}>AХ5678БУ</h3>
        <p className={styles.carBrand}>Opel Astra</p>
        <h4 className={styles.carTimeStamp}>2 дні 13:48:25</h4>
      </div>
      <p className={styles.carStatus}>Статус автомобіля</p>
      <NavLink className={styles.carDetails}>Деталі</NavLink>
    </div>
  );
}
