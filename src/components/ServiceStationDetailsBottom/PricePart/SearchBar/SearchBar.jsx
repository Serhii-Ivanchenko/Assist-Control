import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { BsXCircle } from "react-icons/bs";
import styles from "./SearchBar.module.css";

function SearchBar({ searchData, onFilter, onReset }) {
  const [query, setQuery] = useState("");
  const [isBtnVisible, setIsBtnIsVisible] = useState(false);

  const handleSearch = (e) => {
    const userQuery = e.target.value.toLowerCase().trim();
    setQuery(userQuery);
    setIsBtnIsVisible(true);

    if (userQuery === "") {
      onReset();
      setIsBtnIsVisible(false);
      return;
    }

    // Фільтруємо послуги за назвою
    const filteredServices = searchData.filter((service) =>
      service.service_name.toLowerCase().includes(userQuery)
    );
    console.log("filteredServices", filteredServices);

    onFilter(filteredServices);
  };

  const handleReset = () => {
    setQuery("");
    setIsBtnIsVisible(false);
    onReset();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <IoIosSearch />
      </div>
      <input
        type="text"
        placeholder="Пошук по послугам"
        value={query}
        onChange={handleSearch}
      />
      {isBtnVisible && (
        <button onClick={handleReset}>
          <BsXCircle />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
