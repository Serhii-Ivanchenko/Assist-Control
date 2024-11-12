import styles from './DroppableColumn.module.css';

const DroppableColumn = ({ id, title, onDragOver, onDrop, children }) => {
  return (
    <div
      id={id}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
      className={styles.droppableColumn}
    >
      <h3 className={styles.droppableColumnTitle}>{title}</h3>
      {children}
    </div>
  );
};

export default DroppableColumn;
