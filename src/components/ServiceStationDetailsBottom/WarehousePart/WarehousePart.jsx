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

// import { Tree } from "@minoru/react-dnd-treeview";

export default function WarehousePart() {
  const [modalIsOpen, setIsOpen] = useState(false);
  //   const [tree, setTree] = useState([
  //     { id: "1", name: "Root", parentId: null },
  //     {
  //       id: "2",
  //       name: "м. Академіка павлова (Назва склада)",
  //       parentId: "1",
  //       children: [
  //         { id: "c1", name: "Вітрина (Назва секції)" },
  //         {
  //           id: "c2",
  //           name: "2 Поверх (Назва секції)",
  //           children: [
  //             { id: "c3", name: "Стелаж 024" },
  //             {
  //               id: "c4",
  //               name: "Стелаж 025",
  //               children: [
  //                 {
  //                   id: "c5",
  //                   name: "Полиця 036",
  //                   children: [
  //                     { id: "c6", name: "Місце 0243" },
  //                     { id: "c7", name: "Місце 0244" },
  //                     { id: "c8", name: "Місце 0245" },
  //                   ],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     { id: "3", name: "Child 2", parentId: "2" },
  //   ]);

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
                 isDropTarget={}
                // parentAccessor="parentId"
            /> */}
    </div>
  );
}
