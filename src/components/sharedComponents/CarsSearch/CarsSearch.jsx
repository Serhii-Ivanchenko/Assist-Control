import css from "./CarsSearch.module.css";
import { IoIosSearch } from "react-icons/io";

export default function CarsSearch({ value, onChange, error }) {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={css.inputWrapper}>
      <input
        className={css.inputFilter}
        type="text"
        name="searchInput"
        id="searchInput"
        placeholder="Пошук по авто"
        value={value}
        onChange={handleInputChange}
      />
      <button className={css.button} type="button">
        <IoIosSearch className={css.icon} />
      </button>
      {error && <div className={css.errorMsg}>{error}</div>}
    </div>
  );
}