import css from "./ThreeDotsModal.module.css";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { BsFillCloudUploadFill } from "react-icons/bs";

export default function ThreeDotsModal() {
  return (
    <div className={css.modal}>
      <button type="button" className={css.button}>
        {" "}
        <BsFillCloudDownloadFill className={css.icon} size={18} />
        Скачати заповнений{" "}
      </button>
      <button type="button" className={css.button}>
        <BsFillCloudUploadFill className={css.icon} size={18} />
        Завантажити підписаний{" "}
      </button>
    </div>
  );
}
