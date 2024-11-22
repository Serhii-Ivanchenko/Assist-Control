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

export default function WarehousePart() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tree, setTree] = useState([
    {
      id: "2",
      text: "м. Академіка павлова (Назва склада)",
      parent: "1",
    },
    { id: "3", text: "Вітрина (Назва секції)", parent: "2" },
    {
      id: "4",
      text: "2 Поверх (Назва секції)",
      parent: "3",
    },

    { id: "5", text: "Стелаж 024", parent: "4" },
    {
      id: "6",
      text: "Стелаж 025",
      parent: "5",
    },
    {
      id: "7",
      text: "Полиця 036",
      parent: "6",
    },

    { id: "8", text: "Місце 0243", parent: "7" },
    { id: "9", text: "Місце 0244", parent: "8" },
    { id: "10", text: "Місце 0245", parent: "9" },

    // { id: "3", name: "Child 2", parentId: "2" },
  ]);

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
      {/* <Tree
        treeData={tree}
        // childrenAccessor="children"
        height={400}
        width={500}
        // parentAccessor="parentId"
      /> */}
    </div>
  );
}
