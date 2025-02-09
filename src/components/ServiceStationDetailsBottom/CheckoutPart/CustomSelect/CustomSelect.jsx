import { useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import clsx from "clsx";
import { useRef } from "react";
import { useEffect } from "react";
import css from "./CustomSelect.module.css";

export default function CustomSelect({
  options,
  chosenOption,
  width,
  selectedValue,
  setSelectedValue,
}) {
  const [isOpen, setIsOpen] = useState(false);
  //   const [selectedValue, setSelectedValue] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (chosenOption) {
      setSelectedValue("");
    }
  }, [chosenOption, setSelectedValue]);

  //   const selectedOption =
  //     options.find((type) => type.value === field.value) || options[0];

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
  return (
    <div className={`${css.selectWrapper} ${width}`} ref={wrapperRef}>
      <div
        className={css.connectionSelect}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className={css.selectedValue}>
          {" "}
          {selectedValue ? selectedValue.label : chosenOption}
        </p>

        <BsFillCaretDownFill
          className={clsx(css.selectIcon, { [css.rotated]: isOpen })}
        />
      </div>
      {isOpen && (
        <div className={css.options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={css.option}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
