import { BsPencil, BsTrash } from "react-icons/bs";
import css from "./NewElemPop.module.css";
import { useRef } from "react";
import { useState } from "react";
import Modal from "../../../Modals/Modal/Modal";
import AddModal from "../AddModal/AddModal";
// import { useEffect } from "react";

export default function NewElemPop({
  icon,
  addText,
  isVisible,
  type,
  isEditing,
  id,
  deleteChild,
}) {
  const popoverRef = useRef(null);

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`${css.modal} ${isVisible ? css.popoverVisible : css.hidden}`}
      ref={popoverRef}
    >
      {type === "place" ? (
        ""
      ) : (
        <div className={css.btnBox}>
          <button type="button" className={css.btn} onClick={openModal}>
            {icon}
            {addText}
          </button>
          {modalIsOpen && (
            <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
              <AddModal onClose={handleModalClose} />
            </Modal>
          )}
        </div>
      )}
      <div className={css.btnBox}>
        <button
          type="button"
          className={css.btn}
          onClick={(e) => isEditing(id, e)}
        >
          <BsPencil size={18} className={css.icon} />
          Редагувати
        </button>
      </div>
      <div className={css.btnBox}>
        <button
          type="button"
          className={`${css.btn} ${css.btnDelete}`}
          onClick={(e) => deleteChild(id, e)}
        >
          <BsTrash size={18} />
          Видалити
        </button>
      </div>
    </div>
  );
}
