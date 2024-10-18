import DayCarsItem from "../DayCarsItem/DayCarsItem.jsx";
import styles from './DayCarsList.module.css';
import clsx from 'clsx';

export default function DayCarsList({ carsData, hasDetailsButton, isModal, viewMode = "grid" }) {

  const maxVisibleCars = 2;
  const visibleCars = isModal ? carsData : carsData.slice(0, maxVisibleCars);

  return (
    <div
      className={clsx(
        isModal ? styles.modaldayCarsListContainer : styles.dayCarsListContainer,
        hasDetailsButton && !isModal && styles.withBtn,
        viewMode === "grid" ? styles.modaldayCarsListContainer : styles.listView
      )}
    >
      {visibleCars.map((car) => (
        <DayCarsItem
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
