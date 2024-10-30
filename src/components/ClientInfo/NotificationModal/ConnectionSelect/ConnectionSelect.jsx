import { useState } from "react";
import { ErrorMessage } from "formik";
import { BsCaretDownFill } from "react-icons/bs";
import clsx from "clsx";
import css from "./ConnectionSelect.module.css"
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { BsFillPenFill } from "react-icons/bs";



const connection = [
    { value: "call", label: "Передзвонити", icon: <BsFillTelephoneOutboundFill size={18} className={css.phoneIcon } />},
  { value: "message", label: "Повідомлення", icon:<BsFillPenFill size={18} className={css.penIcon }/> },
];

export default function ConnectionSelect({ field, form }) {
  const [isOpen, setIsOpen] = useState(false);
  const { name } = field;

  const handleOptionClick = (type) => {
    form.setFieldValue(name, type.value);
    setIsOpen(false);
    };
    
     const selectedOption = connection.find(type => type.value === field.value) || connection[0];

  return (
    <div className={css.selectWrapper}>
      <div className={css.connectionSelect} onClick={() => setIsOpen((prev) => !prev)}>
               {selectedOption.icon }
       {selectedOption.label}
              <BsCaretDownFill className={clsx(css.selectIcon, { [css.rotated]: isOpen })} />
      </div>
      {isOpen && (
        <div className={css.options}>
          {connection.map((type) => (
            <div
              key={type.value}
              className={css.option}
              onClick={() => handleOptionClick(type)}
            >
              {type.icon }
              {type.label}
            </div>
          ))}
        </div>
      )}
      <ErrorMessage name={name} component="span" className={css.errorMessage} />
    </div>
  );
}