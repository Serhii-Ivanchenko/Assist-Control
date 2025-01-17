import { BsEnvelope } from "react-icons/bs";
import { BsChatDots } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { BsCheck2Square } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import css from "./EmailType.module.css";
// import { useState } from "react";

export default function EmailType({
  handleFilter,
  // chats,
  isActive,
  setIsActive,
  categoryCounts,
}) {
  const types = [
    {
      icon: <BsEnvelope className={css.icon} />,
      text: "Email",
      value: categoryCounts.email,
      id: "1",
      category: "email",
      filterType: "category",
    },
    {
      icon: <BsChatDots className={css.icon} />,
      text: "Чати",
      value: categoryCounts.chat,
      id: "2",
      category: "chat",
      filterType: "category",
    },
    {
      icon: <BsClock className={css.icon} />,
      text: "Відкладені",
      value: categoryCounts.delayed,
      id: "3",
      category: "delayed",
      filterType: "state",
    },
    {
      icon: <BsCheck2Square className={css.icon} />,
      text: "Закриті",
      value: categoryCounts.closed,
      id: "4",
      category: "closed",
      filterType: "state",
    },
    {
      icon: <BsBookmark className={css.icon} />,
      text: "Обрані",
      value: categoryCounts.chosen,
      id: "5",
      category: "chosen",
      filterType: "state",
    },
    {
      icon: <BsArchive className={css.icon} />,
      text: "Архів",
      value: categoryCounts.archive,
      id: "6",
      category: "archive",
      filterType: "state",
    },
  ];

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
              handleFilter(e, type.category, type.filterType);
            }}
          >
            <div className={css.contentContainer}>
              <div className={css.iconTextBox}>
                {type.icon}
                <p className={css.text}>{type.text}</p>
              </div>
              <p
                className={`${css.numberBox} ${
                  (type.value === 0 || type.value === null) &&
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
