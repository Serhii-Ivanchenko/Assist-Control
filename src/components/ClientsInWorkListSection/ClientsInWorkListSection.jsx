import ClientsInWorkItem from "./ClientsInWorkItem/ClientsInWorkItem";
import css from "./ClientsInWorkListSection.module.css";

export default function ClientsInWorkListSection({ clients }) {
  console.log(clients.map(client => client.date_e));

  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {clients .map((item) => (
          <li key={item.car_id}>
            <ClientsInWorkItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
