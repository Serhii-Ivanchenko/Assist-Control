import { useState } from 'react';
import DraggableList from '../DraggableList/DraggableList';
import DroppableColumn from '../DroppableColumn/DroppableColumn';
import styles from './AppMain.module.css';

const statusMapping = {
  new: 'Нова',
  diagnostic: 'Діагностика',
  repair: 'Ремонт',
  complete: 'Завершено',
};

const initialItems = [
    { id: 'item1', name: 'Іван Іванов', auto: 'Toyota', carNumber: 'AA1234BB', phone: '123-456-789', status: 'new', vin: '12345678901234567', mileage: '1500 км', complete_d: '2024-11-01', date_s: '2024-11-01', photo_url: null },
    { id: 'item2', name: 'Оля Петренко', auto: 'Honda', carNumber: 'BC5678CD', phone: '234-567-890', status: 'diagnostic', vin: '23456789012345678', mileage: '2000 км', complete_d: '2024-11-05', date_s: '2024-11-05', photo_url: null },
    { id: 'item3', name: 'Петро Семенов', auto: 'BMW', carNumber: 'DE8765FG', phone: '345-678-901', status: 'repair', vin: '34567890123456789', mileage: '3000 км', complete_d: '2024-11-10', date_s: '2024-11-10', photo_url: null },
    { id: 'item4', name: 'Марія Коваль', auto: 'Audi', carNumber: 'FG2345HI', phone: '456-789-012', status: 'complete', vin: '45678901234567890', mileage: '4000 км', complete_d: '2024-11-15', date_s: '2024-11-15', photo_url: null },
    { id: 'item5', name: 'Сергій Борисенко', auto: 'Ford', carNumber: 'IJ1234KL', phone: '567-890-123', status: 'new', vin: '56789012345678901', mileage: '5000 км', complete_d: '2024-11-20', date_s: '2024-11-20', photo_url: null },
    { id: 'item6', name: 'Ірина Яценко', auto: 'Mercedes', carNumber: 'MN4567OP', phone: '678-901-234', status: 'diagnostic', vin: '67890123456789012', mileage: '6000 км', complete_d: '2024-11-25', date_s: '2024-11-25', photo_url: null },
  ];

const AppMain = () => {
  const [items, setItems] = useState(initialItems);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id === itemId);
      if (item) {
        item.status = status;
      }
      return [...prevItems];
    });
  };

  const getItemsForStatus = (status) => {
    return items.filter((item) => item.status === status);
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
