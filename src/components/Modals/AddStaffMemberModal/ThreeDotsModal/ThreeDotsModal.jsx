import css from "./ThreeDotsModal.module.css";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useRef } from "react";
// import { useEffect } from "react";

export default function ThreeDotsModal({
  isVisible,
  setFile,
  setFieldValue,
  fieldname,
  name,
  onClose,
}) {
  const popoverRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleChangePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const newLogoUrl = URL.createObjectURL(file);
      setFile(newLogoUrl);

      setFieldValue(fieldname, file);
    }
    onClose();
  };

  // const handleClickOutside = (event) => {
  //   if (
  //     popoverRef.current &&
  //     !popoverRef.current.contains(event.target) &&
  //     buttonRefs.every((ref) => ref.current && !ref.contains(event.target))
  //   ) {
  //     onClose();
  //   }
  // };

  // useEffect(() => {
  //   if (!isVisible) return;

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isVisible]);

  return (
    <div
      className={`${css.modal} ${isVisible ? css.popoverVisible : css.hidden}`}
      ref={popoverRef}
    >
      <a href="" download="">
        <button type="button" className={css.button}>
          {" "}
          <BsFillCloudDownloadFill className={css.icon} size={18} />
          Скачати заповнений{" "}
        </button>
      </a>

      <button type="button" className={css.button} onClick={handleChangePhoto}>
        <BsFillCloudUploadFill className={css.icon} size={18} />
        Завантажити підписаний{" "}
      </button>

      <input
        type="file"
        name={name}
        className={css.docInput}
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e, setFieldValue)}
        multiple
        // accept="image/*"
      />
    </div>
  );
}
