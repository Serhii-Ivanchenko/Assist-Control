import { useRef, useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import styles from "./DotsPopover.module.css";

function DotsPopover({ options, isVisible, togglePopover }) {
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    // Перевірка, чи натискається за межами поповера чи кнопки
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      togglePopover(false); // Закриваємо поповер при натисканні за межами
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
      <button
        ref={buttonRef}
        className={styles.button}
        onClick={() => togglePopover(!isVisible)} // Клік по кнопці для переключення стану
      >
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
