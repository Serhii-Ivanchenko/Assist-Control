import { useState } from "react";
import { ErrorMessage } from "formik";
import { BsFillCaretDownFill } from "react-icons/bs";
// import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import css from "./Select.module.css";
import { useRef } from "react";
import { useEffect } from "react";

export default function Select({ field, form, array }) {
  const [isOpen, setIsOpen] = useState(false);
  const { name } = field;

  const handleOptionClick = (option) => {
    form.setFieldValue(name, option.value);
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
        {array.find((option) => option.value === field.value)?.label}
        <BsFillCaretDownFill
          className={clsx(css.selectIcon, { [css.rotated]: isOpen })}
        />
      </div>
      {isOpen && (
        <div className={css.options}>
          {array.map((option) => (
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
      <ErrorMessage name={name} component="span" className={css.errorMessage} />
    </div>
  );
}
