import { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import styles from "./StatusFilterCars.module.css";

export default function StatusFilterCars({ statuses, onStatusChange, renderStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Статус");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleStatusSelect = (status) => {
    const selectedStatusObj = statuses.find((s) => s.status === status);
    if (selectedStatusObj) {
      setSelectedStatus(selectedStatusObj.label);
    }
    onStatusChange(status);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.statusFilter}>
      <button className={styles.filterButton} onClick={toggleDropdown}>
        <p className={styles.statusFilterText}>{selectedStatus}</p>
        {isOpen ? (
          <TiArrowSortedUp className={styles.icon} color="var(--icon-gray)" />
        ) : (
          <TiArrowSortedDown className={styles.icon} color="var(--icon-gray)" />
        )}
      </button>
      {isOpen && (
        <ul className={styles.dropdownList} ref={dropdownRef}>
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
