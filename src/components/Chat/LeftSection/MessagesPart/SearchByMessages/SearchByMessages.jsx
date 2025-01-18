import { useState } from "react";
import css from "./SearchByMessages.module.css";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { HiOutlineHashtag } from "react-icons/hi";
import { useRef, useEffect } from "react";

export default function SearchByMessages() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setInputValue("");
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const options = [
    {
      value: "message",
      text: "Пошук по повідомленням",
      icon: <BiMessageRoundedDetail />,
    },
    { value: "tag", text: "Пошук по тегам", icon: <HiOutlineHashtag /> },
  ];

  return (
    <div className={css.searchPart} ref={wrapperRef}>
      <div className={css.inputBox}>
        <IoIosSearch className={css.iconSearch} size={16} />
        <input
          className={css.input}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={
            selectedOption
              ? options.find((option) => option.value === selectedOption.value)
                  ?.text
              : "Пошук по повідомленням"
          }
        />
        <IoIosArrowDown
          className={`${css.iconArrow} ${isOpen && css.rotated}`}
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
