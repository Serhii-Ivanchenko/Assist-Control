import DayCarsItemCrm from "../DayCarsItemCrm/DayCarsItemCrm.jsx";
import styles from './DayCarsListCrm.module.css';

export default function DayCarsListCrm({ records, onDragStart, visibility  }) {
  if (records.length === 0) return null;

  const renderCarItem = (car) => (
    <DayCarsItemCrm key={car.id} car={car} onDragStart={onDragStart} visibility={visibility}/>
  );

  return (
    <div className={styles.crmBlockDayCarsListContainer}>
        <ul className={styles.crmCarList}>
          {records.map(renderCarItem)}
        </ul>
    </div>
  );
}