import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import styles from "./SearchBar.module.css";

function SearchBar({ searchData, onFilter }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const userQuery = e.target.value.toLowerCase();
    setQuery(userQuery);

    if (userQuery === "") {
      onFilter(searchData);
      return;
    }

    const filteredData = searchData
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.item.toLowerCase().includes(userQuery)
        ),
      }))
      .filter((category) => category.items.length > 0);

    onFilter(filteredData);
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
    </div>
  );
}

export default SearchBar;
