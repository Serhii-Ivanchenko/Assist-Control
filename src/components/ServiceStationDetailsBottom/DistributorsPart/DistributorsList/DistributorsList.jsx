import DistributorsItem from "../DistributorsItem/DistributorsItem";
import styles from "./DistributorsList.module.css";

function DistributorsList({ distributorsData, onEditDistributor, onDelete }) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.distributorsList}>
        {distributorsData.map((distributor) => (
          <li key={distributor.id} className={styles.distributorsItem}>
            <DistributorsItem
              item={distributor}
              onEdit={onEditDistributor}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DistributorsList;
