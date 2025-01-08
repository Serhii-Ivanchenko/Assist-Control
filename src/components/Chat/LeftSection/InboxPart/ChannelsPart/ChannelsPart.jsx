import { IoIosArrowDown } from "react-icons/io";
import css from "./ChannelsPart.module.css";
import telegram from "../../../../../assets/images/ChannelsImages/Telegram_1.png";
import gmail from "../../../../../assets/images/ChannelsImages/Gmail_icon_1.png";
import facebook from "../../../../../assets/images/ChannelsImages/Facebook_Messenger_1.png";
import whatsApp from "../../../../../assets/images/ChannelsImages/WhatsApp_1.png";
import assist from "../../../../../assets/images/ChannelsImages/logo-rect 1.png";
import { useState } from "react";
// import { useRef } from "react";
import ChannelItem from "./ChannelItem/ChannelItem";
// import {
//   DndContext,
//   // useDraggable,
//   useDroppable,
//   // DragEndEvent,
// } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";
// import { DragOverlay } from "@dnd-kit/core";
// import SortableOverlay from "./SortableOverlay/SortableOverlay";

export default function ChannelsPart({ handleFilter }) {
  const channelsList = [
    { icon: gmail, text: "Gmail", value: "4", id: "1", type: "gmail" },
    { icon: telegram, text: "Telegram", value: "2", id: "2", type: "telegram" },
    { icon: whatsApp, text: "WhatsApp", value: "2", id: "3", type: "whatsApp" },
    {
      icon: facebook,
      text: "Messenger",
      value: "1",
      id: "4",
      type: "facebook",
    },
    { icon: assist, text: "MobileApp", value: "1", id: "5", type: "assist" },
  ];

  //Відкриття. закриття по кліку на канали
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const [channels, setChannels] = useState(channelsList);

  //Функціонал бібліотеки з прикольним перетягуванням, яке хочу зробити

  // const [activeItem, setActiveItem] = useState(null);
  // const [activeItemPosition, setActiveItemPosition] = useState({
  //   x: 0,
  //   y: 0,
  // });

  // const { setNodeRef } = useDroppable({
  //   id: "droppable",
  // });

  // const handleDragEnd = (event) => {
  //   const { active, over } = event;

  //   if (active && over && active.id !== over?.id) {
  //     console.log("Active ID:", active.id);
  //     console.log("Over ID:", over?.id);

  //     const oldIndex = channels.findIndex((item) => item.id === active.id);
  //     console.log(oldIndex);

  //     const newIndex = channels.findIndex((item) => item.id === over.id);
  //     console.log(newIndex);

  //     if (oldIndex === -1 || newIndex === -1) {
  //       console.error("Invalid indices:", { oldIndex, newIndex });
  //       return; // Якщо індекси некоректні, припиняємо виконання
  //     }

  //     // Reorder the list
  //     // if (oldIndex !== newIndex) {
  //     // Створюємо копію списку і змінюємо порядок елементів
  //     // const newItems = [...channels];
  //     // const [removed] = newItems.splice(oldIndex, 1); // Видаляємо елемент з поточної позиції
  //     // newItems.splice(newIndex, 0, removed); // Додаємо на нову позицію
  //     const newItems = Array.from(channels);
  //     const [removed] = newItems.splice(oldIndex, 1);
  //     newItems.splice(newIndex, 0, removed);

  //     setChannels(newItems); // Оновлюємо стан з новим порядком
  //     // }
  //   }
  //   setActiveItem(null);
  // };

  // const handleDragStart = (event) => {
  //   setActiveItem(event.active.id); // Set the active item when dragging starts
  //   const { clientX, clientY } = event; // Get the starting position of the drag
  //   setActiveItemPosition({ x: clientX, y: clientY }); // Store the initial position
  // };

  // const handleDragMove = (event) => {
  //   const { clientX, clientY } = event;
  //   setActiveItemPosition({ x: clientX, y: clientY }); // Update position during drag
  // };

  //Функціонал, який працює
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();

    // Переміщення елемента в нову позицію
    if (index !== draggedItemIndex) {
      const updatedItems = [...channels];
      const [movedItem] = updatedItems.splice(draggedItemIndex, 1);
      updatedItems.splice(index, 0, movedItem);
      setDraggedItemIndex(index);
      setChannels(updatedItems);
    }
  };

  // Закінчення перетягування
  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  return (
    <div className={css.channelsPart}>
      <div className={css.channelsSelect} onClick={handleOpen}>
        <div className={css.textAndArrow}>
          <IoIosArrowDown
            size={18}
            className={`${css.arrowIcon} ${isOpen && css.iconRotated}`}
          />
          <p className={css.text}>Канали</p>
        </div>
        <p className={css.numberBox}>10</p>
      </div>

      {isOpen && (
        // <DndContext
        //   onDragEnd={handleDragEnd}
        //   onDragStart={handleDragStart}
        //   onDragMove={handleDragMove}
        // >
        <ul
          className={css.channelsList}
          // ref={setNodeRef}
        >
          {channels.map((channel, index) => (
            <ChannelItem
              key={channel.id}
              index={index}
              id={channel.id}
              channel={channel}
              gmail={gmail}
              facebook={facebook}
              handleFilter={handleFilter}
              // moveChannel={moveChannel}
              handleDragEnd={handleDragEnd}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
            />
          ))}
        </ul>
        //<SortableOverlay>
        // {activeItem ? (
        //   <ChannelItem
        //     key={activeItem}
        //     id={activeItem}
        //     channel={channels.find((channel) => channel.id === activeItem)}
        //     style={{
        //       position: "absolute",
        //       top: `${activeItemPosition.y}px`, // Position from top
        //       left: `${activeItemPosition.x}px`, // Position from left
        //       pointerEvents: "none", // Prevent overlay from blocking the drag
        //       zIndex: 999, // Make sure it appears on top of other elements
        //     }}
        //   />
        // ) : null}
        // </SortableOverlay>
        // </DndContext> */}
      )}
    </div>
  );
}
