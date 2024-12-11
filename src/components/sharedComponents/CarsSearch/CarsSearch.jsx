import { useEffect, useState } from "react";
import css from "./CarsSearch.module.css";
import { IoIosSearch } from "react-icons/io";

export default function CarsSearch({ carsData, onFilter, onNoResults }) {
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

    const resultNotFound = filteredCars.length === 0 && searchTerm !== "";
    onNoResults(resultNotFound);

    if (filteredCars.length !== carsData.length) {
      onFilter(filteredCars);
    }
  }, [searchTerm, carsData, onFilter, onNoResults]);

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
      {inputError && <div className={css.errorMsg}>{inputError}</div>}
    </div>
  );
}
