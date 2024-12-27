import { useState } from "react";
import css from "./SearchByMessages.module.css";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function SearchByMessages() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const options = [
    { value: "message", text: "Пошук по повідомленням" },
    { value: "teg", text: "Пошук по тегам" },
  ];

  return (
    <div>
      <div className={css.inputBox}>
        <IoIosSearch className={css.iconSearch} size={18} />
        <input className={css.input} placeholder="Пошук по повідомленням" />
        <IoIosArrowDown
          className={css.iconArrow}
          size={20}
          onClick={handleOpen}
        />
      </div>
      {isOpen && (
        <div>
          {options.map((option) => (
            <div
              key={option.value}
              className={css.option}
              // onClick={() => handleOptionClick(lang)}
            >
              <span className={css.icon} />
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
