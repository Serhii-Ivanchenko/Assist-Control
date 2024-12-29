import { BsEnvelope } from "react-icons/bs";
import { BsChatDots } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { BsCheck2Square } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import css from "./EmailType.module.css";

export default function EmailType() {
  const types = [
    { icon: <BsEnvelope />, text: "Email", value: "4" },
    { icon: <BsChatDots />, text: "Чати", value: "6" },
    { icon: <BsClock />, text: "Відложені", value: "1" },
    { icon: <BsCheck2Square />, text: "Закриті", value: "" },
    { icon: <BsBookmark />, text: "Вибрані", value: "6" },
    { icon: <BsArchive />, text: "Архів", value: "" },
  ];

  return (
    <div>
      <ul className={css.typeList}>
        {types.map((type, index) => (
          <li key={index} className={css.typeItem}>
            <div className={css.iconTextBox}>
              {type.icon}
              <p>{type.text}</p>
            </div>
            <span
              className={`${css.numberBox} ${
                (type.value === "" || type.value === null) &&
                css.numberBoxHidden
              }`}
            >
              <p>{type.value}</p>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
