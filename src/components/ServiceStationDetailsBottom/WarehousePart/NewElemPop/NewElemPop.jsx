import { BsPencil, BsTrash } from "react-icons/bs";
import css from "./NewElemPop.module.css";
import { useRef } from "react";
import { useEffect } from "react";

export default function NewElemPop({
  icon,
  addText,
  buttonRefs,
  onClose,
  isVisible,
}) {
  const popoverRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      buttonRefs.every((ref) => ref.current && !ref.contains(event.target))
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isVisible) return;

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div
      className={`${css.modal} ${isVisible ? css.popoverVisible : css.hidden}`}
      ref={popoverRef}
    >
      <button type="button" className={css.btn}>
        {icon}
        {addText}
      </button>
      <button type="button" className={css.btn}>
        <BsPencil />
        Редагувати
      </button>
      <button type="button" className={css.btn}>
        <BsTrash />
        Видалити
      </button>
    </div>
  );
}
