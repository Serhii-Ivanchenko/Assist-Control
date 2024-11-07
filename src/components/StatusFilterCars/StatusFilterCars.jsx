import { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import styles from "./StatusFilterCars.module.css";
import renderStatus from "../../utils/renderStatus.jsx";

export default function StatusFilterCars({ onStatusChange }) {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log("Dropdown isOpen:", !isOpen);
  };

  const statuses = [
    { status: "all", label: "всі авто" },
    { status: "diagnostic", label: "діагностика" },
    { status: "repair", label: "земонт" },
    { status: "view_repair", label: "огляд пр" },
    { status: "complete", label: "завершено" },
  ];

  const handleStatusSelect = (status) => {
    onStatusChange(status); // Оновлюємо статус в батьківському компоненті
    setIsOpen(false); // Закриваємо випадаючий список
  };

  return (
    <div className={styles.statysFilter}>
      <button className={styles.filterButton} onClick={toggleDropdown}>
        <p className={styles.statusFilterText}>Статус</p>
        {isOpen ? (
          <TiArrowSortedUp size={20} color="var(--icon-gray)" />
        ) : (
          <TiArrowSortedDown size={20} color="var(--icon-gray)" />
        )}
      </button>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {statuses.map(({ status }) => (
            <li key={status} onClick={() => handleStatusSelect(status)}>
              {renderStatus(status, false, styles)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
