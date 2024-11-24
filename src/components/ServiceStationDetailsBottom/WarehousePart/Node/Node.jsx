import { getDescendants } from "@minoru/react-dnd-treeview";
import NodeIcon from "../NodeIcon/NodeIcon";
import css from "./Node.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRef, useState } from "react";
import NewElemPop from "../NewElemPop/NewElemPop";

const TREE_X_OFFSET = 40;

export default function Node({
  node,
  depth,
  isDropTarget,
  onClick,
  treeData,
  getPipeHeight,
}) {
  const indent = depth * TREE_X_OFFSET;

  const handleToggle = (e) => {
    e.stopPropagation();
    onClick(node.id);
  };

  const buttonRefs = useRef([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleTogglePopover = () => {
    // e.stopPropagation();
    setIsOpen(true);
  };

  const handleClosePopover = () => {
    setIsOpen(false);
  };

  // console.log(
  //   `Pipe height for ${node.parent}:`,
  //   getPipeHeight(node.parent, treeData)
  // );

  return (
    <div
      className={`${css.nodeWrapper} tree-node ${
        node.droppable && isDropTarget ? css.dropTarget : ""
      }`}
      style={{ marginInlineStart: indent }}
      onClick={handleToggle}
      ref={(el) => (buttonRefs.current[node.id] = el)}
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
        <p
          className={`${css.labelGridItem} ${
            node.data === "warehouse" && css.warehouse
          }`}
        >
          {node.text}
        </p>
      </div>
      {/* <button type="button"></button> */}
      <BsThreeDotsVertical
        onClick={handleTogglePopover}
        className={css.icon}
        size={24}
        ref={buttonRefs.current[node.id]}
      />
      {isOpen === node.id && (
        <NewElemPop
          isVisible={isOpen}
          addText="Додати секцію"
          buttonRefs={buttonRefs.current[node.id]}
          onClose={handleClosePopover}
        />
      )}
      {/* <div className={`${css.expandIconWrapper} ${isOpen ? css.isOpen : ""}`}> */}
      {/* {node.droppable && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5866 5.99969L7.99997 8.58632L5.41332 5.99969C5.15332 5.73969 4.73332 5.73969 4.47332 5.99969C4.21332 6.25969 4.21332 6.67965 4.47332 6.93965L7.5333 9.99965C7.59497 10.0615 7.66823 10.1105 7.7489 10.144C7.82957 10.1775 7.91603 10.1947 8.0033 10.1947C8.09063 10.1947 8.1771 10.1775 8.25777 10.144C8.33837 10.1105 8.41163 10.0615 8.4733 9.99965L11.5333 6.93965C11.7933 6.67965 11.7933 6.25969 11.5333 5.99969C11.2733 5.74635 10.8466 5.73969 10.5866 5.99969Z"
              fill="black"
            />
          </svg>
        )} */}
      {/* </div> */}
    </div>
  );
}
