import { useState } from "react";
import { ErrorMessage } from "formik";
import { BsFillCaretDownFill } from "react-icons/bs";
// import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import css from "./CurrencySelect.module.css";
import { useRef } from "react";
import { useEffect } from "react";

const currency = [
  { value: "UAH", label: "UAH ₴", flag: "fi-ua" },
  { value: "USD", label: "USD $", flag: "fi-us" },
  { value: "EUR", label: "EUR €", flag: "fi-eu" },
];

export default function CurrencySelect({ field, form }) {
  const [isOpen, setIsOpen] = useState(false);
  const { name } = field;

  const handleOptionClick = (lang) => {
    form.setFieldValue(name, lang.value);
    setIsOpen(false);
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

  return (
    <div className={css.selectWrapper} ref={wrapperRef}>
      <div
        className={css.inputSelect}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={`fi ${
            currency.find((curr) => curr.value === field.value)?.flag
          } ${css.icon}`}
        />
        {currency.find((curr) => curr.value === field.value)?.label}
        <BsFillCaretDownFill
          className={clsx(css.selectIcon, { [css.rotated]: isOpen })}
        />
      </div>
      {isOpen && (
        <div className={css.options}>
          {currency.map((curr) => (
            <div
              key={curr.value}
              className={css.option}
              onClick={() => handleOptionClick(curr)}
            >
              <span className={`fi ${curr.flag} ${css.icon}`} />
              {curr.label}
            </div>
          ))}
        </div>
      )}
      <ErrorMessage name={name} component="span" className={css.errorMessage} />
    </div>
  );
}
