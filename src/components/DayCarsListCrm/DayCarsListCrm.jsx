import DayCarsItemCrm from "../DayCarsItemCrm/DayCarsItemCrm.jsx";
import styles from './DayCarsListCrm.module.css';

export default function DayCarsListCrm({ records }) {
  if (records.length === 0) return null;

  const renderCarItem = (car) => (
    <DayCarsItemCrm key={car.id} car={car} />
  );

  return (
    <div className={styles.crmBlockDayCarsListContainer}>
        <ul className={styles.crmCarList}>
          {records.map(renderCarItem)}
        </ul>
    </div>
  );
}
