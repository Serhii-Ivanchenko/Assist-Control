import { useRef, useEffect, useCallback } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { FaRedoAlt } from "react-icons/fa";
import styles from "./DotsPopover.module.css";

function DotsPopover({ isVisible, togglePopover, onRestore, onEdit }) {
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      togglePopover(false);
    }
  }, [togglePopover]);

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, handleClickOutside]);

  const handleEdit = () => {
    togglePopover(false);
    onEdit();
    console.log("Редагувати контакт");
  };

  const handleRestore = () => {
    togglePopover(false);
    onRestore();
  };
  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        className={styles.button}
        onClick={() => togglePopover(!isVisible)}
      >
        <IoEllipsisVertical size={13} color="#fff" />
      </button>

      {isVisible && (
        <div ref={popoverRef} className={styles.popover}>
          <ul className={styles.listBtn}>
            <li className={styles.option}>
              <button className={styles.editBtn} onClick={handleEdit}>
                <BsPencil size={14} />
                Редагувати
              </button>
            </li>
            <li className={styles.option}>
              <button className={styles.editBtn} onClick={handleRestore}>
                <FaRedoAlt size={14} />
                Відновити
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DotsPopover;
