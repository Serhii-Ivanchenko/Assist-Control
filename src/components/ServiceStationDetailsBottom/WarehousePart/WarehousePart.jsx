import css from "./WarehousePart.module.css";
import { RiDatabaseLine } from "react-icons/ri";
import { RiFridgeLine } from "react-icons/ri";
import { RiTableAltLine } from "react-icons/ri";
import { RiFolder5Line } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { BsFolderPlus, BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import Modal from "../../Modals/Modal/Modal";
import NewItemModal from "./NewItemModal/NewItemModal";
// import SortableTree from 'react-sortable-tree';
// import 'react-sortable-tree/style.css';
// import { Tree } from "react-arborist";

import { Tree } from "@minoru/react-dnd-treeview";
// import "@minoru/react-dnd-treeview/dist/style.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const dataForTree = [
  {
    id: "2",
    text: "м. Академіка павлова (Назва склада)",
    droppable: true,
    parent: null,
  },
  { id: "3", text: "Вітрина (Назва секції)", droppable: true, parent: "2" },
  {
    id: "4",
    text: "2 Поверх (Назва секції)",
    droppable: true,
    parent: "3",
  },

  { id: "5", text: "Стелаж 024", droppable: true, parent: "4" },
  {
    id: "6",
    text: "Стелаж 025",
    droppable: true,
    parent: "5",
  },
  {
    id: "7",
    text: "Полиця 036",
    droppable: true,
    parent: "6",
  },

  { id: "8", text: "Місце 0243" },
  { id: "9", text: "Місце 0244" },
  { id: "10", text: "Місце 0245" },
];

export default function WarehousePart() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tree, setTree] = useState(dataForTree);

  const handleDrop = (newTree) => {
    setTree(newTree); // Збереження нового дерева у state
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className={css.listAndButton}>
        <ul className={css.itemsList}>
          <li className={css.items}>
            <BiBuildingHouse />
            <p>6</p>
            <p>Склади</p>
          </li>
          <li className={css.items}>
            <RiDatabaseLine />
            <p>14</p>
            <p>Секції</p>
          </li>
          <li className={css.items}>
            <RiFridgeLine />
            <p>46</p>
            <p>Стелажі</p>
          </li>
          <li className={css.items}>
            <RiTableAltLine />
            <p>94</p>
            <p>Полиці</p>
          </li>
          <li className={css.items}>
            <RiFolder5Line />
            <p>116</p>
            <p>Місця</p>
          </li>
        </ul>

        <button type="button" className={css.newWarehouse} onClick={openModal}>
          <BsFolderPlus />
          Новий склад
          <BsThreeDotsVertical />
        </button>
        {modalIsOpen && (
          <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
            <NewItemModal onClose={handleModalClose} />
          </Modal>
        )}
      </div>

      {/* <SortableTree
                treeData={tree}
                onChange={(newTreeData)=> setTree(newTreeData)}
            /> */}
      <DndProvider backend={HTML5Backend}>
        <Tree
          tree={tree}
          rootId={null}
          render={(node, { depth, isOpen, onToggle }) => (
            <div style={{ marginLeft: depth * 20 }}>
              <span onClick={onToggle}>{isOpen ? "▼" : "▶"}</span> {node.text}
            </div>
          )}
          dragPreviewRender={(node) => <div>{node.text}</div>}
          onDrop={handleDrop}
          // childrenAccessor="children"
          // height={400}
          // width={500}
          // parentAccessor="parentId"
        />
      </DndProvider>
    </div>
  );
}
