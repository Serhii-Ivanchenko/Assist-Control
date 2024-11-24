import { useState, useRef, useEffect, memo } from "react";
import {
  BsCurrencyExchange,
  BsCardChecklist,
  BsCart3,
  BsInfoCircleFill,
  BsThreeDotsVertical,
  BsPencil,
  BsTrash,
} from "react-icons/bs";
import defaultImg from "../../../../assets/images/distrImg.png";
import Popup from "../Popup/Popup";
import styles from "./DistributorsCard.module.css";

const optionsData = [
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

const InputField = memo(
  ({ label, type }) => {
    return (
      <div className={styles.inputBox}>
        <label htmlFor={label}>{label}</label>
        <input id={label} type={type} />
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.label === nextProps.label && prevProps.type === nextProps.type
    );
  }
);

InputField.displayName = "InputField";

function DistributorsCard() {
  const [isActive, setIsActive] = useState(false);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [options, setOptions] = useState(optionsData);
  const [isConnectionInfoVisible, setIsConnectionInfoVisible] = useState(false);
  const popupRef = useRef(null);

  const handleToggleChange = () => {
    setIsActive((prevState) => !prevState);
  };

  const handlePopupToggle = () => {
    setIsPopupActive((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOptionActive = (index) => {
    setOptions((prevOptions) =>
      prevOptions.map((option, idx) =>
        idx === index ? { ...option, isActive: !option.isActive } : option
      )
    );
  };

  const handleConnectionClick = () => {
    setIsConnectionInfoVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoContainer}>
        <div className={styles.nameBox} ref={popupRef}>
          <h2 className={styles.name}>
            Busmarket{" "}
            <BsThreeDotsVertical
              className={styles.popupIcon}
              onClick={handlePopupToggle}
            />
          </h2>
          <img className={styles.img} src={defaultImg} alt="DistributionImg" />
        </div>
        <Popup isOpen={isPopupActive}>
          <ul className={styles.popup}>
            <li>
              <button className={styles.editBtn}>
                <BsPencil /> Редагувати
              </button>
            </li>
            <li>
              <button className={styles.deleteBtn}>
                <BsTrash /> Видалити
              </button>
            </li>
          </ul>
        </Popup>

        <div className={styles.optionsBox}>
          {options.map((option, index) => (
            <Option
              key={index}
              icon={option.icon}
              label={option.label}
              isActive={option.isActive}
              onClick={() => toggleOptionActive(index)}
            />
          ))}
        </div>
        <div className={styles.connect} onClick={handleConnectionClick}>
          <BsInfoCircleFill className={styles.connectIcon} />
          <p className={styles.connectText}>Підключення</p>
        </div>

        {isConnectionInfoVisible && (
          <p className={styles.connectDesc}>
            Для активації доступу введіть логін і пароль від сайту...
          </p>
        )}
      </div>
      <div className={styles.authContainer}>
        <div className={styles.authBox}>
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
    </div>
  );
}

export default DistributorsCard;
