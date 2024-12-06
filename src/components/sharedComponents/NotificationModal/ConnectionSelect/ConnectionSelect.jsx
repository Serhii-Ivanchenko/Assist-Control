import { useState } from "react";
import { ErrorMessage } from "formik";
import { BsCaretDownFill } from "react-icons/bs";
import clsx from "clsx";
import css from "./ConnectionSelect.module.css";
// import { BsFillTelephoneOutboundFill } from "react-icons/bs";
// import { BsEnvelope } from "react-icons/bs";
// import { PiTelegramLogoLight } from "react-icons/pi";
import { useRef } from "react";
import { useEffect } from "react";

// const connection = [
//   {
//     value: "call",
//     label: "Передзвонити",
//     icon: <BsFillTelephoneOutboundFill size={18} className={css.phoneIcon} />,
//   },
//   {
//     value: "email",
//     label: "Написати листа",
//     icon: <BsEnvelope size={18} className={css.envelopeIcon} />,
//   },
//   {
//     value: "tg",
//     label: "Зв'язатись в Телеграм",
//     icon: <PiTelegramLogoLight size={18} className={css.tgIcon} />,
//   },
// ];

export default function ConnectionSelect({
  field,
  form,
  options,
  showDefaultIcon,
  icon,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { name } = field;

  const handleOptionClick = (type) => {
    form.setFieldValue(name, type.value);
    setIsOpen(false);
  };

  const selectedOption =
    options.find((type) => type.value === field.value) || options[0];

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
        {showDefaultIcon ? icon : selectedOption.icon}
        {/* {selectedOption.icon} */}
        {selectedOption.label}
        <BsCaretDownFill
          className={clsx(css.selectIcon, { [css.rotated]: isOpen })}
        />
      </div>
      {isOpen && (
        <div className={css.options}>
          {options.map((type) => (
            <div
              key={type.value}
              className={css.option}
              onClick={() => handleOptionClick(type)}
            >
              {type.icon}
              {type.label}
            </div>
          ))}
        </div>
      )}
      <ErrorMessage name={name} component="span" className={css.errorMessage} />
    </div>
  );
}
