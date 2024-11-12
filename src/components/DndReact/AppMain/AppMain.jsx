import { useState } from 'react';
import DraggableList from '../DraggableList/DraggableList';
import DroppableColumn from '../DroppableColumn/DroppableColumn';
import styles from './AppMain.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCars, selectDate, selectDayCars } from '../../../redux/cars/selectors.js';
import { changeCarStatus, getCarsByDate } from '../../../redux/cars/operations.js';
import toast from 'react-hot-toast';


// const initialItems = [
//     { id: 'item1', name: 'Іван Іванов', auto: 'Toyota', carNumber: 'AA1234BB', phone: '123-456-789', status: 'new', vin: '12345678901234567', mileage: '1500 км', complete_d: '2024-11-01', date_s: '2024-11-01', photo_url: null },
//     { id: 'item2', name: 'Оля Петренко', auto: 'Honda', carNumber: 'BC5678CD', phone: '234-567-890', status: 'diagnostic', vin: '23456789012345678', mileage: '2000 км', complete_d: '2024-11-05', date_s: '2024-11-05', photo_url: null },
//     { id: 'item3', name: 'Петро Семенов', auto: 'BMW', carNumber: 'DE8765FG', phone: '345-678-901', status: 'repair', vin: '34567890123456789', mileage: '3000 км', complete_d: '2024-11-10', date_s: '2024-11-10', photo_url: null },
//     { id: 'item4', name: 'Марія Коваль', auto: 'Audi', carNumber: 'FG2345HI', phone: '456-789-012', status: 'complete', vin: '45678901234567890', mileage: '4000 км', complete_d: '2024-11-15', date_s: '2024-11-15', photo_url: null },
//     { id: 'item5', name: 'Сергій Борисенко', auto: 'Ford', carNumber: 'IJ1234KL', phone: '567-890-123', status: 'new', vin: '56789012345678901', mileage: '5000 км', complete_d: '2024-11-20', date_s: '2024-11-20', photo_url: null },
//     { id: 'item6', name: 'Ірина Яценко', auto: 'Mercedes', carNumber: 'MN4567OP', phone: '678-901-234', status: 'diagnostic', vin: '67890123456789012', mileage: '6000 км', complete_d: '2024-11-25', date_s: '2024-11-25', photo_url: null },
//   ];

const statusMapping = {
  new: "Нова",
  diagnostic: "diagnostic",
  repair: "repair",
  complete: "complete",
};

const AppMain = () => {
  const dayCards = useSelector(selectDayCars);
  const currentDate = useSelector(selectDate);
  const dispatch = useDispatch();
  console.log("dayCards", dayCards);  
  
  // const [items, setItems] = useState(dayCards);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
    console.log('id', id);
    
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const itemId = Number(e.dataTransfer.getData('text/plain'));
    console.log("itemId", itemId);
    
    // setItems((prevItems) => {
      const item = dayCards.find((item) => item.id === itemId);
      if (item) {
        // item.status = status;
        dispatch(changeCarStatus({ carId: item.id, status: status }))
          .then(() => {
            dispatch(getCarsByDate(currentDate));
          })
          .catch((error) => {
            toast.error(
              "Помилка при оновленні статусу автомобіля",
              error.message
            );
          });
      }
      // return [...prevItems];
    // });
  };

  const getItemsForStatus = (status) => {
    return dayCards.filter((item) => item.status === status);
  };

  return (
    <div className={styles.appMain}>
      {Object.keys(statusMapping).map((statusKey) => (
        <DroppableColumn
          key={statusKey}
          id={statusKey}
          title={statusMapping[statusKey]}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, statusKey)}
        >
          <DraggableList
            items={getItemsForStatus(statusKey)}
            onDragStart={handleDragStart}
          />
        </DroppableColumn>
      ))}
    </div>
  );
};

export default AppMain;
