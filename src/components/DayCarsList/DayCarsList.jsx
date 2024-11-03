import DayCarsItem from "../DayCarsItem/DayCarsItem.jsx";
import DayCarsItemLine from "../DayCarsItemLine/DayCarsItemLine.jsx";
import styles from './DayCarsList.module.css';
import clsx from 'clsx';

export default function DayCarsList({ carsData, isModal, viewMode = "grid", isCRMBlock }) {
  const visibleCars = carsData;

  if (visibleCars.length === 0) return null;

  const CarItemComponent = viewMode === "list" ? DayCarsItemLine : DayCarsItem;

  const renderCarItem = (car) => (
    <CarItemComponent
      key={car.id}
      car={car} // Передаємо весь об'єкт car
      isModal={isModal}
      viewMode={viewMode}
      isCRMBlock={isCRMBlock}
    />
  );

  return (
    <div
      className={clsx(
        styles.dayCarsListContainer,  
        isModal && styles.modaldayCarsListContainer,
        isCRMBlock && styles.crmBlockDayCarsListContainer
      )}
    >
      {!isCRMBlock && (
        <div className={clsx(styles.scrollWrapper, isModal && styles.modalscrollWrapper)}>
          <ul className={clsx(styles.carsList, isModal && styles.modalCarsList)}>
            {visibleCars.map(renderCarItem)}
          </ul>
        </div>
      )}
      {isCRMBlock && (
        <ul className={clsx(styles.carsList, isModal && styles.modalCarsList)}>
          {visibleCars.map(renderCarItem)}
        </ul>
      )}
    </div>
  );
}
