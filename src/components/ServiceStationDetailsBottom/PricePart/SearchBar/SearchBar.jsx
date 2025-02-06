import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { BsXCircle } from "react-icons/bs";
import styles from "./SearchBar.module.css";

function SearchBar({ searchData, onFilter, onReset }) {
  const [query, setQuery] = useState("");
  const [isBtnVisible, setIsBtnIsVisible] = useState(false);

  // const handleSearch = (e) => {
  //   const userQuery = e.target.value.toLowerCase().trim();
  //   setQuery(userQuery);
  //   setIsBtnIsVisible(true);

  //   if (userQuery === "") {
  //     onReset();
  //     setIsBtnIsVisible(false);
  //     return;
  //   }

  //   // Фільтруємо послуги за назвою
  //   const filteredServices = searchData.filter((service) =>
  //     service.service_name.toLowerCase().includes(userQuery)
  //   );
  //   console.log("filteredServices", filteredServices);

  //   onFilter(filteredServices);
  // };

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
      const matchingServices = category.services.filter((service) =>
        service.service_name.toLowerCase().includes(userQuery)
      );

      if (matchingServices.length > 0) {
        result.push({
          category_id: category.category_id,
          category_name: category.category_name,
          services: matchingServices,
        });
      }
      return result;
    }, []);

    if (matchedCategories.length > 0) {
      onFilter(matchedCategories);
    } else {
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
