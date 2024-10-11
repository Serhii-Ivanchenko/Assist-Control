import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DayCarsList from '../DayCarsList/DayCarsList';
import DetailsBtn from '../DetailsBtn/DetailsBtn';
import CalendarPagination from '../CalendarPagination/CalendarPagination.jsx';
import { getCarsByDate} from '../../redux/cars/operations.js';
import { selectDayCars, selectLoading, selectError, selectDate } from '../../redux/cars/selectors.js';
import styles from './CalendarBlock.module.css';

export default function CalendarBlock() {
  const dispatch = useDispatch();

  const carsData = useSelector(selectDayCars);
  const selectedDate = useSelector(selectDate);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (selectedDate) {
      dispatch(getCarsByDate(selectedDate));
    }
  }, [dispatch, selectedDate]);

  const maxVisibleCars = 3;
  const hasDetailsButton = carsData.length > maxVisibleCars;

  return (
    <div className={styles.calendarContainer}>
      <div
        className={`${styles.topContainer} ${
          !hasDetailsButton ? styles.fullHeight : ""
        }`}
      >
        <CalendarPagination />
        {isLoading && <p>Loading cars...</p>}
        {error && <p>Error: {error}</p>}
        <DayCarsList carsData={carsData} hasDetailsButton={hasDetailsButton} />
      </div>
      {hasDetailsButton && (
          <DetailsBtn />
      )}
    </div>
  );
}
