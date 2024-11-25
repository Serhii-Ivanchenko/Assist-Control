import css from "./newWhpopover.module.css";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { useEffect } from "react";
import NewItemModal from "../NewItemModal/NewItemModal";
import Modal from "../../../Modals/Modal/Modal";

export default function NewWhpopover({ isVisible, onClose, buttonRef }) {
  const [saveTemplate, setSaveTemplate] = useState(false);
  const [addFromTemplate, setAddFromSaveTemplate] = useState(false);
  const popoverRef = useRef(null);

  const openSaveTempModal = () => {
    setSaveTemplate((prev) => !prev);
  };

  const openAddFromTempModal = () => {
    setAddFromSaveTemplate((prev) => !prev);
  };

  const closeSaveTempModal = () => {
    setSaveTemplate(false);
  };

  const closeAddFromTempModal = () => {
    setAddFromSaveTemplate(false);
  };

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
      <button type="button" className={css.button} onClick={openSaveTempModal}>
        {" "}
        <BsFillCloudDownloadFill className={css.icon} size={18} />
        Скачати заповнений{" "}
      </button>
      {saveTemplate && (
        <Modal isOpen={openSaveTempModal} onClose={closeSaveTempModal}>
          <NewItemModal onClose={closeSaveTempModal} />
        </Modal>
      )}

      <button type="button" className={css.button}>
        <BsFillCloudUploadFill className={css.icon} size={18} />
        Завантажити підписаний{" "}
      </button>
    </div>
  );
}
