import styles from './CalendarBlock.module.css';
import DayCarsList from '../DayCarsList/DayCarsList';
import DetailsBtn from '../DetailsBtn/DetailsBtn';
import CalendarPagination from '../CalendarPagination/CalendarPagination.jsx';

export default function CalendarBlock() {
  const carsData = [
    { number: "AХ5678БУ", model: "Skoda Superb", timeInfo: "Заїзд в інший день" },
    { number: "BC1234AA", model: "Toyota Camry", timeInfo: "Заїзд в той же день" },
    { number: "KI8765OP", model: "Honda Civic", timeInfo: "Заїзд в інший день" },
    // { number: "LP4321QW", model: "BMW X5", timeInfo: "Заїзд в той же день" },
  ];

  const maxVisibleCars = 3;
  const hasDetailsButton = carsData.length > maxVisibleCars;

  return (
    <div className={styles.calendarContainer}>
      <div className={`${styles.topContainer} ${!hasDetailsButton ? styles.fullHeight : ''}`}>
        <CalendarPagination />
        <DayCarsList carsData={carsData} />
      </div>
      {hasDetailsButton && (
        <div className={styles.detailsButtonContainer}>
          <DetailsBtn />
        </div>
      )}
    </div>
  );
}
