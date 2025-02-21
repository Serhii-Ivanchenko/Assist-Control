import { useEffect, useRef } from "react";
import css from "./OrderPopup.module.css";

export default function OrderPopup({
  onClose,
  isOpen,
  buttonRef,
  onSelect,
  arr,
}) {
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={css.popup} ref={popupRef}>
      {arr.map((item, index) => (
        <p
          key={index}
          className={`${css.text}`}
          onClick={() => {
            onSelect(item);
            onClose();
          }}
        >
          {item}
        </p>
      ))}
    </div>
  );
}
