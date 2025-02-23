import GetStatus from "./GetStatus";
import styles from "./ClientsInWorkItem.module.css";
import ClientStatusStepper from "../ClientsStatusStepper/ClientStatusStepper";

function ClientsInWorkItem({ item }) {
  const formatDate = (date) => {
    const options = {
      day: "numeric",
      month: "numeric",
    };
    return new Date(date).toLocaleDateString("uk-UA", options);
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.itemsList}>
        <li className={styles.date}>{formatDate(item.date)}</li>
        <li className={styles.status}>
          <GetStatus status={item.status} />
        </li>
        <li className={styles.stepper}>
          <ClientStatusStepper
            item={item}
            carId={item.car_id}
            car={item.model}
            carImg={item.photo_url}
            status={item.status}
            prePaid={item.pre_paid}
            postPaid={item.post_paid}
          />
        </li>
      </ul>
    </div>
  );
}

export default ClientsInWorkItem;
