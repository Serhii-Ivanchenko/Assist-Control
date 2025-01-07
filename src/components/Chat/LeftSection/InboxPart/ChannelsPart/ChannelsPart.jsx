import { IoIosArrowDown } from "react-icons/io";
import css from "./ChannelsPart.module.css";
import telegram from "../../../../../assets/images/ChannelsImages/Telegram_1.png";
import gmail from "../../../../../assets/images/ChannelsImages/Gmail_icon_1.png";
import facebook from "../../../../../assets/images/ChannelsImages/Facebook_Messenger_1.png";
import whatsApp from "../../../../../assets/images/ChannelsImages/WhatsApp_1.png";
import assist from "../../../../../assets/images/ChannelsImages/logo-rect 1.png";
// import { RxDragHandleDots2 } from "react-icons/rx";
import { useState } from "react";
// import { useRef } from "react";
import ChannelItem from "./ChannelItem/ChannelItem";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

export default function ChannelsPart() {
  const channelsList = [
    { icon: gmail, text: "Gmail", value: "4", id: "1" },
    { icon: telegram, text: "Telegram", value: "2", id: "2" },
    { icon: whatsApp, text: "WhatsApp", value: "2", id: "3" },
    { icon: facebook, text: "Messenger", value: "1", id: "4" },
    { icon: assist, text: "MobileApp", value: "1", id: "5" },
  ];

  const [isOpen, setIsOpen] = useState(true);
  const [channels, setChannels] = useState(channelsList);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

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

  // const moveChannel = (dragIndex, hoverIndex) => {
  //   setChannels((prevChannels) => {
  //     const updatedItems = [...prevChannels];
  //     const movedChannel = updatedItems[dragIndex];
  //     updatedItems[dragIndex] = updatedItems[hoverIndex];
  //     updatedItems[hoverIndex] = movedChannel;
  //     // console.log("Updated list after move:", updatedItems);
  //     return updatedItems;
  //   });
  // };

  // console.log("new array", channels);

  return (
    // <DndProvider backend={HTML5Backend}>
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
        <ul className={css.channelsList}>
          {channels.map((channel, index) => (
            <ChannelItem
              key={channel.id}
              index={index}
              channel={channel}
              gmail={gmail}
              facebook={facebook}
              // moveChannel={moveChannel}
              handleDragEnd={handleDragEnd}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
            />
          ))}
        </ul>
      )}
    </div>
    // </DndProvider>
  );
}
