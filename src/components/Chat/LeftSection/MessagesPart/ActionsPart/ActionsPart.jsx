import { useState } from "react";
import css from "./ActionsPart.module.css";
import { BsCheck } from "react-icons/bs";
import { BsArrowDownUp } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { BsTag } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";

export default function ActionsPart() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className={css.actions}>
      {isChecked && (
        <label className={css.newLabel}>
          <input
            type="checkbox"
            name="chooseAll"
            id="chooseAll"
            className={css.checkbox}
            // checked={isChecked}
            // onChange={handleChecked}
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

          <div className={css.select}>
            <BsThreeDots size={16} className={css.icon} />
            <p className={css.actionsText}>Швидкі дії</p>
            <BsFillCaretDownFill size={16} className={css.icon} />
          </div>
        </div>
      )}

      <div className={css.filter}>
        <BsArrowDownUp size={18} className={css.icon} />
        <p className={css.text}>Нові</p>
        <IoIosArrowDown size={20} className={css.icon} />
      </div>
    </div>
  );
}
