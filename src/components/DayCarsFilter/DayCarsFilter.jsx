import { useEffect, useState } from "react";
import css from "./DayCarsFilter.module.css";
import { IoIosSearch } from "react-icons/io";

export default function DayCarsFilter({ carsData, onFilter, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputError, setInputError] = useState("");

  const handleInputChange = (event) => {
    const term = event.target.value;

    if (/^[a-zA-Z0-9]*$/.test(term)) {
      setSearchTerm(term);
      setInputError("");
    } else {
      setInputError("Вводьте лише латинські літери та цифри");
    }
  };

  useEffect(() => {
    const filteredCars = carsData.filter((car) => {
      const { plate, auto } = car;
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        (plate?.toLowerCase()?.includes(lowerCaseSearchTerm) || false) ||
        (auto?.toLowerCase()?.includes(lowerCaseSearchTerm) || false)
      );
    });
  
    onFilter(filteredCars);
  }, [searchTerm, carsData, onFilter]);
  
  return (
    <div className={css.inputWrapper}>
      <input
        className={css.inputFilter}
        type="text"
        name="searchInput"
        id="searchInput"
        placeholder="Пошук по авто"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className={css.button} type="button">
        <IoIosSearch className={css.icon} />
      </button>
      {(inputError || error) && (
        <div className={css.errorMsg}>{inputError || error}</div>
      )}
    </div>
  );
}
