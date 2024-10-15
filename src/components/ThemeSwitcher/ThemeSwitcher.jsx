import css from "./ThemeSwitcher.module.css";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";

export default function ThemeSwitcher() {
  return (
    <div className={css.tooltip}>
      <label className={css.switch}>
        <FiSun className={css.sun} />
        <FiMoon className={css.moon} />
        <input type="checkbox" className={css.input} />
        <span className={css.slider}></span>
      </label>
      <span className={css.tooltipContent}>Вибір теми</span>
    </div>
  );
}
