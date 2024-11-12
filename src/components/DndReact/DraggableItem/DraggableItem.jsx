import styles from './DraggableItem.module.css';

const DraggableItem = ({ id, content, onDragStart }) => {
  return (
    <div
      id={id}
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      className={styles.draggableItem}
    >
      {content}
    </div>
  );
};

export default DraggableItem;
