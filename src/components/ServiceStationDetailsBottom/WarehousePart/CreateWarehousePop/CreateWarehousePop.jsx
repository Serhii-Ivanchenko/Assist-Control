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

  const openSaveTempModal = () => setSaveTemplate(true);
  const closeSaveTempModal = () => setSaveTemplate(false);
  const openAddFromTempModal = () => setAddFromSaveTemplate(true);
  const closeAddFromTempModal = () => setAddFromSaveTemplate(false);

  const handleSaveClick = () => {
    openSaveTempModal();
    onClose();
  };

  const handleAddClick = () => {
    openAddFromTempModal();
    onClose();
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
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div
      className={`${css.modal} ${isVisible ? css.popoverVisible : css.hidden}`}
      ref={popoverRef}
    >
      <button type="button" className={css.button} onClick={handleSaveClick}>
        {" "}
        <BsFillCloudDownloadFill className={css.icon} size={18} />
        Зберегти у шаблон{" "}
      </button>
      {saveTemplate && (
        <Modal isOpen={saveTemplate} onClose={closeSaveTempModal}>
          <NewItemModal
            onClose={closeSaveTempModal}
            title="Введіть назву шаблона"
            name="newTemplate"
          />
        </Modal>
      )}

      <button type="button" className={css.button} onClick={handleAddClick}>
        <BsFillCloudUploadFill className={css.icon} size={18} />
        Завантажити з шаблону{" "}
      </button>
      {addFromTemplate && (
        <Modal isOpen={addFromTemplate} onClose={closeAddFromTempModal}>
          <NewItemSelectModal onClose={closeAddFromTempModal} />
        </Modal>
      )}
    </div>
  );
}
