import css from "./NewChatPopup.module.css";
import avatar from "../../../../../assets/images/avatar_default.png";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

export default function NewChatPopup() {
  const interlocutors = [
    { name: "Олександр Мельник", photo: avatar, phone: "+380931234567" },
    { name: "Анастасія Шевченко", photo: avatar, phone: "+380661112233" },
    { name: "Максим Гончаренко", photo: avatar, phone: "+380671234890" },
    { name: "Ірина Коваль", photo: avatar, phone: "+380681111222" },
    { name: "Дмитро Поліщук", photo: avatar, phone: "+380501234567" },
    { name: "Антон Колесник", photo: avatar, phone: "+380931112244" },
    { name: "Ірина Коваль", photo: avatar, phone: "+380661122334" },
    { name: "Дмитро Поліщук", photo: avatar, phone: "+380671123456" },
    { name: "Антон Колесник", photo: avatar, phone: "+380681123456" },
    { name: "Антон Колесник", photo: avatar, phone: "+380501122334" },
    { name: "Ірина Коваль", photo: avatar, phone: "+380931122334" },
    { name: "Дмитро Поліщук", photo: avatar, phone: "+380661123456" },
    { name: "Антон Колесник", photo: avatar, phone: "+380671122334" },
  ];

  const [filter, setFilter] = useState("");

  const inputRef = useRef(null);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const visibleContacts = interlocutors.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.phone.toLowerCase().includes(filter.toLowerCase())
  );

   useEffect(() => {
     inputRef.current?.focus();
   }, []);

  return (
    <div className={css.newChatWrapper}>
      <div className={css.inputBox}>
        <IoIosSearch className={css.inputIcon} />
        <input
          ref={inputRef}
          className={css.input}
          placeholder="+3807332..."
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
