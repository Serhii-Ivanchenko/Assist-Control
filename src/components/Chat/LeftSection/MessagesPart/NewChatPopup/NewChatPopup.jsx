import css from "./NewChatPopup.module.css";
import avatar from "../../../../../assets/images/avatar_default.png";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";

export default function NewChatPopup() {
  const interlocutors = [
    { name: "Олександр Мельник", photo: avatar, phone: "123444456789" },
    { name: "Анастасія Шевченко", photo: avatar, phone: "0508603747" },
    { name: "Максим Гончаренко", photo: avatar, phone: "123456789" },
    { name: "Ірина Коваль", photo: avatar, phone: "123456789" },
    { name: "Дмитро Поліщук", photo: avatar, phone: "786454356789" },
    { name: "Антон Колесник", photo: avatar, phone: "123456789" },
    { name: "Ірина Коваль", photo: avatar, phone: "123409363589" },
    { name: "Дмитро Поліщук", photo: avatar, phone: "123456789" },
    { name: "Антон Колесник", photo: avatar, phone: "1234569576356789" },
    { name: "Антон Колесник", photo: avatar, phone: "123456789" },
    { name: "Ірина Коваль", photo: avatar, phone: "123456789" },
    { name: "Дмитро Поліщук", photo: avatar, phone: "123456789" },
    { name: "Антон Колесник", photo: avatar, phone: "123456789" },
  ];

  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const visibleContacts = interlocutors.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.phone.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.newChatWrapper}>
      <div className={css.inputBox}>
        <IoIosSearch className={css.inputIcon} />
        <input
          className={css.input}
          placeholder="+3807332"
          value={filter}
          onChange={handleChange}
        />
      </div>
      <ul className={css.userList}>
        {visibleContacts.map((interlocutor, index) => (
          <li key={index} className={css.userListItem}>
            <img src={interlocutor.photo} alt="" className={css.userPhoto} />
            <p className={css.userName}>{interlocutor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
