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
  getDescendants,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import Node from "./Node/Node";
import useTreeOpenHandler from "./useTreeOpenHandler/useTreeOpenHandler";
import CreateWarehousePop from "./CreateWarehousePop/CreateWarehousePop";

import { useSelector } from "react-redux";
import {
  // selectOneWareHouseTree,
  selectWarehousesTree,
} from "../../../redux/warehouse/selectors";
import { useDispatch } from "react-redux";
import {
  createWarehouse,
  getAllWarehousesWithDetails,
  updateEntity,
} from "../../../redux/warehouse/operations";
// import {
//   getWarehouseById,
//   getWarehouses,
// } from "../../../redux/warehouse/operations";

export default function WarehousePart() {
  const dispatch = useDispatch();
  const warehouses = useSelector(selectWarehousesTree);
  console.log("warehouses", warehouses);

  // const warehouseById = useSelector(selectOneWareHouseTree) || [];

  // console.log("wawarehouseByIdreho", warehouseById);

  // useEffect(() => {
  //   dispatch(getWarehouses()); // To get the list of all warehouses
  //   if (warehouseById && warehouseById.id) {
  //     dispatch(getWarehouseById(warehouseById.id)); // To get details of the specific warehouse
  //   }
  // }, [dispatch, warehouseById.id, warehouseById]);

  //   console.log("dataForTree", dataForTree);

  // const dataForTree = warehouses.map((warehouse) => {
  //   return {
  //     id: warehouse.id.toString(),
  //     parent: null, // Склади будуть кореневими елементами
  //     text: warehouse.name,
  //     droppable: warehouse.total_sections > 0, // Якщо є підсекції, то елемент буде дропабельним
  //     data: "warehouse",
  //   };
  // });

  // const dataForParticularTree = [
  //   {
  //     id: `w-${warehouseById.id}`,
  //     parent: null,
  //     text: warehouseById.name,
  //     droppable: true,
  //     data: "warehouse",
  //   },
  // ];

  // warehouseById.sections.forEach((section) => {
  //   treeData.push({
  //     id: `s-${section.id}`,
  //     parent: `w-${warehouseById.id}`,
  //     text: section.name,
  //     droppable: true,
  //     data: "section",
  //   });

  //   section.racks.forEach((rack) => {
  //     treeData.push({
  //       id: `r-${rack.id}`,
  //       parent: `s-${section.id}`,
  //       text: rack.name,
  //       droppable: true,
  //       data: "rack",
  //     });

  //     rack.shelves.forEach((shelf) => {
  //       treeData.push({
  //         id: `sh-${shelf.id}`,
  //         parent: `r-${rack.id}`,
  //         text: shelf.name,
  //         droppable: true,
  //         data: "shelf",
  //       });

  //       shelf.places.forEach((place) => {
  //         treeData.push({
  //           id: `p-${place.id}`,
  //           parent: `sh-${shelf.id}`,
  //           text: place.name,
  //           droppable: false,
  //           data: "place",
  //         });
  //       });
  //     });
  //   });
  // });

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

  console.log("dataForTree", dataForTree);

  // const [treeData, setTreeData] = useState(dataForTree);

  // useEffect(() => {
  //   setTreeData(dataForTree);
  // }, [dataForTree]);

  // setTreeData(dataForTree);
  //   return {
  //     id: warehouse.id.toString(),
  //     parent: null,
  //     text: warehouse.name,
  //     droppable: warehouse.total_sections > 0,
  //     data: "warehouse",
  //   };
  // });

  // const dataForParticularTree = warehouseById.sections.map((section) => {
  //   return {
  //     id: `s-${section.id}`,
  //     parent: `w-${warehouseById.id}`,
  //     text: section.name,
  //     droppable: true,
  //     data: "section",
  //   };
  // });

  // setTreeData([...dataForTree]);

  // Додаємо секції (якщо є)
  // const sections = warehouses
  //   .filter((warehouse) => warehouse.total_sections > 0)
  //   .flatMap((warehouse) => {
  //     const sectionsArray = [];
  //     for (let i = 0; i < warehouse.total_sections; i++) {
  //       sectionsArray.push({
  //         id: `${warehouse.id}-${i + 1}`,
  //         parent: warehouse.id.toString(), // Прив'язуємо до складу
  //         text: `${warehouse.name} - Section ${i + 1}`,
  //         droppable: true,
  //         data: "section",
  //       });
  //     }
  //     return sectionsArray;
  //   });

  // const finalTreeData = [...dataForTree, ...sections];

  // console.log(finalTreeData);
  //

  const [isAddWhModalOpen, setAddWhModalOpen] = useState(false);

  const { ref, getPipeHeight, toggle, openParentIfNeeded, open } =
    useTreeOpenHandler();

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
    //   setTreeData((prev) =>
    //     prev.map((node) =>
    //       tempNodeText[node.id]
    //         ? { ...node, text: tempNodeText[node.id] } // Оновлюємо текст вузла, якщо він редагувався
    //         : node
    //     )
    //   );
    const updatedNodes = Object.keys(tempNodeText).map((id) => ({
      id,
      text: tempNodeText[id],
    }));

    updatedNodes.forEach((node) => {
      const dataToUpdate = [
        {
          entity_type: getTypeFromNodeId(node.id), // Функція, яка визначає тип
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
    // const newRoot = {
    //   id: `${Date.now()}`,
    //   text: name,
    //   droppable: true,
    //   parent: null,
    //   data: "warehouse",
    // };

    // setTreeData((prevTreeData) => [...prevTreeData, newRoot]);
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
  // useEffect(() => {
  //   if (
  //     treeData.length > 0 &&
  //     scrollToTheLastItemRef.current &&
  //     treeData[treeData.length - 1]?.data === "warehouse"
  //   ) {
  //     scrollToTheLastItemRef.current?.scrollTo({
  //       top: scrollToTheLastItemRef.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [treeData]);

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

  // Перетягування
  // const reorderArray = (array, sourceIndex, targetIndex) => {
  //   const newArray = [...array];
  //   const element = newArray.splice(sourceIndex, 1)[0];
  //   newArray.splice(targetIndex, 0, element);
  //   return newArray;
  // };

  const handleDrop = (newTree, e) => {
    const { dragSourceId, dropTargetId, destinationIndex } = e;
    if (
      typeof dragSourceId === "undefined" ||
      typeof dropTargetId === "undefined"
    )
      return;
    const start = dataForTree.find((v) => v.id === dragSourceId);
    const end = dataForTree.find((v) => v.id === dropTargetId);

    const startDepth = calculateDepth(dragSourceId, dataForTree);
    const endDepth = calculateDepth(dropTargetId, dataForTree);
    console.log("startDepth", startDepth);
    console.log("endDepth", endDepth);
    console.log("dropTargetId", dropTargetId);

    if (startDepth < endDepth) {
      return;
    }

    if (
      start?.parent === dropTargetId &&
      start &&
      typeof destinationIndex === "number"
    ) {
      //   setTreeData((treeData) => {
      //     const output = reorderArray(
      //       treeData,
      //       treeData.indexOf(start),
      //       destinationIndex
      //     );
      //     return output;
      //   });
    }

    if (
      start?.parent !== dropTargetId &&
      start &&
      typeof destinationIndex === "number" &&
      start.data !== end.data
    ) {
      if (
        getDescendants(dataForTree, dragSourceId).find(
          (el) => el.id === dropTargetId
        ) ||
        dropTargetId === dragSourceId ||
        (end && !end?.droppable)
      )
        return;
    }

    const entityType = getTypeFromNodeId(start.id);
    const entityId = parseInt(start.id.slice(entityType === "shelf" ? 3 : 2));
    // const entityType = getTypeFromNodeId(start.id);
    // const endEntityType = getTypeFromNodeId(end.id);

    // if (entityType !== endEntityType) return;

    // // Перевіряємо, чи один і той самий склад
    // const startWarehouse = findWarehouseId(start.id, dataForTree);
    // const endWarehouse = findWarehouseId(end.id, dataForTree);

    // if (startWarehouse !== endWarehouse) {
    //   toast.error("Переміщення між складами заборонено!", {
    //     position: "top-center",
    //     duration: 3000,
    //     style: { background: "var(--bg-input)", color: "var(--white)FFF" },
    //   });
    //   return;
    // }

    // Визначаємо правильне поле для збереження parent ID
    const parentFieldMap = {
      warehouse: null, // склад не може бути вкладеним
      section: "warehouse_id", // секція належить складу
      rack: "section_id", // стелаж належить секції
      shelf: "rack_id", // полиця належить стелажу
      place: "shelf_id", // місце належить полиці
    };

    const parentField = parentFieldMap[entityType];

    console.log("parentField", parentField);

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

    // setTreeData((treeData) => {
    //   const output = reorderArray(
    //     treeData,
    //     treeData.indexOf(start),
    //     destinationIndex
    //   );
    //   const movedElement = output.find((el) => el.id === dragSourceId);
    //   if (movedElement) movedElement.parent = dropTargetId;
    //   return output;
    // });

    dispatch(updateEntity(dataToUpdate))
      .unwrap()
      .then(() => {
        dispatch(getAllWarehousesWithDetails()); // Отримуємо оновлені дані
        toast.success("Переміщення успішне!", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
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
            color: "var(--white)FFF",
          },
        });
      });
  };

  // const handleDrop = (newTree, e) => {
  //   const { dragSourceId, dropTargetId, destinationIndex } = e;
  //   if (!dragSourceId || !dropTargetId) return;

  //   const start = dataForTree.find((v) => v.id === dragSourceId);
  //   const end = dataForTree.find((v) => v.id === dropTargetId);

  //   if (!start || !end) return;

  //   const startDepth = calculateDepth(dragSourceId, dataForTree);
  //   const endDepth = calculateDepth(dropTargetId, dataForTree);

  //   if (startDepth < endDepth) return;

  //   if (
  //     getDescendants(dataForTree, dragSourceId).some(
  //       (el) => el.id === dropTargetId
  //     ) ||
  //     dropTargetId === dragSourceId ||
  //     (end && !end?.droppable)
  //   )
  //     return;

  //   // 1️⃣ Формуємо запит на оновлення
  //   const dataToUpdate = [
  //     {
  //       entity_type: getTypeFromNodeId(start.id),
  //       entity_id: parseInt(
  //         start.id.slice(getTypeFromNodeId(start.id) === "shelf" ? 3 : 2)
  //       ),
  //       fields: {
  //         [`${getTypeFromNodeId(start.id)}_id`]: dropTargetId, // Оновлюємо ID батьківського елемента
  //       },
  //     },
  //   ];

  //   // 2️⃣ Відправляємо оновлення на бекенд
  //   dispatch(updateEntity(dataToUpdate))
  //     .unwrap()
  //     .then(() => {
  //       dispatch(getAllWarehousesWithDetails()); // Отримуємо оновлені дані
  //       toast.success("Переміщення успішне!", {
  //         position: "top-center",
  //         duration: 3000,
  //         style: {
  //           background: "var(--bg-input)",
  //           color: "var(--white)FFF",
  //         },
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error updating entity:", error);
  //       toast.error("Щось пішло не так :(", {
  //         position: "top-center",
  //         duration: 3000,
  //         style: {
  //           background: "var(--bg-input)",
  //           color: "var(--white)FFF",
  //         },
  //       });
  //     });
  // };

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
