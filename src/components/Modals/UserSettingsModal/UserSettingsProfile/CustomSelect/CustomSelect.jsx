import { useState } from "react";
import { ErrorMessage } from "formik";
import { BsFillCaretDownFill } from "react-icons/bs";
// import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import css from "./CustomSelect.module.css";
import { useRef } from "react";
import { useEffect } from "react";

const languages = [
  { value: "ukr", label: "Українська", flag: "fi-ua" },
  { value: "eng", label: "English", flag: "fi-gb" },
];

export default function CustomSelect({ field, form }) {
  const [isOpen, setIsOpen] = useState(false);
  const { name } = field;

  const handleOptionClick = (lang) => {
    form.setFieldValue(name, lang.value);
    setIsOpen(false);
  };

  // const handleBlur = (event) => {
  //   if (!event.currentTarget.contains(event.relatedTarget)) {
  //     setIsOpen(false);
  //   }
  // };

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
            languages.find((lang) => lang.value === field.value)?.flag
          } ${css.icon}`}
        />
        {languages.find((lang) => lang.value === field.value)?.label}
        <BsFillCaretDownFill
          className={clsx(css.selectIcon, { [css.rotated]: isOpen })}
        />
      </div>
      {isOpen && (
        <div className={css.options}>
          {languages.map((lang) => (
            <div
              key={lang.value}
              className={css.option}
              onClick={() => handleOptionClick(lang)}
            >
              <span className={`fi ${lang.flag} ${css.icon}`} />
              {lang.label}
            </div>
          ))}
        </div>
      )}
      <ErrorMessage name={name} component="span" className={css.errorMessage} />
    </div>
  );
}
