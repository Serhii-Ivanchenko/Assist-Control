import css from "./DayCarsFilter.module.css";
import { IoIosSearch } from "react-icons/io";

export default function DayCarsFilter({ value, onChange, error }) {
  const handleInputChange = (event) => {
    onChange(event.target.value); // Передаємо введене значення в батьківський компонент
  };

  return (
    <div className={css.inputWrapper}>
      <input
        className={css.inputFilter}
        type="text"
        name="searchInput"
        id="searchInput"
        placeholder="Пошук по авто"
        value={value} // Встановлюємо значення input
        onChange={handleInputChange} // Викликаємо handleInputChange при зміні
      />
      <button className={css.button} type="button">
        <IoIosSearch className={css.icon} />
      </button>
      {error && <div className={css.errorMsg}>{error}</div>}
    </div>
  );
}
