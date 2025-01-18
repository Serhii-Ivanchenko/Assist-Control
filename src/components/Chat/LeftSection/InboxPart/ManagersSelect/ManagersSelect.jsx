import { useState } from "react";
// import { ErrorMessage } from "formik";
// import { BsCaretDownFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import { useRef } from "react";
import { useEffect } from "react";
import css from "./ManagersSelect.module.css";

const emails = [
  { value: "lisa", label: "lisa@avtoatmosfera.com" },
  { value: "kate", label: "kate@avtoatmosfera.com" },
  { value: "sasha", label: "sasha@avtoatmosfera.com" },
];

export default function ManagersSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleOptionClick = (email) => {
    setSelectedValue(email);
    setIsOpen(false);
  };

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
    <div className={css.selectWrapper} ref={wrapperRef}>
      <div
        className={css.connectionSelect}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className={css.selectedValue}>
          {" "}
          {selectedValue ? selectedValue.label : "lisa@avtoatmosfera.com"}
        </p>

        <IoIosArrowDown
          className={clsx(css.selectIcon, { [css.rotated]: isOpen })}
        />
      </div>
      {isOpen && (
        <div className={css.options}>
          {emails.map((email) => (
            <div
              key={email.value}
              className={css.option}
              onClick={() => handleOptionClick(email)}
            >
              {email.label}
            </div>
          ))}
        </div>
      )}
      {/* <ErrorMessage name={name} component="span" className={css.errorMessage} /> */}
    </div>
  );
}
