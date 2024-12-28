import { useState } from "react";
import css from "./SearchByMessages.module.css";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { HiOutlineHashtag } from "react-icons/hi";

export default function SearchByMessages() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const options = [
    {
      value: "message",
      text: "Пошук по повідомленням",
      icon: <BiMessageRoundedDetail />,
    },
    { value: "teg", text: "Пошук по тегам", icon: <HiOutlineHashtag /> },
  ];

  return (
    <div>
      <div className={css.inputBox}>
        <IoIosSearch className={css.iconSearch} size={18} />
        <input
          className={css.input}
          placeholder={
            selectedOption
              ? options.find((option) => option.value === selectedOption.value)
                  ?.text
              : "Пошук по повідомленням"
          }
        />
        <IoIosArrowDown
          className={css.iconArrow}
          size={20}
          onClick={handleOpen}
        />
      </div>
      {isOpen && (
        <div className={css.optionsBox}>
          {options.map((option) => (
            <div
              key={option.value}
              className={css.option}
              onClick={() => handleOptionClick(option)}
            >
              <span className={css.icon}>{option.icon}</span>
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
