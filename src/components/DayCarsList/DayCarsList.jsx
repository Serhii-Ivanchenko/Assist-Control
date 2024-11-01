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
      isCRMBlock={isCRMBlock}
      client={car.client}
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
