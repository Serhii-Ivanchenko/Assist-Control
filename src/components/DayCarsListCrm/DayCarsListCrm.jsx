import { useSelector } from "react-redux";
import DayCarsItemCrm from "../DayCarsItemCrm/DayCarsItemCrm.jsx";
import styles from './DayCarsListCrm.module.css';
import { selectVisibilityCar } from "../../redux/visibility/selectors.js";

export default function DayCarsListCrm({ records, onDragStart, onArchiveSuccess }) {
  const visibility = useSelector(selectVisibilityCar);

  if (records.length === 0) return null;

  return (
    <div className={styles.crmBlockDayCarsListContainer}>
      <ul className={styles.crmCarList}>
        {records.map((car) => (
          <DayCarsItemCrm
            key={car.car_id}
            car={car}
            onDragStart={onDragStart}
            visibility={visibility}
            onArchiveSuccess={onArchiveSuccess}
          />
        ))}
      </ul>
    </div>
  );
}
