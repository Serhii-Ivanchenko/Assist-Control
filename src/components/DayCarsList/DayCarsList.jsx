import DayCarsItem from "../DayCarsItem/DayCarsItem.jsx";
import DayCarsItemLine from "../DayCarsItemLine/DayCarsItemLine.jsx";
import styles from './DayCarsList.module.css';
import clsx from 'clsx';

export default function DayCarsList({ carsData, isModal, viewMode = "grid" }) {
  
  const visibleCars = carsData;

  if (visibleCars.length === 0) return null;

  const CarItemComponent = viewMode === "list" ? DayCarsItemLine : DayCarsItem;

  const renderCarItem = (car) => (
    <CarItemComponent
      key={car.car_id}
      car={car}
      isModal={isModal}
      viewMode={viewMode}
    />
  );

  return (
    <div
      className={clsx(
        styles.dayCarsListContainer,
        isModal && styles.modaldayCarsListContainer
      )}
    >
      <div className={clsx(styles.scrollWrapper, isModal && styles.modalscrollWrapper)}>
        <ul className={clsx(styles.carsList, isModal && styles.modalCarsList)}>
          {visibleCars.map(renderCarItem)}
        </ul>
      </div>
    </div>
  );
}