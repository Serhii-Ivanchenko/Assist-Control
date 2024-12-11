import css from "./WarehousePart.module.css";
import { RiDatabaseLine } from "react-icons/ri";
import { RiFridgeLine } from "react-icons/ri";
import { RiTableAltLine } from "react-icons/ri";
import { RiFolder5Line } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { BsFolderPlus, BsThreeDotsVertical } from "react-icons/bs";
import { useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import Modal from "../../Modals/Modal/Modal";
import NewItemModal from "./NewItemModal/NewItemModal";
import Placeholder from "./Placeholder/Placeholder";
import { useEffect } from "react";

import {
  Tree,
  getDescendants,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import Node from "./Node/Node";
import useTreeOpenHandler from "./useTreeOpenHandler/useTreeOpenHandler";
import CreateWarehousePop from "./CreateWarehousePop/CreateWarehousePop";

const dataForTree = [
  {
    id: "1",
    parent: null,
    text: "м. Академіка павлова (Назва склада)",
    droppable: true,

    data: "warehouse",
  },

  {
    id: "2",
    parent: "1",
    text: "Вітрина (Назва секції)",
    droppable: true,
    data: "section",
  },

  {
    id: "3",
    parent: "1",
    text: "2 Поверх (Назва секції)",
    droppable: true,
    data: "section",
  },

  { id: "4", parent: "3", text: "Стелаж", droppable: true, data: "rack" },
  {
    id: "5",
    parent: "3",
    text: "Стелаж",
    droppable: true,
    data: "rack",
  },
  {
    id: "6",
    parent: "5",
    text: "Полиця 036",
    droppable: true,
    data: "shelf",
  },

  { id: "7", parent: "6", text: "Місце 0243", data: "place" },
  { id: "8", parent: "6", text: "Місце 0244", data: "place" },
  { id: "9", parent: "6", text: "Місце 0245", data: "place" },
];

export default function WarehousePart() {
  const [isAddWhModalOpen, setAddWhModalOpen] = useState(false);

  const { ref, getPipeHeight, toggle, openParentIfNeeded } =
    useTreeOpenHandler();
  const [treeData, setTreeData] = useState(dataForTree);
  const [isNewWhPopoverOpen, setNewWhPopoverOpen] = useState(false);

  const buttonRef = useRef(null);

  // Редагування гілочок
  const [isEditing, setIsEditing] = useState(false);
  const [tempNodeText, setTempNodeText] = useState({});

  // const handleStopEditing = () => {
  //   setIsEditing(false);
  // };

  const handleStartEditing = (nodeId) => {
    setIsEditing(nodeId);
  };

  // Відміна
  const handleRepeal = () => {
    setTempNodeText({});
    setIsEditing(null);
  };

  // Збереження данних
  const handleSaveData = () => {
    setTreeData((prev) =>
      prev.map((node) =>
        tempNodeText[node.id]
          ? { ...node, text: tempNodeText[node.id] } // Оновлюємо текст вузла, якщо він редагувався
          : node
      )
    );
    setTempNodeText({});
    setIsEditing(false);
  };

  // Додавання нового елементу
  const addNewTree = (name) => {
    const newRoot = {
      id: `${Date.now()}`,
      text: name,
      droppable: true,
      parent: null,
      data: "warehouse",
    };

    setTreeData((prevTreeData) => [...prevTreeData, newRoot]);
  };

  const scrollToTheLastItemRef = useRef(null);

  // Прокрутка до ост. елементу при додаванні
  useEffect(() => {
    if (
      treeData.length > 0 &&
      scrollToTheLastItemRef.current &&
      treeData[treeData.length - 1]?.data === "warehouse"
    ) {
      scrollToTheLastItemRef.current?.scrollTo({
        top: scrollToTheLastItemRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [treeData]);

  // Відкриття і закриття поповеру
  const handleTogglePopover = (e) => {
    e.stopPropagation();
    setNewWhPopoverOpen((prev) => !prev);
  };

  const handleClosePopover = () => {
    setNewWhPopoverOpen(false);
  };

  // Обчислення глибини,щоб елемент не можна було перетягнути вниз
  const calculateDepth = (nodeId, tree) => {
    let depth = 0;
    let currentNode = tree.find((node) => node.id === nodeId);

    while (currentNode && currentNode.parent) {
      depth += 1;
      currentNode = tree.find((node) => node.id === currentNode.parent);
    }

    return depth;
  };

  // Перетягування
  const reorderArray = (array, sourceIndex, targetIndex) => {
    const newArray = [...array];
    const element = newArray.splice(sourceIndex, 1)[0];
    newArray.splice(targetIndex, 0, element);
    return newArray;
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

    const startDepth = calculateDepth(dragSourceId, treeData);
    const endDepth = calculateDepth(dropTargetId, treeData);

    if (startDepth < endDepth) {
      return;
    }

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
      typeof destinationIndex === "number" &&
      start.data !== end.data
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

  // Відкриття і закриття модалки
  const openModal = () => {
    setAddWhModalOpen(true);
  };

  const handleModalClose = () => {
    setAddWhModalOpen(false);
  };

  return (
    <div className={css.warehouseContainer}>
      <div className={css.listAndButton}>
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

        <div className={css.newWarehouse}>
          <button
            type="button"
            className={css.newWarehouseBtn}
            onClick={openModal}
          >
            <BsFolderPlus className={css.icon} />
            Новий склад
          </button>
          {isAddWhModalOpen && (
            <Modal isOpen={isAddWhModalOpen} onClose={handleModalClose}>
              <NewItemModal
                onClose={handleModalClose}
                title="Введіть назву складу"
                name="newWarehouse"
                addNewTree={addNewTree}
              />
            </Modal>
          )}

          <button className={css.popoverBox} ref={buttonRef}>
            <BsThreeDotsVertical
              className={css.icon}
              onClick={handleTogglePopover}
            />
          </button>

          <CreateWarehousePop
            isVisible={isNewWhPopoverOpen}
            buttonRef={buttonRef}
            onClose={handleClosePopover}
          />
        </div>
      </div>

      <div className={css.treeContainer} ref={scrollToTheLastItemRef}>
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
          <div className={css.wrapper}>
            <Tree
              ref={ref}
              tree={treeData}
              rootId={null}
              // initialOpen={treeData.length - 1}
              classes={{
                root: css.treeRoot,
                placeholder: css.placeholder,
                dropTarget: css.dropTarget,
                listItem: css.listItem,
              }}
              dragPreviewRender={(node) => <div>{node.text}</div>}
              onDrop={handleDrop}
              sort={false}
              insertDroppableFirst={false}
              enableAnimateExpand={true}
              canDrop={() => true}
              dropTargetOffset={5}
              placeholderRender={(node, { depth }) => (
                <Placeholder node={node} depth={depth} />
              )}
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
                  setTreeData={setTreeData}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  onStartEditing={handleStartEditing}
                  containerRef={scrollToTheLastItemRef}
                  openParentIfNeeded={openParentIfNeeded}
                  tempNodeText={tempNodeText}
                  setTempNodeText={setTempNodeText}
                />
              )}
            />
          </div>
        </DndProvider>
      </div>

      <div className={css.btnBox}>
        {isEditing && (
          <button type="button" className={css.btnClose} onClick={handleRepeal}>
            Відміна
          </button>
        )}

        <button type="button" className={css.btnSave} onClick={handleSaveData}>
          <BsCheckLg size={18} />
          Зберегти
        </button>
      </div>
    </div>
  );
}
