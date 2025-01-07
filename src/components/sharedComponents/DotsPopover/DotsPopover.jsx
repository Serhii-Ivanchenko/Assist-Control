import { useState, useRef, useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import styles from "./DotsPopover.module.css";

function DotsPopover({ options }) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  const togglePopover = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <button ref={buttonRef} className={styles.button} onClick={togglePopover}>
        <IoEllipsisVertical size={13} color="#fff" />
      </button>

      {isVisible && (
        <div ref={popoverRef} className={styles.popover}>
          <ul className={styles.listBtn}>
            {options.map((option) => (
              <li
                key={`${option.label}-${option.action.name}`}
                className={styles.option}
              >
                <button
                  className={styles.editBtn}
                  onClick={option.action}
                >
                  {option.icon}
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DotsPopover;
