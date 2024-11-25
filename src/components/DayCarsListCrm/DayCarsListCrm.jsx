import { useSelector } from "react-redux";
import { selectVisibilityCar } from "../../redux/cars/selectors.js";
import DayCarsItemCrm from "../DayCarsItemCrm/DayCarsItemCrm.jsx";
import styles from './DayCarsListCrm.module.css';

export default function DayCarsListCrm({ records, onDragStart }) {
  const visibility = useSelector(selectVisibilityCar);

  if (records.length === 0) return null;

  return (
    <div className={styles.crmBlockDayCarsListContainer}>
        <ul className={styles.crmCarList}>
          {records.map((car) => (
            <DayCarsItemCrm 
              key={car.id} 
              car={car} 
              onDragStart={onDragStart} 
              visibility={visibility} 
            />
          ))}
        </ul>
    </div>
  );
}
