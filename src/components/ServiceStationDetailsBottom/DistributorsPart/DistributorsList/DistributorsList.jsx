import DistributorsItem from "../DistributorsItem/DistributorsItem";
import styles from "./DistributorsList.module.css";

function DistributorsList({ distributorsData, onDelete, updateDistributors }) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.distributorsList}>
        {distributorsData.map((distributor, index) => (
          <li key={index} className={styles.distributorsItem}>
            <DistributorsItem
              item={distributor}
              onDelete={onDelete}
              updateDistributors={updateDistributors}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DistributorsList;
