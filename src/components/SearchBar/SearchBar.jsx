import css from './SearchBar.module.css';
import { IoIosSearch } from "react-icons/io";

export default function SearchBar() {
  return (
    <div className={css.inputWrapper}>
      <input
        className={css.input}
        type="text"
        name="searchInput"
        id="searchInput"
        placeholder="Пошук по авто"
      />
      <button className={css.button} type="button">
        <IoIosSearch className={css.icon} />
      </button>
    </div>
  );
}
