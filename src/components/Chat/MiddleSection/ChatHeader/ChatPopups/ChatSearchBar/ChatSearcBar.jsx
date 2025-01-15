import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { BsXCircle } from "react-icons/bs";
import styles from "./ChatSearchBar.module.css";

function ChatSearchBar({ searchData, onFilter, onReset, searchKey = "text" }) {
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

    const matchedData = searchData.filter((item) =>
      item[searchKey]?.toLowerCase().includes(userQuery)
    );

    if (matchedData.length > 0) {
      onFilter(matchedData);
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
        placeholder="Пошук у повідомленнях"
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

export default ChatSearchBar;
