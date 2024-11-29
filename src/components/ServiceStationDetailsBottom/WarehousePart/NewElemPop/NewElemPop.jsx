import { BsPencil, BsTrash } from "react-icons/bs";
import css from "./NewElemPop.module.css";
import { useEffect, useRef } from "react";
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
  onPopoverClose,
  nodeBtnRef,
}) {
  const popoverRef = useRef(null);
  const modalRef = useRef(null);

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const openModal = (e) => {
    e.stopPropagation();

    openAddModal();
    console.log("Modal is being open");
    // onPopoverClose();
  };

  const handleModalClose = () => {
    console.log("Modal is being closed");
    closeAddModal();
  };

  // const handleClickOutside = (event) => {
  //   if (
  //     popoverRef.current &&
  //     !popoverRef.current.contains(event.target) &&
  //     modalRef.current &&
  //     !modalRef.current.contains(event.target)
  //   ) {
  //     onPopoverClose();
  //   }
  // };

  // useEffect(() => {
  //   if (isVisible) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isVisible]);

  return (
    <div
      ref={popoverRef}
      className={`${css.modal} ${isVisible ? css.popoverVisible : css.hidden}`}
    >
      {type === "place" ? (
        ""
      ) : (
        <div className={css.btnBox}>
          <button className={css.btn} onClick={openModal}>
            {icon}
            {addText}
          </button>
          {isAddModalOpen && (
            <Modal
              ref={modalRef}
              isOpen={isAddModalOpen}
              onClose={handleModalClose}
            >
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
