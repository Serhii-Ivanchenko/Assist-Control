import styles from './Column.module.css';

const Column = ({ id, onDragOver, onDrop, children }) => {
  return (
    <div
      id={id}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
      className={styles.droppableColumn}
    >
      {children}
    </div>
  );
};

export default Column;
