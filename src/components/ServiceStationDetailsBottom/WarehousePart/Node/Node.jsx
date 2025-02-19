import { getDescendants } from "@minoru/react-dnd-treeview";
import NodeIcon from "../NodeIcon/NodeIcon";
import css from "./Node.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRef, useState } from "react";
import NewElemPop from "../NewElemPop/NewElemPop";
import { RiDatabaseLine } from "react-icons/ri";
import { RiFridgeLine } from "react-icons/ri";
import { RiTableAltLine } from "react-icons/ri";
import { RiFolder5Line } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  deleteEntity,
  getAllWarehousesWithDetails,
} from "../../../../redux/warehouse/operations";
import toast from "react-hot-toast";

const TREE_X_OFFSET = 40;

const TextForPopover = ({ type }) => {
  switch (type) {
    case "warehouse":
      return "Додати секцію";
    case "section":
      return "Додати стелаж";
    case "rack":
      return "Додати полицю";
    case "shelf":
      return "Додати місце";
    // case "place":
    //   return ""
    default:
      return "Додати";
  }
};

const IconForPopover = ({ type }) => {
  switch (type) {
    case "warehouse":
      return <RiDatabaseLine className={css.icon} />;
    case "section":
      return <RiFridgeLine className={css.icon} />;
    case "rack":
      return <RiTableAltLine className={css.icon} />;
    case "shelf":
      return <RiFolder5Line className={css.icon} />;
    // case "place":
    //   return ""
    default:
      return <BiBuildingHouse className={css.icon} />;
  }
};

export default function Node({
  node,
  depth,
  isDropTarget,
  onClick,
  treeData,
  getPipeHeight,
  // setTreeData,
  isEditing,
  onStartEditing,
  containerRef,
  openParentIfNeeded,
  tempNodeText,
  setTempNodeText,
  open,
}) {
  const inputFocusRef = useRef(null);
  const scrollForPopover = useRef(null);
  const addNodeRef = useRef({});
  // const prevNodesRef = useRef(new Set());

  const dispatch = useDispatch();

  const addNodeButtonRef = (nodeId, el) => {
    if (el && !addNodeRef.current[nodeId]) {
      addNodeRef.current[nodeId] = el;
    }
  };

  // Редагування
  const handleEditing = (id, e, text) => {
    e.stopPropagation();
    setTempNodeText((prev) => ({ ...prev, [id]: text }));
    onStartEditing(id);
  };

  // При ввімкненні редагування, з'являється мигаюча паличка
  useEffect(() => {
    if (isEditing && inputFocusRef.current) {
      inputFocusRef.current.focus();
    }
  }, [isEditing]);

  // Зміна назви
  const changeName = (newName, id) => {
    setTempNodeText((prev) => ({ ...prev, [id]: newName }));
  };

  // Видалення
  const deleteChild = (id, type, e) => {
    e.stopPropagation();
    dispatch(deleteEntity([{ entity_type: type, entity_id: id }]))
      .unwrap()
      .then(() => {
        dispatch(getAllWarehousesWithDetails())
          .unwrap()
          .then(() => {
            toast.success("Успішно видалено :)", {
              position: "top-center",
              duration: 3000,
              style: {
                background: "var(--bg-input)",
                color: "var(--white)FFF",
              },
            });
          })
          .catch((error) => {
            console.error("Error updating user data:", error);
            toast.error("Щось пішло не так :(", {
              position: "top-center",
              duration: 3000,
              style: {
                background: "var(--bg-input)",
                color: "var(--white)FFF",
              },
            });
          });
      });
  };

  // Щоб не тригерилось дерево
  const onInputClick = (e) => {
    e.stopPropagation();
  };

  // Розкриття вузлів дерева
  const indent = depth * TREE_X_OFFSET;

  const handleToggle = (e) => {
    e.stopPropagation();
    onClick(node.id);
  };

  // Функціонал для поповерів
  const buttonRefs = useRef([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleTogglePopover = (id, e) => {
    e.stopPropagation();
    setIsOpen(isOpen === id ? false : id);
  };

  const handleClosePopover = () => {
    setIsOpen(false);
  };

  const addButtonRef = (el) => {
    if (el && !buttonRefs.current.includes(el)) {
      buttonRefs.current[node.id] = el;
    }
  };

  // Щоб по кліку кудись, попове вимикався
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRefs.current &&
        !Object.values(buttonRefs.current).some(
          (ref) => ref && ref.contains(event.target)
        )
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Автоматичний скролл для гілочок дерева
  // useEffect(() => {
  //   if (!prevNodesRef.current.has(node.id) && addNodeRef.current[node.id]) {
  //     const nodeElement = addNodeRef.current[node.id];

  //     requestAnimationFrame(() => {
  //       nodeElement.scrollIntoView({
  //         behavior: "smooth",
  //         block: "nearest",
  //       });
  //     });

  //     // Додаємо новий вузол у список відомих
  //     prevNodesRef.current.add(node.id);
  //   }
  // }, [node.id]);

  return (
    <div
      className={`${css.nodeWrapper} tree-node ${
        node.droppable && isDropTarget ? css.dropTarget : ""
      }
      `}
      // ${node.data === "warehouse" && css.whWidth}
      style={{ marginInlineStart: indent }}
      onClick={handleToggle}
      ref={(el) => addNodeButtonRef(node.id, el)}
    >
      <div
        className={css.pipeX}
        style={{ width: depth > 0 ? TREE_X_OFFSET - 15 : 0 }}
      />
      {getDescendants(treeData, node.parent)[0].id === node.id && (
        <div
          className={css.pipeY}
          style={{
            height: Math.max(0, getPipeHeight(node.parent, treeData) - 30),
          }}
        />
      )}

      <div className={css.iconAndText}>
        {" "}
        <NodeIcon type={node.data} />
        {isEditing === node.id ? (
          <input
            className={css.input}
            value={tempNodeText[node.id] || node.text}
            onChange={(e) => changeName(e.target.value, node.id)}
            onClick={onInputClick}
            ref={inputFocusRef}
          />
        ) : (
          <p
            className={`${css.labelGridItem} ${
              node.data === "warehouse" && css.warehouse
            }`}
          >
            {tempNodeText[node.id] || node.text}
          </p>
        )}
      </div>
      <div className={css.popoverDiv} ref={addButtonRef}>
        <BsThreeDotsVertical
          onClick={(e) => handleTogglePopover(node.id, e)}
          className={css.icon}
          size={24}
        />
        <div ref={scrollForPopover}>
          <NewElemPop
            isVisible={isOpen}
            icon={<IconForPopover type={node.data} />}
            addText={<TextForPopover type={node.data} />}
            buttonRefs={buttonRefs.current[node.id]}
            onClose={handleClosePopover}
            type={node.data}
            isEditing={handleEditing}
            id={node.id}
            deleteChild={deleteChild}
            // setTreeData={setTreeData}
            node={node}
            containerRef={containerRef}
            // handleToggle={handleToggle}
            openParentIfNeeded={openParentIfNeeded}
            treeData={treeData}
            open={open}
          />
        </div>
      </div>
    </div>
  );
}
