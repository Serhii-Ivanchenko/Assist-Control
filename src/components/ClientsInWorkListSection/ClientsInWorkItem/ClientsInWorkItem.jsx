import ClientStatusStepper from "../ClientsStatusStepper/ClientStatusStepper";
import GetStatus from "./GetStatus";
import styles from "./ClientsInWorkItem.module.css";

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
        <li className={styles.date}>{formatDate(item.date_e)}</li>
        <li className={styles.status}>
          <GetStatus status={item.status} />
        </li>
        <li className={styles.stepper}>
          <ClientStatusStepper
            carId={item.car_id}
            car={item.car_model}
            carImg={item.car_img}
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
