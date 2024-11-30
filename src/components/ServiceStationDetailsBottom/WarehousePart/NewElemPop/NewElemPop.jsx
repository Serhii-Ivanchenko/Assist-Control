import { BsPencil, BsTrash } from "react-icons/bs";
import css from "./NewElemPop.module.css";
import { useRef } from "react";
import { useState } from "react";
import Modal from "../../../Modals/Modal/Modal";
import AddModal from "../AddModal/AddModal";

const TextForNewBranch = ({ type }) => {
  switch (type) {
    case "warehouse":
      return "Секція";
    case "section":
      return "Стелаж";
    case "rack":
      return "Полиця";
    case "shelf":
      return "Місце";
    // case "place":
    //   return ""
    default:
      return "Секція";
  }
};

const DataForNewBranch = ({ type }) => {
  switch (type) {
    case "warehouse":
      return "section";
    case "section":
      return "rack";
    case "rack":
      return "shelf";
    case "shelf":
      return "place";
    // case "place":
    //   return ""
    default:
      return "warehouse";
  }
};

export default function NewElemPop({
  icon,
  addText,
  isVisible,
  type,
  isEditing,
  id,
  deleteChild,
  onClose,
  setTreeData,
  node,
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
    // e.stopPropagation();
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
  };

  const addNewBranch = (count) => {
    if (count <= 0) return;

    const NewBranches = Array.from({ length: count }).map((_, index) => {
      const branchText = TextForNewBranch({ type: node.data });
      const branchData = DataForNewBranch({ type: node.data });

      return {
        id: `${Date.now()} - ${index}`,
        text: `${branchText} ${index + 1}`,
        droppable: true,
        parent: node.id,
        data: branchData,
      };
    });

    console.log(NewBranches);

    setTreeData((prevTreeData) => [...prevTreeData, ...NewBranches]);
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
                <AddModal
                  onClose={handleModalClose}
                  addNewBranch={addNewBranch}
                />
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
