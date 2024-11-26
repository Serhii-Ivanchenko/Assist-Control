import DistributorsCard from "../DistributorsCard/DistributorsCard";
import styles from "./DistributorsList.module.css";

const distributorsData = [
  { id: 1, name: "Distributor 1" },
  { id: 2, name: "Distributor 2" },
  { id: 3, name: "Distributor 3" },
  { id: 4, name: "Distributor 4" },
];

function DistributorsList() {
  return (
    <div className={styles.wrapper}>
      {distributorsData.map((distributor) => (
        <DistributorsCard
          key={distributor.id}
          id={distributor.id}
          name={distributor.name}
        />
      ))}
    </div>
  );
}

export default DistributorsList;
