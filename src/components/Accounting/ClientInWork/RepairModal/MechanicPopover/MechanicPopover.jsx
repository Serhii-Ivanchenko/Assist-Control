import { useEffect, useRef } from "react";
import css from "./MechanicPopover.module.css";

const MechanicPopover = ({ isOpen, staffs, onStaffSelect, onClose }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.popover} ref={popoverRef}>
      <ul className={css.staffModal}>
        {staffs.map((item) => (
          <li
            key={item.id}
            className={css.modalItemStaff}
            onClick={(e) => {
              e.stopPropagation();
              onStaffSelect(item);
            }}
          >
            <div className={css.modalStaffBox}>
              <div className={css.staffName}>{item.name}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MechanicPopover;
