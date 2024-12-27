import css from "./SearchByMessages.module.css";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function SearchByMessages() {
  return (
    <div>
      <div className={css.inputBox}>
        <IoIosSearch className={css.iconSearch} size={18} />
        <input className={css.input} placeholder="Пошук по повідомленням" />
        <IoIosArrowDown className={css.iconArrow} size={20} />
      </div>
    </div>
  );
}
