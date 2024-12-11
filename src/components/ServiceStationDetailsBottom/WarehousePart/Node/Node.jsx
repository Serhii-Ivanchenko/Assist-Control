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
  isEditing,
  onStartEditing,
  containerRef,
  openParentIfNeeded,
  tempNodeText,
  setTempNodeText,
}) {
  const inputFocusRef = useRef(null);
  const scrollForPopover = useRef(null);
  const addNodeRef = useRef({});

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
    // setTreeData(
    //   treeData.map((node) =>
    //     node.id === id ? { ...node, text: newName } : node
    //   )
    // );
    setTempNodeText((prev) => ({ ...prev, [id]: newName }));
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
    setIsOpen(isOpen === id ? false : id);
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

  // Автоматичний скролл для гілочок дерева
  useEffect(() => {
    if (addNodeRef.current[node.id]) {
      // Прокрутка до кожного нового вузла
      const nodeElement = addNodeRef.current[node.id];
      // console.log("nodeElem", nodeElement);

      nodeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [node.id]);

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
            setTreeData={setTreeData}
            node={node}
            containerRef={containerRef}
            // handleToggle={handleToggle}
            openParentIfNeeded={openParentIfNeeded}
            treeData={treeData}
          />
        </div>
      </div>
    </div>
  );
}
