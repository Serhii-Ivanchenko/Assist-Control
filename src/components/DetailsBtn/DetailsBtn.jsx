import styles from './DetailsBtn.module.css';

export default function DetailsBtn({ onClick }) {
  return (
    <div className={styles.btnContainer}>
      <button className={styles.btn} onClick={onClick}>
      Детальна інформація
      </button>
    </div>
  );
}
