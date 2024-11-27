import styles from "./DistributorsCard.module.css";

function Option({ icon, label, isActive, index, onToggle }) {
  return (
    <div className={styles.option} onClick={() => onToggle(index)}>
      <span className={isActive ? styles.activeIcon : styles.inactiveIcon}>
        {icon}
      </span>
      <p>{label}</p>
    </div>
  );
}

export default Option;
