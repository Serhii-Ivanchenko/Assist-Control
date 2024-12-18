import { GiSettingsKnobs } from "react-icons/gi";
import css from "./InfoSettingsVisibility.module.css";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

const InfoSettingsVisibility = ({ selectVisibility, toggleVisibilityAction, labelNames, className }) => {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const dispatch = useDispatch();

  const visibility = useSelector(selectVisibility);

  const toggleSettings = () => {
    setSettingsIsOpen((prev) => !prev);
  };

  const handleToggle = (key) => {
    dispatch(toggleVisibilityAction({ key }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setSettingsIsOpen(false);
      }
    };

    if (settingsIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsIsOpen]);

  return (
    <div className={css.btnSettingsContainer} ref={popoverRef}>
      <button className={css.btnSettings} onClick={toggleSettings}>
        <GiSettingsKnobs className={css.iconSettings} size={19} />
      </button>
      {settingsIsOpen && (
        <div className={clsx(css.settingsContainer, className)}>
          {Object.entries(visibility).map(([key, value]) => (
            <div className={css.switchItem} key={key}>
              <label htmlFor={key}>{labelNames[key] || key}</label>
              <label className={css.toggleSwitch}>
                <input
                  type="checkbox"
                  id={key}
                  checked={value}
                  onChange={() => handleToggle(key)}
                />
                <span className={css.slider}></span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoSettingsVisibility;
