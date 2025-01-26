import { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import styles from "./StatusFilter.module.css";
import { StatusPopover } from "../StatusPopover/StatusPopover";

export default function StatusFilter({ statuses, onStatusChange, renderStatus, isFilter, dropdownStyle = {} }) {
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
    <div className={styles.statusFilter} ref={containerRef}>
      <button className={styles.filterButton} onClick={toggleDropdown}>
        <p className={styles.statusFilterText}>{selectedStatus}</p>
        {isOpen ? (
          <TiArrowSortedUp className={styles.icon} color="var(--icon-gray)" />
        ) : (
          <TiArrowSortedDown className={styles.icon} color="var(--icon-gray)" />
        )}
      </button>
      
      {isOpen && (
        <StatusPopover
          statuses={statuses}
          onStatusSelect={handleStatusSelect}
          renderStatus={renderStatus}
          isFilter={isFilter}
          dropdownStyle={dropdownStyle}
        />
      )}
    </div>
  );
}