import ClientStatusStepper from "../ClientsStatusStepper/ClientStatusStepper";
import GetStatus from "./GetStatus";
import styles from "./ClientsInWorkItem.module.css";

function ClientsInWorkItem({ item }) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.itemsList}>
        <li className={styles.date}>04.02</li>
        <li className={styles.status}>
          <GetStatus status={item.status} />
        </li>
        <li className={styles.stepper}>
          <ClientStatusStepper
            car={item.car_model}
            carImg={item.car_img}
            status={item.status}
          />
        </li>
      </ul>
    </div>
  );
}

export default ClientsInWorkItem;