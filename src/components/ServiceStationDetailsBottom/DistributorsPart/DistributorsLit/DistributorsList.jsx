import DistributorsCard from "../DistributorsCard/DistributorsCard";
import styles from "./DistributorsList.module.css";

function DistributorsList() {
  return (
    <div className={styles.wrapper}>
      <DistributorsCard />
      <DistributorsCard />
      <DistributorsCard />
      <DistributorsCard />
    </div>
  );
}

export default DistributorsList;
