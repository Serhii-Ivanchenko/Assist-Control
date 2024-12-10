import ClientsInWorkItem from "./ClientsInWorkItem/ClientsInWorkItem";
import css from "./ClientsInWorkListSection.module.css";

const clientsData = [
  {
    id: 1,
    car: "HONDA CIVIC",
    carImg: "",
    avatar: "",
    status: "",
    date: "",
  },
  {
    id: 2,
    car: "HONDA CIVIC",
    carImg: "",
    avatar: "",
    status: "",
    date: "",
  },
  {
    id: 3,
    car: "HONDA CIVIC",
    carImg: "",
    avatar: "",
    status: "",
    date: "",
  },
  {
    id: 4,
    car: "HONDA CIVIC",
    carImg: "",
    avatar: "",
    status: "",
    date: "04.12",
  },
];

export default function ClientsInWorkListSection() {
  return (
    <div className={css.wrapper}>
      <ul>
        {clientsData.map((client) => {
          <li key={client.id}>
            <ClientsInWorkItem
              date={client.date}
              status={client.status}
              car={client.car}
              img={client.carImg}
            />
          </li>;
        })}
      </ul>
    </div>
  );
}
