import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DayCarsList from '../DayCarsList/DayCarsList';
import DetailsBtn from '../DetailsBtn/DetailsBtn';
import CalendarPagination from '../CalendarPagination/CalendarPagination.jsx';
import { getCarsByDate} from '../../redux/cars/operations.js';
import { selectDayCars, selectLoading, selectDate } from '../../redux/cars/selectors.js';
import styles from './CalendarBlock.module.css';
import toast from 'react-hot-toast';

export default function CalendarBlock() {
  const dispatch = useDispatch();

  const carsData = useSelector(selectDayCars);
  const selectedDate = useSelector(selectDate);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    if (selectedDate) {
      dispatch(getCarsByDate(selectedDate))
        .unwrap()
        .then(() => {
        })
        .catch(() => {
          toast.error("Щось пішло не так. Будь ласка, спробуйте ще раз.");
        });
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
        <DayCarsList carsData={carsData} hasDetailsButton={hasDetailsButton} />
      </div>
      {hasDetailsButton && (
          <DetailsBtn />
      )}
    </div>
  );
}
