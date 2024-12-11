import styles from "./StepperBtn.module.css";

function StepperBtn({ value, icon }) {
  return (
    <>
      <button className={styles.btn}>
        <p className={styles.text}>{value}</p>
        <span className={styles.icon}>{icon}</span>
      </button>
    </>
  );
}

export default StepperBtn;
