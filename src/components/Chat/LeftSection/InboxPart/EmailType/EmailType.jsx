import { BsEnvelope } from "react-icons/bs";
import { BsChatDots } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { BsCheck2Square } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import css from "./EmailType.module.css";
import { useState } from "react";

export default function EmailType({ handleFilter }) {
  const types = [
    {
      icon: <BsEnvelope className={css.icon} />,
      text: "Email",
      value: "4",
      id: "1",
      category: "email",
    },
    {
      icon: <BsChatDots className={css.icon} />,
      text: "Чати",
      value: "6",
      id: "2",
      category: "chat",
    },
    {
      icon: <BsClock className={css.icon} />,
      text: "Відкладені",
      value: "1",
      id: "3",
      // category: "",
    },
    {
      icon: <BsCheck2Square className={css.icon} />,
      text: "Закриті",
      value: "",
      id: "4",
      // category: "",
    },
    {
      icon: <BsBookmark className={css.icon} />,
      text: "Обрані",
      value: "6",
      id: "5",
      // category: "",
    },
    {
      icon: <BsArchive className={css.icon} />,
      text: "Архів",
      value: "",
      id: "6",
      // category: "",
    },
  ];

  const [isActive, setIsActive] = useState(null);

  return (
    <div>
      <ul className={css.typeList}>
        {types.map((type, index) => (
          <li
            key={index}
            className={`${css.typeItem} ${
              isActive === type.id && css.typeItemActive
            }`}
            onClick={(e) => {
              setIsActive(type.id);
              handleFilter(e, type.category, true);
            }}
          >
            <div className={css.contentContainer}>
              <div className={css.iconTextBox}>
                {type.icon}
                <p className={css.text}>{type.text}</p>
              </div>
              <p
                className={`${css.numberBox} ${
                  (type.value === "" || type.value === null) &&
                  css.numberBoxHidden
                }`}
              >
                {type.value}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
