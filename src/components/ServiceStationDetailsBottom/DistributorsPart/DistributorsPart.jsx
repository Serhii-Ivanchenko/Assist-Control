import DistributorsList from "./DistributorsList/DistributorsList";
import { BsTruck } from "react-icons/bs";
import styles from "./DistributorsPart.module.css";

function DistributorsPart() {
  return (
    <div className={styles.wrapper}>
      <DistributorsList />
      <button className={styles.btn} type="button">
        <BsTruck />
        Додати постачальника
      </button>
    </div>
  );
}

export default DistributorsPart;
