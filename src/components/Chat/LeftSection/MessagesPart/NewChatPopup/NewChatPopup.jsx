import css from "./NewChatPopup.module.css";
import avatar from "../../../../../assets/images/avatar_default.png";
import { IoIosSearch } from "react-icons/io";

export default function NewChatPopup() {
  const interlocutors = [
    { name: "Олександр Мельник", photo: avatar },
    { name: "Анастасія Шевченко", photo: avatar },
    { name: "Максим Гончаренко", photo: avatar },
    { name: "Ірина Коваль", photo: avatar },
    { name: "Дмитро Поліщук", photo: avatar },
    { name: "Антон Колесник", photo: avatar },
    { name: "Ірина Коваль", photo: avatar },
    { name: "Дмитро Поліщук", photo: avatar },
    { name: "Антон Колесник", photo: avatar },
    { name: "Антон Колесник", photo: avatar },
    { name: "Ірина Коваль", photo: avatar },
    { name: "Дмитро Поліщук", photo: avatar },
    { name: "Антон Колесник", photo: avatar },
  ];

  return (
    <div className={css.newChatWrapper}>
      <div className={css.inputBox}>
        <IoIosSearch className={css.inputIcon} />
        <input className={css.input} placeholder="+3807332" />
      </div>
      <ul className={css.userList}>
        {interlocutors.map((interlocutor, index) => (
          <li key={index} className={css.userListItem}>
            <img src={interlocutor.photo} alt="" className={css.userPhoto} />
            <p className={css.userName}>{interlocutor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
