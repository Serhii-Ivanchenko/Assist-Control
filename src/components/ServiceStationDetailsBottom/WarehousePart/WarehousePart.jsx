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
import toast from "react-hot-toast";
import {
  Tree,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import Node from "./Node/Node";
import useTreeOpenHandler from "./useTreeOpenHandler/useTreeOpenHandler";
import CreateWarehousePop from "./CreateWarehousePop/CreateWarehousePop";

import { useSelector } from "react-redux";
import { selectWarehousesTree } from "../../../redux/warehouse/selectors";
import { useDispatch } from "react-redux";
import {
  createWarehouse,
  getAllWarehousesWithDetails,
  updateEntity,
} from "../../../redux/warehouse/operations";

export default function WarehousePart() {
  const dispatch = useDispatch();
  const warehouses = useSelector(selectWarehousesTree);
  // console.log("warehouses", warehouses);

  const dataForTree = warehouses.reduce((acc, warehouse) => {
    acc.push({
      id: `w-${warehouse.id}`,
      parent: null,
      text: warehouse.address,
      droppable: true,
      data: "warehouse",
    });

    warehouse.sections.forEach((section) => {
      acc.push({
        id: `s-${section.id}`,
        parent: `w-${warehouse.id}`,
        text: section.name,
        droppable: true,
        data: "section",
      });

      section.racks.forEach((rack) => {
        acc.push({
          id: `r-${rack.id}`,
          parent: `s-${section.id}`,
          text: rack.name,
          droppable: true,
          data: "rack",
        });

        rack.shelves.forEach((shelf) => {
          acc.push({
            id: `sh-${shelf.id}`,
            parent: `r-${rack.id}`,
            text: shelf.name,
            droppable: true,
            data: "shelf",
          });

          shelf.places.forEach((place) => {
            acc.push({
              id: `p-${place.id}`,
              parent: `sh-${shelf.id}`,
              text: place.name,
              droppable: false,
              data: "place",
            });
          });
        });
      });
    });
    return acc;
  }, []);

  const [isAddWhModalOpen, setAddWhModalOpen] = useState(false);
  const { ref, getPipeHeight, toggle, openParentIfNeeded, open } =
    useTreeOpenHandler();
  const [isNewWhPopoverOpen, setNewWhPopoverOpen] = useState(false);
  const buttonRef = useRef(null);
  const isFirstDataLoad = useRef(true);
  const [warehousesLength, setWarehousesLength] = useState(warehouses.length);

  const [expandedNodes, setExpandedNodes] = useState([]);

  // Редагування гілочок
  const [isEditing, setIsEditing] = useState(false);
  const [tempNodeText, setTempNodeText] = useState({});

  const handleStartEditing = (nodeId) => {
    setIsEditing(nodeId);
  };

  // Відміна
  const handleRepeal = () => {
    setTempNodeText({});
    setIsEditing(null);
  };

  const getTypeFromNodeId = (id) => {
    if (id.startsWith("w")) return "warehouse";
    if (id.startsWith("s-")) return "section";
    if (id.startsWith("r")) return "rack";
    if (id.startsWith("sh")) return "shelf";
    if (id.startsWith("p")) return "place";
    return "unknown";
  };

  // Збереження данних
  const handleSaveData = () => {
    const updatedNodes = Object.keys(tempNodeText).map((id) => ({
      id,
      text: tempNodeText[id],
    }));

    updatedNodes.forEach((node) => {
      const dataToUpdate = [
        {
          entity_type: getTypeFromNodeId(node.id),
          entity_id: node.id.slice(
            getTypeFromNodeId(node.id) === "shelf" ? 3 : 2
          ),
          fields: {
            ...(getTypeFromNodeId(node.id) === "warehouse"
              ? { address: node.text }
              : { name: node.text }),
          },
        },
      ];

      dispatch(updateEntity(dataToUpdate))
        .unwrap()
        .then(() => {
          dispatch(getAllWarehousesWithDetails())
            .unwrap()
            .then(() => {
              toast.success("Склад успішно оновлено :)", {
                position: "top-center",
                duration: 3000,
                style: {
                  background: "var(--bg-input)",
                  color: "var(--white)FFF",
                },
              });
              setTempNodeText({});
              setIsEditing(false);
            });
        })
        .catch((error) => {
          console.error("Error updating cash register:", error);
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

  // Додавання нового елементу
  const addNewTree = (name) => {
    dispatch(createWarehouse({ address: name }))
      .unwrap()
      .then(() => {
        dispatch(getAllWarehousesWithDetails());
      })
      .catch((err) => {
        console.error("Error creating post:", err);
      });
  };

  const scrollToTheLastItemRef = useRef(null);

  // Прокрутка до ост. елементу при додаванні
  useEffect(() => {
    if (isFirstDataLoad.current && warehouses.length > 0) {
      isFirstDataLoad.current = false;
      setWarehousesLength(warehouses.length);
      return;
    }

    if (warehouses.length > warehousesLength) {
      requestAnimationFrame(() => {
        scrollToTheLastItemRef.current?.scrollTo({
          top: scrollToTheLastItemRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
    setWarehousesLength(warehouses.length);
  }, [warehouses, warehousesLength]);

  // Відкриття і закриття поповеру
  const handleTogglePopover = (e) => {
    e.stopPropagation();
    setNewWhPopoverOpen((prev) => !prev);
  };

  const handleClosePopover = () => {
    setNewWhPopoverOpen(false);
  };

  const findWarehouseId = (nodeId, dataForTree) => {
    let currentNode = dataForTree.find((node) => node.id === nodeId);

    while (currentNode) {
      if (getTypeFromNodeId(currentNode.id) === "warehouse") {
        return currentNode.id; // Повертаємо ID складу
      }
      currentNode = dataForTree.find((node) => node.id === currentNode.parent);
    }

    return null; // Якщо склад не знайдено
  };

  const handleDrop = (newTree, e) => {
    const { dragSourceId, dropTargetId } = e;
    if (
      typeof dragSourceId === "undefined" ||
      typeof dropTargetId === "undefined"
    )
      return;
    const start = dataForTree.find((v) => v.id === dragSourceId);
    const end = dataForTree.find((v) => v.id === dropTargetId);

    const entityType = getTypeFromNodeId(start.id);
    const endEntityType = getTypeFromNodeId(end.id);
    const entityId = parseInt(start.id.slice(entityType === "shelf" ? 3 : 2));

    // Карта допустимих батьківських рівнів
    const validParents = {
      place: "shelf",
      shelf: "rack",
      rack: "section",
      section: "warehouse",
      warehouse: null, // Склад не може бути вкладеним
    };

    if (validParents[entityType] !== endEntityType) {
      toast.error("Переміщення можливе тільки в дозволені рівні!", {
        position: "top-center",
        duration: 3000,
        style: { background: "var(--bg-input)", color: "var(--white)" },
      });
      return;
    }

    const startWarehouse = findWarehouseId(start.id, dataForTree);
    const endWarehouse = findWarehouseId(end.id, dataForTree);

    // Дозволяємо лише однакові рівні або склади
    if (startWarehouse !== endWarehouse && entityType !== "warehouse") {
      toast.error(
        "Переміщення між складами можливе тільки в дозволені рівні!",
        {
          position: "top-center",
          duration: 3000,
          style: { background: "var(--bg-input)", color: "var(--white)" },
        }
      );
      return;
    }

    const parentOfStart = dataForTree.find((v) => v.id === start?.parent);

    if (
      parentOfStart &&
      getTypeFromNodeId(parentOfStart.id) !== validParents[entityType]
    ) {
      toast.error("Переміщення можливе лише в межах правильного рівня!", {
        position: "top-center",
        duration: 3000,
        style: { background: "var(--bg-input)", color: "var(--white)" },
      });
      return;
    }

    // Визначаємо правильне поле для збереження parent ID
    const parentFieldMap = {
      warehouse: null, // склад не може бути вкладеним
      section: "warehouse_id", // секція належить складу
      rack: "section_id", // стелаж належить секції
      shelf: "rack_id", // полиця належить стелажу
      place: "shelf_id", // місце належить полиці
    };

    const parentField = parentFieldMap[entityType];

    // console.log("parentField", parentField);

    // const entityId = parseInt(start.id.slice(entityType === "shelf" ? 3 : 2));

    const dataToUpdate = [
      {
        entity_type: entityType,
        entity_id: entityId,
        fields: {
          [parentField]: dropTargetId.slice(parentField === "shelf_id" ? 3 : 2),
        }, // новий parent ID
      },
    ];

    dispatch(updateEntity(dataToUpdate))
      .unwrap()
      .then(() => {
        dispatch(getAllWarehousesWithDetails()); // Отримуємо оновлені дані
        toast.success("Переміщення успішне!", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)",
          },
        });
      })
      .catch((error) => {
        console.error("Error updating entity:", error);
        toast.error("Щось пішло не так :(", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)",
          },
        });
      });
  };

  // Відкриття і закриття модалки
  const openModal = () => {
    setAddWhModalOpen(true);
  };

  const handleModalClose = () => {
    setAddWhModalOpen(false);
  };

  const warehousesNumber = dataForTree.filter(
    (tree) => tree.data === "warehouse"
  ).length;

  const sectionsNumber = dataForTree.filter(
    (tree) => tree.data === "section"
  ).length;

  const racksNumber = dataForTree.filter((tree) => tree.data === "rack").length;

  const shelvesNumber = dataForTree.filter(
    (tree) => tree.data === "shelf"
  ).length;

  const placesNumber = dataForTree.filter(
    (tree) => tree.data === "place"
  ).length;

  return (
    <div className={css.warehouseContainer}>
      <div className={css.listAndButton}>
        <ul className={css.itemsList}>
          <li className={css.items}>
            <BiBuildingHouse className={css.icon} />
            <p className={css.value}>{warehousesNumber}</p>
            <p className={css.title}>Склади</p>
          </li>
          <li className={css.items}>
            <RiDatabaseLine className={css.icon} />
            <p className={css.value}>{sectionsNumber}</p>
            <p className={css.title}>Секції</p>
          </li>
          <li className={css.items}>
            <RiFridgeLine className={css.icon} />
            <p className={css.value}>{racksNumber}</p>
            <p className={css.title}>Стелажі</p>
          </li>
          <li className={css.items}>
            <RiTableAltLine className={css.icon} />
            <p className={css.value}>{shelvesNumber}</p>
            <p className={css.title}>Полиці</p>
          </li>
          <li className={css.items}>
            <RiFolder5Line className={css.icon} />
            <p className={css.value}>{placesNumber}</p>
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
              tree={dataForTree}
              rootId={null}
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
                  treeData={dataForTree}
                  // setTreeData={setTreeData}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  onStartEditing={handleStartEditing}
                  containerRef={scrollToTheLastItemRef}
                  openParentIfNeeded={openParentIfNeeded}
                  tempNodeText={tempNodeText}
                  setTempNodeText={setTempNodeText}
                  open={open}
                />
              )}
              expandedIds={expandedNodes}
              onExpand={(nodeId) => {
                setExpandedNodes((prev) =>
                  prev.includes(nodeId)
                    ? prev.filter((id) => id !== nodeId)
                    : [...prev, nodeId]
                );
              }}
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
