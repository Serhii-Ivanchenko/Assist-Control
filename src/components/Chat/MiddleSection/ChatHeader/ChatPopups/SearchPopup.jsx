import ChatSearchBar from "./ChatSearchBar/ChatSearcBar";
import styles from "./ChatPopups.module.css";

function SearchPopup({ searchData, handleFilter, handleReset }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.phonePopup}>
        <ChatSearchBar
          searchData={searchData}
          onFilter={handleFilter}
          onReset={handleReset}
          searchKey="text"
        />
      </div>
    </div>
  );
}

export default SearchPopup;
