import { BsPencil, BsTrash } from "react-icons/bs";
import css from "./NewElemPop.module.css";
import { useRef } from "react";
import { useState } from "react";
import Modal from "../../../Modals/Modal/Modal";
import AddModal from "../AddModal/AddModal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createPlaces,
  createRacks,
  createSection,
  createShelves,
  getAllWarehousesWithDetails,
} from "../../../../redux/warehouse/operations";
import toast from "react-hot-toast";

export default function NewElemPop({
  icon,
  addText,
  isVisible,
  type,
  isEditing,
  id,
  deleteChild,
  onClose,
  node,
  containerRef,
  open,
}) {
  const popoverRef = useRef(null);
  const dispatch = useDispatch();

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

  // Додавання нових гілочок
  const addNewBranch = (count) => {
    if (count <= 0) return;

    const parentId = node.id;

    console.log("id", node.id);

    if (node.data === "warehouse") {
      dispatch(
        createSection({
          warehouse_id: node.id.slice(2),
          count: Number(count),
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Секції успішно створено :)", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          dispatch(getAllWarehousesWithDetails()).then(() => {
            setTimeout(() => {
              open(parentId);
            }, 0);
          });
        })
        .catch((err) => {
          toast.error("Проблема зі створенням секцій :( спробуйте пізніше", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          console.error("Error creating post:", err);
        });
    } else if (node.data === "section") {
      dispatch(
        createRacks({
          section_id: node.id.slice(2),
          count: Number(count),
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Стелажі успішно створено :)", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          dispatch(getAllWarehousesWithDetails()).then(() => {
            setTimeout(() => {
              open(parentId);
            }, 0);
          });
        })
        .catch((err) => {
          toast.error("Проблема зі створенням стелажів :( спробуйте пізніше", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          console.error("Error creating post:", err);
        });
    } else if (node.data === "rack") {
      dispatch(
        createShelves({
          rack_id: node.id.slice(2),
          count: Number(count),
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Полиці успішно створено :)", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          dispatch(getAllWarehousesWithDetails()).then(() => {
            setTimeout(() => {
              open(parentId);
            }, 0);
          });
        })
        .catch((err) => {
          toast.error("Проблема зі створенням полиць :( спробуйте пізніше", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          console.error("Error creating post:", err);
        });
    } else if (node.data === "shelf") {
      dispatch(
        createPlaces({
          shelf_id: node.id.slice(3),
          count: Number(count),
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Місця успішно створено :)", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          dispatch(getAllWarehousesWithDetails()).then(() => {
            setTimeout(() => {
              open(parentId);
            }, 0);
          });
        })
        .catch((err) => {
          toast.error("Проблема зі створенням полиць :( спробуйте пізніше", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          console.error("Error creating post:", err);
        });
    }
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
            onClick={(e) => {
              deleteChild(
                Number(node.id.slice(node.data === "shelf" ? 3 : 2)),
                node.data,
                e
              ),
                onClose();
            }}
          >
            <BsTrash size={18} />
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
}
