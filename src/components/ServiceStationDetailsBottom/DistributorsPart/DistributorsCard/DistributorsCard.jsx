import { useState } from "react";
import {
  BsCurrencyExchange,
  BsCardChecklist,
  BsCart3,
  BsInfoCircle,
  BsThreeDotsVertical,
} from "react-icons/bs";
import defaultImg from "../../../../assets/images/distrImg.png";
import styles from "./DistributorsCard.module.css";

const options = [
  { label: "Ціни", icon: <BsCurrencyExchange />, isActive: true },
  { label: "Накладні", icon: <BsCardChecklist />, isActive: true },
  { label: "Кошик", icon: <BsCart3 />, isActive: false },
];

const inputs = [
  { label: "Login", type: "text" },
  { label: "Password", type: "password" },
  { label: "Token API", type: "text" },
];

const btns = ["Зберегти", "Тест"];

function Option({ icon, label, isActive }) {
  return (
    <div className={styles.option}>
      <span className={isActive ? styles.activeIcon : styles.inactiveIcon}>
        {icon}
      </span>
      <p>{label}</p>
    </div>
  );
}

function InputField({ label, type }) {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={label}>{label}</label>
      <input id={label} type={type} />
    </div>
  );
}

function DistributorsCard() {
  const [isActive, setIsActive] = useState(false);

  const handleToggleChange = () => {
    setIsActive((prevState) => !prevState);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoContainer}>
        <div className={styles.nameBox}>
          <h2 className={styles.name}>
            Busmarket{" "}
            <span>
              <BsThreeDotsVertical />
            </span>
          </h2>
          <img className={styles.img} src={defaultImg} alt="DistributionImg" />
        </div>
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
        <div className={styles.option}>
          <BsInfoCircle />
          <p>Підключення</p>
        </div>
      </div>
      <div className={styles.authContainer}>
        <div className={styles.toggleBox}>
          <p className={styles.statusToggle}>
            {isActive ? "Активний" : "Неактивний"}
          </p>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={handleToggleChange}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.inputsWrapper}>
          {inputs.map((input, index) => (
            <InputField key={index} label={input.label} type={input.type} />
          ))}
        </div>
        <div className={styles.btnBox}>
          {btns.map((btnText, index) => (
            <button key={index} className={styles.btn}>
              {btnText}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DistributorsCard;
