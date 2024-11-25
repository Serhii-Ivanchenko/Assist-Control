import css from "./WarehousePart.module.css";
import { RiDatabaseLine } from "react-icons/ri";
import { RiFridgeLine } from "react-icons/ri";
import { RiTableAltLine } from "react-icons/ri";
import { RiFolder5Line } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { BsFolderPlus, BsThreeDotsVertical } from "react-icons/bs";
import { useRef, useState } from "react";
// import Modal from "../../Modals/Modal/Modal";
// import NewItemModal from "./NewItemModal/NewItemModal";
// import SortableTree from 'react-sortable-tree';
// import 'react-sortable-tree/style.css';
// import { Tree } from "react-arborist";

import {
  Tree,
  getDescendants,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
// import "@minoru/react-dnd-treeview/dist/style.css";
import { DndProvider } from "react-dnd";
// import { HTML5Backend, HTML5BackendOptions } from "react-dnd-html5-backend";
import Node from "./Node/Node";
import useTreeOpenHandler from "./useTreeOpenHandler/useTreeOpenHandler";
// import ThreeDotsModal from "../../Modals/AddStaffMemberModal/ThreeDotsModal/ThreeDotsModal";
import NewWhpopover from "./newWhpopover/newWhpopover";
const reorderArray = (array, sourceIndex, targetIndex) => {
  const newArray = [...array];
  const element = newArray.splice(sourceIndex, 1)[0];
  newArray.splice(targetIndex, 0, element);
  return newArray;
};

const dataForTree = [
  {
    id: "2",
    text: "м. Академіка павлова (Назва склада)",
    droppable: true,
    parent: null,
    data: "warehouse",
  },

  {
    id: "3",
    text: "Вітрина (Назва секції)",
    droppable: true,
    parent: "2",
    data: "section",
  },

  {
    id: "4",
    text: "2 Поверх (Назва секції)",
    droppable: true,
    parent: "2",
    data: "section",
  },

  { id: "5", text: "Стелаж", droppable: true, parent: "4", data: "rack" },
  {
    id: "6",
    text: "Стелаж",
    droppable: true,
    parent: "4",
    data: "rack",
  },
  {
    id: "7",
    text: "Полиця 036",
    droppable: true,
    parent: "6",
    data: "shelf",
  },

  { id: "8", text: "Місце 0243", parent: "7", data: "place" },
  { id: "9", text: "Місце 0244", parent: "7", data: "place" },
  { id: "10", text: "Місце 0245", parent: "7", data: "place" },
];

export default function WarehousePart() {
  // const [modalIsOpen, setIsOpen] = useState(false);
  // const [tree, setTree] = useState(dataForTree);

  const { ref, getPipeHeight, toggle } = useTreeOpenHandler();
  const [treeData, setTreeData] = useState(dataForTree);
  const [popover, setPopover] = useState(false);
  const buttonRef = useRef(null);

  const handleTogglePopover = () => {
    setPopover((prev) => !prev);
  };

  const handleClosePopover = () => {
    setPopover(false);
  };

  const handleDrop = (newTree, e) => {
    const { dragSourceId, dropTargetId, destinationIndex } = e;
    if (
      typeof dragSourceId === "undefined" ||
      typeof dropTargetId === "undefined"
    )
      return;
    const start = treeData.find((v) => v.id === dragSourceId);
    const end = treeData.find((v) => v.id === dropTargetId);

    if (
      start?.parent === dropTargetId &&
      start &&
      typeof destinationIndex === "number"
    ) {
      setTreeData((treeData) => {
        const output = reorderArray(
          treeData,
          treeData.indexOf(start),
          destinationIndex
        );
        return output;
      });
    }

    if (
      start?.parent !== dropTargetId &&
      start &&
      typeof destinationIndex === "number"
    ) {
      if (
        getDescendants(treeData, dragSourceId).find(
          (el) => el.id === dropTargetId
        ) ||
        dropTargetId === dragSourceId ||
        (end && !end?.droppable)
      )
        return;
      setTreeData((treeData) => {
        const output = reorderArray(
          treeData,
          treeData.indexOf(start),
          destinationIndex
        );
        const movedElement = output.find((el) => el.id === dragSourceId);
        if (movedElement) movedElement.parent = dropTargetId;
        return output;
      });
    }
  };

  // const handleDrop = (newTree) => {
  //   setTree(newTree); // Збереження нового дерева у state
  // };

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  // const handleModalClose = () => {
  //   setIsOpen(false);
  // };

  return (
    <div>
      <div className={css.listAndButton} ref={buttonRef}>
        <ul className={css.itemsList}>
          <li className={css.items}>
            <BiBuildingHouse className={css.icon} />
            <p className={css.value}>6</p>
            <p className={css.title}>Склади</p>
          </li>
          <li className={css.items}>
            <RiDatabaseLine className={css.icon} />
            <p className={css.value}>14</p>
            <p className={css.title}>Секції</p>
          </li>
          <li className={css.items}>
            <RiFridgeLine className={css.icon} />
            <p className={css.value}>46</p>
            <p className={css.title}>Стелажі</p>
          </li>
          <li className={css.items}>
            <RiTableAltLine className={css.icon} />
            <p className={css.value}>94</p>
            <p className={css.title}>Полиці</p>
          </li>
          <li className={css.items}>
            <RiFolder5Line className={css.icon} />
            <p className={css.value}>116</p>
            <p className={css.title}>Місця</p>
          </li>
        </ul>

        <div className={css.popoverBox}>
          <button
            type="button"
            className={css.newWarehouse}
            onClick={handleTogglePopover}
            ref={buttonRef}
          >
            <BsFolderPlus className={css.icon} />
            Новий склад
            <BsThreeDotsVertical className={css.icon} />
          </button>
          {popover && (
            <NewWhpopover
              isVisible={popover}
              buttonRef={buttonRef}
              onClose={handleClosePopover}
            />
          )}
        </div>
        {/* {modalIsOpen && (
          <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
            <NewItemModal onClose={handleModalClose} />
          </Modal>
        )} */}
      </div>

      {/* <SortableTree
                treeData={tree}
                onChange={(newTreeData)=> setTree(newTreeData)}
            /> */}
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={css.wrapper}>
          <Tree
            ref={ref}
            tree={treeData}
            rootId={null}
            // render={(node, { depth, isOpen, onToggle }) => (
            //   <div style={{ marginLeft: depth * 40 }}>
            //     <span onClick={onToggle}>{isOpen ? "▼" : "▶"}</span> {node.text}
            //   </div>
            // )}
            classes={{
              root: css.treeRoot,
              placeholder: css.placeholder,
              dropTarget: css.dropTarget,
              listItem: css.listItem,
            }}
            dragPreviewRender={(node) => <div>{node.text}</div>}
            onDrop={handleDrop}
            sort={(a, b) => a.id - b.id}
            insertDroppableFirst={false}
            enableAnimateExpand={true}
            canDrop={() => true}
            dropTargetOffset={5}
            render={(node, { depth, isOpen, isDropTarget }) => (
              <Node
                getPipeHeight={getPipeHeight}
                node={node}
                depth={depth}
                isOpen={isOpen}
                onClick={() => {
                  if (node.droppable) {
                    toggle(node?.id);
                  }
                }}
                isDropTarget={isDropTarget}
                treeData={treeData}
                // data={treeData.data}
              />
            )}

            // childrenAccessor="children"
            // height={400}
            // width={500}
            // parentAccessor="parentId"
          />
        </div>
      </DndProvider>
    </div>
  );
}
