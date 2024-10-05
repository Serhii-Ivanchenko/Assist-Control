import styles from './CalendarBlock.module.css';
import DayCarsList from '../DayCarsList/DayCarsList';
import DetailsBtn from '../DetailsBtn/DetailsBtn';
import Calendar from '../Calendar/Calendar';

export default function CalendarBlock() {
  const carsData = [
    { number: "AХ5678БУ", model: "Skoda Superb", timeInfo: "Заїзд в інший день" },
    { number: "BC1234AA", model: "Toyota Camry", timeInfo: "Заїзд в той же день" },
    { number: "KI8765OP", model: "Honda Civic", timeInfo: "Заїзд в інший день" },
    // { number: "LP4321QW", model: "BMW X5", timeInfo: "Заїзд в той же день" },
    // { number: "MN2468KL", model: "Mercedes E-Class", timeInfo: "Заїзд в інший день" },
    // { number: "EF1357YU", model: "Audi A6", timeInfo: "Заїзд в той же день" },
  ];

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.topContainer}>
        <Calendar />
        <DayCarsList carsData={carsData} />
      </div>
      {carsData.length > 3 && <DetailsBtn />}
    </div>
  );
}
