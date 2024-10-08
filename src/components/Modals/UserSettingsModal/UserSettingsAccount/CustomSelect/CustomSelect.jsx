import { useState } from "react";
import { ErrorMessage } from "formik";
import { IoIosArrowDown } from "react-icons/io";
import css from "./CustomSelect.module.css"

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

  return (
    <div className={css.selectWrapper}>
      <div className={css.inputSelect} onClick={() => setIsOpen((prev) => !prev)}>
        <span className={`fi ${languages.find(lang => lang.value === field.value)?.flag} ${css.icon}`} />
        {languages.find(lang => lang.value === field.value)?.label}
              <IoIosArrowDown className={css.selectIcon} />
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