import DayCarsItem from "../DayCarsItem/DayCarsItem.jsx";
import styles from './DayCarsList.module.css';
import clsx from 'clsx';

export default function DayCarsList({ carsData, hasDetailsButton, isModal, viewMode = "grid" }) {

  console.log(`Current view mode in DayCarsList: ${viewMode}`);

  const maxVisibleCars = 3;
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
          carNumber={car.plate}
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
