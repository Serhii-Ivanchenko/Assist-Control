import css from "./ThreeDotsModal.module.css";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useRef } from "react";
import { useEffect } from "react";

export default function ThreeDotsModal({ isVisible, onClose, buttonRefs }) {
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
      <button type="button" className={css.button}>
        {" "}
        <BsFillCloudDownloadFill className={css.icon} size={18} />
        Скачати заповнений{" "}
      </button>

      <a href="" download="">
        <button type="button" className={css.button}>
          <BsFillCloudUploadFill className={css.icon} size={18} />
          Завантажити підписаний{" "}
        </button>
      </a>
    </div>
  );
}
