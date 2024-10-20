import DayCarsItem from "../DayCarsItem/DayCarsItem.jsx";
import styles from './DayCarsList.module.css';
import clsx from 'clsx';

export default function DayCarsList({ carsData, isModal, viewMode = "grid" }) {
  const visibleCars = carsData; 

  if (visibleCars.length === 0) return null;

  return (
    <div
      className={clsx(
        styles.dayCarsListContainer,  
        isModal && styles.modaldayCarsListContainer, 
        viewMode === "list" && styles.listView 
      )}
    >
      {visibleCars.map((car) => (
        <DayCarsItem
          className={styles.item}
          key={car.id}
          status={car.status}
          complete_d={car.complete_d}
          date_s={car.date_s}
          vin={car.vin}
          carNumber={car.plate}
          mileage={car.mileage}
          auto={car.auto}
          timeInfo={`Дата заїзду: ${new Date(car.date_s).toLocaleTimeString()}`}
          photoUrl={car.photo_url}
          isModal={isModal} 
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}
