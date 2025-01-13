import { useRef, useEffect, useCallback } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./ServiceReasonPopover.module.css";
import { useSelector } from "react-redux";
import { selectArchiveData } from "../../../../redux/archive/selectors";

const ServiceReasonPopover = ({ visible, togglePopover, id }) => {
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);
  const carsDataArchive = useSelector(selectArchiveData);
  const serviceItem = carsDataArchive.find((item) => item.id === id);
  const noteText = serviceItem?.note || "Відсутні дані про запис на сервіс";

  const handleClickOutside = useCallback((event) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      togglePopover("popover1", id);
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
      <button
        ref={buttonRef}
        onClick={() => togglePopover("popover1", id)}
        className={styles.toggleButton}
      >
        {visible ? <FaChevronUp size={13} color="#fff" /> : <FaChevronDown size={13} color="#fff" />}
      </button>
      <p className={styles.reasonText}>Причина запису на автосервіс</p>

      {visible && (
        <div className={styles.popover}>
          <p className={styles.reasonText}>{noteText}</p>
        </div>
      )}
    </div>
  );
};

export default ServiceReasonPopover;
