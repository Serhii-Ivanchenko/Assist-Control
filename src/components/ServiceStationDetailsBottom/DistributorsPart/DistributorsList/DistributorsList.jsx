import DistributorsItem from "../DistributorsItem/DistributorsItem";
import styles from "./DistributorsList.module.css";

function DistributorsList({ distributorsData }) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.distributorsList}>
        {distributorsData.map((distributor) => (
          <li key={distributor.id} className={styles.distributorsItem}>
            <DistributorsItem item={distributor} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DistributorsList;
