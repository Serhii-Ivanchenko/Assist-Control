import { useEffect, useRef } from "react";
import css from "./ComOfferPopup.module.css";

export default function ComOfferPopup({
  onClose,
  setApproval,
  isOpen,
  buttonRef,
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

  return (
    <div className={css.popup} ref={popupRef}>
      <p
        className={`${css.text} ${css.border}`}
        onClick={() => {
          setApproval("Особисте підтвердження");
          onClose();
        }}
      >
        Особисте підтвердження
      </p>
      <p
        className={`${css.text} ${css.border}`}
        onClick={() => {
          setApproval("Додаток");
          onClose();
        }}
      >
        Додаток
      </p>
      <p
        className={css.text}
        onClick={() => {
          setApproval("Месенджер");
          onClose();
        }}
      >
        Месенджер(чат)
      </p>
    </div>
  );
}
