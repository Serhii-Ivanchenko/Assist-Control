// import { useState } from "react";
import css from "./ActionsPart.module.css";
import { BsCheck } from "react-icons/bs";
import { BsArrowDownUp } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { BsTag } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { BsCheck2Square } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const quickActions = [
  { icon: <BsArchive />, name: "Додати в архів" },
  { icon: <BsBookmark />, name: "Додати в обрані" },
  { icon: <GrUserManager />, name: "Передати іншому менеджеру" },
  { icon: <BsCheck2Square />, name: "Закрити чат" },
  { icon: <BsClock />, name: "Додати у відкладені" },
];

export default function ActionsPart({
  isChecked,
  handleChecked,
  allChecked,
  handleAllChecked,
  // chats,
  handleSort,
}) {
  const [openedActions, setOpenedActions] = useState(false);

  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpenedActions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={css.actions}>
      {isChecked && (
        <label className={css.newLabel}>
          <input
            type="checkbox"
            name="chooseAll"
            id="chooseAll"
            className={css.checkbox}
            checked={allChecked.every((item) => item)}
            onChange={handleAllChecked}
          />
          <span className={css.cbMark}>
            <BsCheck size={16} className={css.cbIcon} />
          </span>
        </label>
      )}
      <label className={css.label}>
        <input
          type="checkbox"
          name="actions"
          id="actions"
          className={css.checkbox}
          checked={isChecked}
          onChange={handleChecked}
        />
        <span className={`${css.cbMark} ${isChecked && css.cbMarkIsChecked}`}>
          <BsCheck size={16} className={css.cbIcon} />
        </span>
      </label>

      {!isChecked ? (
        <p className={css.text}> Дії</p>
      ) : (
        <div className={css.actionsChecked}>
          <div className={css.select}>
            <BsTag size={16} className={css.icon} />
            <p className={css.actionsText}>Тег</p>
            <BsFillCaretDownFill size={16} className={css.icon} />
          </div>

          <div className={css.quickActionsBox} ref={wrapperRef}>
            <div
              className={css.select}
              onClick={() => setOpenedActions(!openedActions)}
            >
              <BsThreeDots size={16} className={css.icon} />
              <p className={css.actionsText}>Швидкі дії</p>
              <BsFillCaretDownFill size={16} className={css.icon} />
            </div>
            {openedActions && (
              <ul className={css.actionsList}>
                {quickActions.map((action, index) => (
                  <li
                    key={index}
                    className={css.actionsItem}
                    onClick={() => setOpenedActions(false)}
                  >
                    {action.icon}
                    <p>{action.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className={css.filter} onClick={handleSort}>
        <BsArrowDownUp size={18} className={css.icon} />
        <p className={css.text}>Нові</p>
        <IoIosArrowDown size={20} className={css.icon} />
      </div>
    </div>
  );
}
