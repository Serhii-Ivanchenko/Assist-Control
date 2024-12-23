import ClientsInWorkItem from "./ClientsInWorkItem/ClientsInWorkItem";
import { clientsData } from "../ClientsInWorkMainComponent/clientsData";
import css from "./ClientsInWorkListSection.module.css";

export default function ClientsInWorkListSection() {
  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {clientsData.map((item) => (
          <li key={item.car_id}>
            <ClientsInWorkItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
