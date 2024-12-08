import { BsPencil, BsTrash } from "react-icons/bs";
import css from "./NewElemPop.module.css";
import { useRef } from "react";
import { useState } from "react";
import Modal from "../../../Modals/Modal/Modal";
import AddModal from "../AddModal/AddModal";
import { useEffect } from "react";

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
  containerRef,
  openParentIfNeeded,
}) {
  const popoverRef = useRef(null);

  // Відкриття і закриття модалки
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

  // Редагування і видалення гілочок
  const openEdit = (e) => {
    e.stopPropagation();
    isEditing(id, e);
    onClose();
  };

  const deleteRow = (e) => {
    deleteChild(id, e);
    onClose();
  };

  // Додавання нових гілочок
  const addNewBranch = (count) => {
    if (count <= 0) return;

    const newBranches = Array.from({ length: count }).map((_, index) => {
      const branchText = TextForNewBranch({ type: node.data });
      const branchData = DataForNewBranch({ type: node.data });

      return {
        id: `${Date.now()}  - ${index}`,
        text: `${branchText} ${index + 1}`,
        droppable: true,
        parent: node.id,
        data: branchData,
      };
    });

    // console.log(newBranches);

    setTreeData((prevTreeData) => {
      const updatedTree = [...prevTreeData, ...newBranches];
      // Відкриття батьківської гілки після додавання
      newBranches.forEach((newNode) =>
        openParentIfNeeded(newNode.id, updatedTree)
      );
      return updatedTree;
    });
  };

  // Автоматичний скролл при відкритті останнього поповера (наче працює)
  useEffect(() => {
    if (isVisible === node.id && popoverRef.current && containerRef.current) {
      const popover = popoverRef.current;
      const container = containerRef.current;

      const containerRect = container.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();

      const extraPadding = 5; // Додаткові пікселі для тіні

      if (popoverRect.bottom + extraPadding > containerRect.bottom) {
        container.scrollTo({
          top:
            container.scrollTop +
            (popoverRect.bottom - containerRect.bottom + extraPadding),
          behavior: "smooth",
        });
      }

      if (popoverRect.top - extraPadding < containerRect.top) {
        container.scrollTo({
          top:
            container.scrollTop -
            (containerRect.top - popoverRect.top + extraPadding),
          behavior: "smooth",
        });
      }
    }
  }, [isVisible, node.id, popoverRef, containerRef]);

  return (
    <div
      ref={popoverRef}
      className={`${type === "place" ? css.placeHeight : css.popoverHeight} ${
        isVisible ? css.popoverVisible : css.hidden
      }`}
    >
      <div className={css.modal}>
        {type === "place" ? (
          ""
        ) : (
          <div className={css.btnBox}>
            <button type="button" className={css.btn} onClick={openModal}>
              {icon}
              {addText}
            </button>
            {modalIsOpen && (
              <div onClick={(e) => e.stopPropagation()}>
                <Modal
                  isOpen={modalIsOpen}
                  onClose={handleModalClose}
                  shouldCloseOnOverlayClick={false}
                >
                  <div
                    className={css.modalContent}
                    onClick={(e) => {
                      e.stopPropagation();
                      // console.log("Clicked inside modal");
                    }}
                  >
                    <AddModal
                      onClose={handleModalClose}
                      addNewBranch={addNewBranch}
                      // handleToggle={handleToggle}
                    />
                  </div>
                </Modal>
              </div>
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
    </div>
  );
}
