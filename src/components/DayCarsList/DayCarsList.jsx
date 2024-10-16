import DayCarsItem from "../DayCarsItem/DayCarsItem.jsx";
import styles from './DayCarsList.module.css';

export default function DayCarsList({ carsData, hasDetailsButton, isModal  }) {
  console.log("isModal in DayCarsList:", isModal);
  console.log("props:", { carsData, hasDetailsButton, isModal });


  const maxVisibleCars = 3;

  return (
    <div
      className={`${styles.dayCarsListContainer} ${
        hasDetailsButton ? styles.withBtn : ""
      }`}
    >
      {carsData.slice(0, maxVisibleCars).map((car) => (
        <DayCarsItem
          key={car.id}
          carNumber={car.plate}
          auto={car.auto}
          timeInfo={`Дата заїзду: ${new Date(car.date_s).toLocaleTimeString()}`}
          photoUrl={car.photo_url}
          isModal={isModal} 
        />
      ))}
    </div>
  );
}
