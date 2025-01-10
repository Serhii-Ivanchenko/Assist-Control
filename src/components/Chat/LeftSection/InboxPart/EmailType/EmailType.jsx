import { BsEnvelope } from "react-icons/bs";
import { BsChatDots } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { BsCheck2Square } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import css from "./EmailType.module.css";

export default function EmailType() {
  const types = [
    { icon: <BsEnvelope className={css.icon} />, text: "Email", value: "4" },
    { icon: <BsChatDots className={css.icon} />, text: "Чати", value: "6" },
    { icon: <BsClock className={css.icon} />, text: "Відкладені", value: "1" },
    {
      icon: <BsCheck2Square className={css.icon} />,
      text: "Закриті",
      value: "",
    },
    { icon: <BsBookmark className={css.icon} />, text: "Вибрані", value: "6" },
    { icon: <BsArchive className={css.icon} />, text: "Архів", value: "" },
  ];

  return (
    <div>
      <ul className={css.typeList}>
        {types.map((type, index) => (
          <li key={index} className={css.typeItem}>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
