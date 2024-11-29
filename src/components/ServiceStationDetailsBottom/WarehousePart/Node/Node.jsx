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
  isNodePopoverOpen,
  handleToggleNodePopover,
  handleCloseNodePopover,
}) {
  const inputFocusRef = useRef(null);
  const nodeBtnRef = useRef(null);

  const handleEditing = (id, e) => {
    e.stopPropagation();
    // setIsEditing(isEditing === id ? null : id);
    onStartEditing(id);
  };

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

  const deleteChild = (id, e) => {
    e.stopPropagation();
    setTreeData((prevData) =>
      prevData.filter((node) => node.id !== id && node.parentId !== id)
    );
  };

  const onInputClick = (e) => {
    e.stopPropagation();
  };

  const indent = depth * TREE_X_OFFSET;

  const handleToggle = (e) => {
    e.stopPropagation();
    onClick(node.id);
  };

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
      <div
        className={css.popoverDiv}
        // ref={(el) => (buttonRefs.current[node.id] = el)}
      >
        <button
          ref={(el) => {
            if (nodeBtnRef.current) {
              nodeBtnRef.current[node.id] = el;
            }
          }}
          className={css.icon}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleNodePopover(node.id);
          }}
        >
          <BsThreeDotsVertical />
        </button>
        {isNodePopoverOpen === node.id && (
          <>
            <NewElemPop
              isVisible={isNodePopoverOpen}
              icon={<IconForPopover type={node.data} />}
              addText={<TextForPopover type={node.data} />}
              nodeBtnRef={
                nodeBtnRef.current ? nodeBtnRef.current[node.id] : null
              }
              onPopoverClose={handleCloseNodePopover}
              type={node.data}
              isEditing={handleEditing}
              id={node.id}
              deleteChild={deleteChild}
            />
          </>
        )}
      </div>
    </div>
  );
}
