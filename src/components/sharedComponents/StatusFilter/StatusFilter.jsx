import { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import styles from "./StatusFilter.module.css";

export default function StatusFilter({
  statuses,
  onStatusChange,
  renderStatus,
  isFilter,
  dropdownStyle = {}, 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Статус");
  const containerRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
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
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.statusFilter} ref={containerRef} onClick={toggleDropdown} >
      <button className={styles.filterButton}>
        <p className={styles.statusFilterText}>{selectedStatus}</p>
        {isOpen ? (
          <TiArrowSortedUp className={styles.icon} color="var(--icon-gray)" />
        ) : (
          <TiArrowSortedDown className={styles.icon} color="var(--icon-gray)" />
        )}
      </button>
      {isOpen && (
  <ul className={styles.dropdownList} style={dropdownStyle}>
    {statuses.map(({ status }) => (
      <li key={status} onClick={(e) => { 
        e.stopPropagation(); 
        handleStatusSelect(status); 
      }}>
        <div className={styles.statusItemContainer}>
          {renderStatus(status, false, styles, isFilter)}
        </div>
      </li>
    ))}
  </ul>
)}

    </div>
  );
}
