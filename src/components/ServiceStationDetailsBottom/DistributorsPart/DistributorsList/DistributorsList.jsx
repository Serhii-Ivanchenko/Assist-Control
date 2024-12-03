import { useState } from "react";
import DistributorsItem from "../DistributorsItem/DistributorsItem";
import styles from "./DistributorsList.module.css";

function DistributorsList({ distributorsData }) {
  const [distributors, setDistributors] = useState(distributorsData);

  const handleToggleDisable = (id) => {
    setDistributors((prev) =>
      prev.map((distributor) =>
        distributor.id === id
          ? { ...distributor, isDisabled: !distributor.isDisabled }
          : distributor
      )
    );
  };

  const handleDelete = (id) => {
    setDistributors((prev) =>
      prev.filter((distributor) => distributor.id !== id)
    );
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.distributorsList}>
        {distributors.map((distributor, index) => (
          <li key={index} className={styles.distributorsItem}>
            <DistributorsItem
              item={distributor}
              onEdit={(id, updates) =>
                setDistributors((prev) =>
                  prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
                )
              }
              onDelete={handleDelete}
              onToggleDisable={() => handleToggleDisable(distributor.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DistributorsList;
