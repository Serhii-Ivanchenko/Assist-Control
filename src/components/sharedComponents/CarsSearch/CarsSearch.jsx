import clsx from "clsx";
import css from "./CarsSearch.module.css";
import { IoIosSearch, IoIosClose } from "react-icons/io";

export default function CarsSearch({ value, onChange, error, isHeader, placeholderText = "Пошук по авто" }) {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  const handleClearInput = () => {
    onChange("");
  };

  return (
    <div className={css.inputWrapper}>
      <input
        className={clsx(css.inputFilter, { [css.isHeader]: isHeader })}
        type="text"
        name="searchInput"
        id="searchInput"
        placeholder={placeholderText}
        value={value}
        onChange={handleInputChange}
      />
      <button className={css.button} type="button">
        <IoIosSearch className={css.icon} />
      </button>
      {value && (
        <button
          className={css.clearButton}
          type="button"
          onClick={handleClearInput}
        >
          <IoIosClose className={css.clearIcon} />
        </button>
      )}
      {error && <div className={css.errorMsg}>{error}</div>}
    </div>
  );
}
