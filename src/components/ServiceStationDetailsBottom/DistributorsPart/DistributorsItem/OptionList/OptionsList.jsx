import { useState } from "react";
import Option from "./Option";
import { BsCurrencyExchange, BsCardChecklist, BsCart3 } from "react-icons/bs";
import styles from "./OptionList.module.css";

const initialOptions = [
  { label: "Ціни", icon: <BsCurrencyExchange />, isActive: true },
  { label: "Накладні", icon: <BsCardChecklist />, isActive: true },
  { label: "Кошик", icon: <BsCart3 />, isActive: false },
];

function OptionList() {
  const [options] = useState(initialOptions);

  return (
    <div className={styles.optionsBox}>
      {options.map((option, index) => (
        <Option
          key={index}
          icon={option.icon}
          label={option.label}
          isActive={option.isActive}
        />
      ))}
    </div>
  );
}

export default OptionList;
