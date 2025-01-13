import { useRef, useEffect, useCallback } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "./ArchiveReasonPopover.module.css";
import { useSelector } from "react-redux";
import { selectArchiveData } from "../../../../redux/archive/selectors";

const ArchiveReasonPopover = ({ visible, togglePopover, id }) => {
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);
  const carsDataArchive = useSelector(selectArchiveData);
  const archiveItem = carsDataArchive.find((item) => item.id === id);
  const commentText = archiveItem?.comment || "Відсутні дані про запис в архів";

  const handleClickOutside = useCallback((event) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      togglePopover("popover2", id);
    }
  }, [togglePopover, id]);

  useEffect(() => {
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, handleClickOutside]);

  return (
    <div ref={popoverRef} className={`${styles.reasonWhy} ${visible ? styles.active : ""}`}>
      <IoIosCloseCircle color="var(--red)" />
      <button
        ref={buttonRef}
        onClick={() => togglePopover("popover2", id)}
        className={styles.toggleButton}
      >
        {visible ? <FaChevronUp size={13} color="#fff" /> : <FaChevronDown size={13} color="#fff" />}
      </button>
      <p className={styles.reasonText}>Причина додавання в архів</p>

      {visible && (
        <div className={styles.popover}>
          <p className={styles.reasonText}>{commentText}</p>
        </div>
      )}
    </div>
  );
};

export default ArchiveReasonPopover;
