import css from "./newWhpopover.module.css";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useRef } from "react";
import { useEffect } from "react";

export default function NewWhpopover({ isVisible, onClose, buttonRef }) {
  const popoverRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
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
      <button type="button" className={css.button}>
        {" "}
        <BsFillCloudDownloadFill className={css.icon} size={18} />
        Зберегти у шаблон{" "}
      </button>

      <button type="button" className={css.button}>
        <BsFillCloudUploadFill className={css.icon} size={18} />
        Завантажити з шаблону{" "}
      </button>
    </div>
  );
}
