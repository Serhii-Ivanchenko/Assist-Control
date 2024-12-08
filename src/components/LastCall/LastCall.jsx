import clsx from "clsx";
import css from "../LastCall/LastCall.module.css";
import { BsPersonSquare } from "react-icons/bs";
import { BsCalendarWeek } from "react-icons/bs";

const calls = [
  {
    name: "Іван Іваненко",
    phone: "+38 073 329 12 78",
    date: "30 листопада 2024 р. 09:10",
    avatar: null,
    lost: true,
  },
  {
    name: "Петр Петренко",
    phone: "+38 073 329 12 35",
    date: "25 листопада 2024 р. 09:50",
    avatar: null,
    lost: false,
  },
  {
    name: "Іван Петренко",
    phone: "+38 073 329 12 16",
    date: "29 листопада 2024 р. 09:39",
    avatar: null,
    lost: false,
  },
];

const lastCallDetails = calls[calls.length - 1];

console.log(lastCallDetails);

export default function LastCall() {
  return (
    <div className={css.wrapper}>
      <h3 className={css.header}>Останній дзвінок</h3>
      <p
        className={clsx(
          css.phoneNumber,
          lastCallDetails.lost ? css.lost : css.active
        )}
      >
        {lastCallDetails.phone}
      </p>
      <div className={css.nameWrapper}>
        <BsPersonSquare className={css.icon} />
        <p className={css.name}>{lastCallDetails.name}</p>
      </div>
      <div className={css.dateWrapper}>
        <BsCalendarWeek className={css.icon} />
        <p className={css.date}>{lastCallDetails.date}</p>
      </div>
      <div
        className={clsx(
          css.line,
          lastCallDetails.lost ? css.lostLine : css.activeLine
        )}
      ></div>
      <div className={css.bottomWrapper}>
        <img src={lastCallDetails.avatar} alt="" className={css.avatar} />
      </div>
    </div>
  );
}
