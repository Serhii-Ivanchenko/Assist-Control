import { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import styles from "./StatusFilterCars.module.css";
import renderStatus from "../../utils/renderStatus.jsx";

export default function StatusFilterCars({ onStatusChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Статус");
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log("Dropdown isOpen:", !isOpen);
  };

  const statuses = [
    { status: "all", label: "Всі авто" },
    { status: "diagnostic", label: "Діагностика" },
    { status: "repair", label: "Ремонт" },
    { status: "view_repair", label: "Огляд ПР" },
    { status: "complete", label: "Завершено" },
  ];

  const handleStatusSelect = (status) => {
    const selectedStatusObj = statuses.find((s) => s.status === status);
    if (selectedStatusObj) {
      setSelectedStatus(selectedStatusObj.label);
    }
    onStatusChange(status);
    setIsOpen(false);
  };

  
  return (
    <div className={styles.statysFilter}>
      <button className={styles.filterButton} onClick={toggleDropdown}>
      <p className={styles.statusFilterText}>{selectedStatus}</p>
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
