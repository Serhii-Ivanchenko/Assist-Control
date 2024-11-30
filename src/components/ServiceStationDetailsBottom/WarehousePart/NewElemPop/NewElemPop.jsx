import { BsPencil, BsTrash } from "react-icons/bs";
import css from "./NewElemPop.module.css";
import { useRef } from "react";
import { useState } from "react";
import Modal from "../../../Modals/Modal/Modal";
import AddModal from "../AddModal/AddModal";

export default function NewElemPop({
  icon,
  addText,
  isVisible,
  type,
  isEditing,
  id,
  deleteChild,
  onClose,
}) {
  const popoverRef = useRef(null);

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = (e) => {
    e.stopPropagation();
    console.log("Modal is being opened");
    setIsOpen(true);
    onClose();
  };

  const handleModalClose = () => {
    console.log("Modal is being closed");
    setIsOpen(false);
  };

  const openEdit = (e) => {
    e.stopPropagation();
    isEditing(id, e);
    onClose();
  };

  const deleteRow = (e) => {
    deleteChild(id, e); 
    onClose();
  }

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
            <Modal
              isOpen={modalIsOpen}
              onClose={handleModalClose}
              shouldCloseOnOverlayClick={false}
            >
              <div
                className={css.modalContent}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Clicked inside modal");
                }}
              >
                <AddModal onClose={handleModalClose} />
              </div>
            </Modal>
          )}
        </div>
      )}
      <div className={css.btnBox}>
        <button type="button" className={css.btn} onClick={openEdit}>
          <BsPencil size={18} className={css.icon} />
          Редагувати
        </button>
      </div>
      <div className={css.btnBox}>
        <button
          type="button"
          className={`${css.btn} ${css.btnDelete}`}
          onClick={deleteRow}
        >
          <BsTrash size={18} />
          Видалити
        </button>
      </div>
    </div>
  );
}
