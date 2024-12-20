import ClientsInWorkItem from "./ClientsInWorkItem/ClientsInWorkItem";
import defImg from "../../assets/images/absentAutoImg.webp";
import css from "./ClientsInWorkListSection.module.css";

const data = [
  {
    id: 1,
    status: "repair",
    car_model: "HONDA CIVIC",
    car_img: defImg,
    isActive: true,
    pre_paid: 2000,
    post_paid: 8482,
  },
  {
    id: 2,
    status: "new",
    car_model: "HONDA CIVIC",
    car_img: defImg,
    isActive: true,
    pre_paid: 2000,
    post_paid: 8482,
  },
  {
    id: 3,
    status: "complete",
    car_model: "HONDA CIVIC",
    car_img: defImg,
    isActive: true,
    pre_paid: 2000,
    post_paid: 8482,
  },
  {
    id: 4,
    status: "complete",
    car_model: "HONDA CIVIC",
    car_img: defImg,
    isActive: true,
    pre_paid: 2000,
    post_paid: 8482,
  },
  {
    id: 5,
    status: "repair",
    car_model: "HONDA CIVIC",
    car_img: defImg,
    isActive: false,
    pre_paid: 2000,
    post_paid: 8482,
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
