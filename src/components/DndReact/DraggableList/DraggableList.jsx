import DraggableItem from '../DraggableItem/DraggableItem';
import styles from './DraggableList.module.css';

const DraggableList = ({ items, onDragStart }) => {
  return (
    <div className={styles.draggableList}>
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          id={item.id}
          content={
            <div>
              <strong>{item.name}</strong> <br />
              {item.auto} {item.plate} <br />
              Телефон: {item.phone}
            </div>
          }
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
};

export default DraggableList;
