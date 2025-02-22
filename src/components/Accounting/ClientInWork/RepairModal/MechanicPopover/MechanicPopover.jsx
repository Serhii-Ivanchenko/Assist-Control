import { useEffect, useRef } from "react";
import { useTransition, animated } from "@react-spring/web";
import css from "./MechanicPopover.module.css";

const MechanicPopover = ({ isOpen, staffs, onStaffSelect, onClose }) => {
  const popoverRef = useRef(null);

  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: "translateY(-20px)"},
    enter: { opacity: 1, transform: "translateY(0px)"},
    leave: { opacity: 0, transform: "translateY(-20px)", },
    config: { tension: 150, friction: 20, duration: 120 },
  });

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

  return transitions(
    (styles, item) =>
      item && (
        <animated.div style={styles} className={css.staffModal} ref={popoverRef}>
          <ul>
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
        </animated.div>
      )
  );
};

export default MechanicPopover;
