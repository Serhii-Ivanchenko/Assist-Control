import css from "./CreateWarehousePop.module.css";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { useEffect } from "react";
import NewItemModal from "../NewItemModal/NewItemModal";
import Modal from "../../../Modals/Modal/Modal";
import NewItemSelectModal from "../NewItemSelectModal/NewItemSelectModal";

export default function CreateWarehousePop({ isVisible, onClose, buttonRef }) {
  const [saveTemplate, setSaveTemplate] = useState(false);
  const [addFromTemplate, setAddFromSaveTemplate] = useState(false);
  const popoverRef = useRef(null);

  const openSaveTempModal = () => {
    setSaveTemplate(true);
  };

  const openAddFromTempModal = () => {
    setAddFromSaveTemplate(true);
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
        Зберегти у шаблон{" "}
      </button>
      {saveTemplate && (
        <Modal isOpen={openSaveTempModal} onClose={closeSaveTempModal}>
          <NewItemModal onClose={closeSaveTempModal} />
        </Modal>
      )}

      <button
        type="button"
        className={css.button}
        onClick={openAddFromTempModal}
      >
        <BsFillCloudUploadFill className={css.icon} size={18} />
        Завантажити з шаблону{" "}
      </button>
      {addFromTemplate && (
        <Modal isOpen={openAddFromTempModal} onClose={closeAddFromTempModal}>
          <NewItemSelectModal onClose={closeAddFromTempModal} />
        </Modal>
      )}
    </div>
  );
}
