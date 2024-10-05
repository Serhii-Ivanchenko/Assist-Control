import styles from './DetailsBtn.module.css';


export default function DetailsBtn() {
  return (
    <div className={styles.btnContainer}>
      <button className={styles.btn}>Детальна інформація</button>
    </div>
  );
}
