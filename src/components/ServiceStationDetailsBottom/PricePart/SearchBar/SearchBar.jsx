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

    const matchedCategories = searchData.reduce((result, category) => {
      const matchingServices = category.items.filter((service) =>
        service.item.toLowerCase().includes(userQuery)
      );

      if (matchingServices.length > 0) {
        result.push({
          id: category.id,
          category: category.category,
          items: matchingServices,
        });
      }
      return result;
    }, []);

    if (matchedCategories.length > 0) {
      onFilter(matchedCategories);
    } else {
      // setIsBtnIsVisible(false);
      onFilter([]);
    }
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
