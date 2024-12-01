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
  setTreeData,
  // setIsEditing,
  isEditing,
  onStartEditing,
  containerRef,
  openParentIfNeeded,
}) {
  const inputFocusRef = useRef(null);
  const scrollForPopover = useRef(null);

  // Редагування
  const handleEditing = (id, e) => {
    e.stopPropagation();
    // setIsEditing(isEditing === id ? null : id);
    onStartEditing(id);
  };

  // При ввімкненні редагування, з'являється мигаюча паличка
  useEffect(() => {
    if (isEditing && inputFocusRef.current) {
      inputFocusRef.current.focus();
    }
  }, [isEditing]);

  const changeName = (newName, id) => {
    setTreeData(
      treeData.map((node) =>
        node.id === id ? { ...node, text: newName } : node
      )
    );
  };

  // Видалення
  const deleteChild = (id, e) => {
    e.stopPropagation();
    setTreeData((prevData) =>
      prevData.filter((node) => node.id !== id && node.parentId !== id)
    );
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
    setIsOpen(isOpen === id ? null : id);
  };

  const handleClosePopover = () => {
    setIsOpen(false);
  };

  // console.log(
  //   `Pipe height for ${node.parent}:`,
  //   getPipeHeight(node.parent, treeData)
  // );

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

  // // Автоматичний скролл при відкритті останнього поповера(не працює)

  useEffect(() => {
    if (isOpen && scrollForPopover.current && containerRef.current) {
      const popover = scrollForPopover.current;
      // const container = containerRef.current;

      // // Перевірка, чи поповер виходить за межі контейнера
      // const containerRect = container.getBoundingClientRect();
      // const popoverRect = popover.getBoundingClientRect();

      // // Прокручуємо лише в разі, якщо поповер виходить за межі видимості контейнера
      // if (
      //   popoverRect.bottom > containerRect.bottom ||
      //   popoverRect.top < containerRect.top
      // )
      {
        popover.scrollIntoView({
          behavior: "smooth",
          block: "nearest", // Встановлює найближчу позицію для видимості
        });
      }
    }
  }, [isOpen]);

  return (
    <div
      className={`${css.nodeWrapper} tree-node ${
        node.droppable && isDropTarget ? css.dropTarget : ""
      }
      `}
      // ${node.data === "warehouse" && css.whWidth}
      style={{ marginInlineStart: indent }}
      onClick={handleToggle}
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
            value={node.text}
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
            {node.text}
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
            setTreeData={setTreeData}
            node={node}
            containerRef={containerRef}
            // handleToggle={handleToggle}
            openParentIfNeeded={openParentIfNeeded}
          />
        </div>
      </div>
    </div>
  );
}
