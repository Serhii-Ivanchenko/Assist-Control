import styles from "./Column.module.css";

export default function Column({ children, status, onDrop }) {
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    console.log(event)
    onDrop(event, status); 
  };

  return (
    <div
      className={styles.column}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}
