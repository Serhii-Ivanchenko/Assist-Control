import ClientsInWorkItem from "./ClientsInWorkItem/ClientsInWorkItem";
import defImg from "../../assets/images/absentAutoImg.webp";
import css from "./ClientsInWorkListSection.module.css";

const data = [
  {
    id: 1,
    status: "repair",
    car_model: "HONDA CIVIC",
    car_img: defImg,
  },
  {
    id: 2,
    status: "new",
    car_model: "HONDA CIVIC",
    car_img: defImg,
  },
  {
    id: 3,
    status: "complete",
    car_model: "HONDA CIVIC",
    car_img: defImg,
  },
  {
    id: 4,
    status: "complete",
    car_model: "HONDA CIVIC",
    car_img: defImg,
  },
  {
    id: 1,
    status: "repair",
    car_model: "HONDA CIVIC",
    car_img: defImg,
  },
  {
    id: 2,
    status: "new",
    car_model: "HONDA CIVIC",
    car_img: defImg,
  },
  {
    id: 3,
    status: "complete",
    car_model: "HONDA CIVIC",
    car_img: defImg,
  },
  {
    id: 4,
    status: "complete",
    car_model: "HONDA CIVIC",
    car_img: defImg,
  },
];

export default function ClientsInWorkListSection() {
  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {data.map((item) => (
          <li key={item.id}>
            <ClientsInWorkItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
