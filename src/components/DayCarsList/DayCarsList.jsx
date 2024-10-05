import DayCarsItem from "../DayCarsItem/DayCarsItem.jsx";
import styles from './DayCarsList.module.css';



export default function DayCarsList({ carsData }) {
  const maxVisibleCars = 3;

  return (
    <div className={styles.dayCarsListContainer}>
      {carsData.slice(0, maxVisibleCars).map((car, index) => (
        <DayCarsItem 
          key={index}
          carNumber={car.number}
          auto={car.model}
          timeInfo={car.timeInfo}
        />
      ))}
    </div>
  );
}
