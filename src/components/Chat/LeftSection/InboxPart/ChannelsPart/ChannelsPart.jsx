import { IoIosArrowDown } from "react-icons/io";
import css from "./ChannelsPart.module.css";
import telegram from "../../../../../assets/images/ChannelsImages/Telegram_1.png";
import gmail from "../../../../../assets/images/ChannelsImages/Gmail_icon_1.png";
import facebook from "../../../../../assets/images/ChannelsImages/Facebook_Messenger_1.png";
import whatsApp from "../../../../../assets/images/ChannelsImages/WhatsApp_1.png";
import assist from "../../../../../assets/images/ChannelsImages/logo-rect 1.png";
import { BsGlobe } from "react-icons/bs";
import { useState } from "react";
import ChannelItem from "./ChannelItem/ChannelItem";

export default function ChannelsPart({
  handleFilter,
  chats,
  setFilteredChats,
  flashingBorder,
}) {
  const channelsList = [
    {
      icon: gmail,
      text: "Gmail",
      value: chats.filter((chat) => chat.type === "gmail").length,
      id: "1",
      type: "gmail",
    },
    {
      icon: telegram,
      text: "Telegram",
      value: chats.filter((chat) => chat.type === "telegram").length,
      id: "2",
      type: "telegram",
    },
    {
      icon: whatsApp,
      text: "WhatsApp",
      value: chats.filter((chat) => chat.type === "whatsApp").length,
      id: "3",
      type: "whatsApp",
    },
    {
      icon: facebook,
      text: "Messenger",
      value: chats.filter((chat) => chat.type === "facebook").length,
      id: "4",
      type: "facebook",
    },
    {
      icon: assist,
      text: "MobileApp",
      value: chats.filter((chat) => chat.type === "assist").length,
      id: "5",
      type: "assist",
    },
    {
      icon: <BsGlobe size={14} className={css.siteIcon} />,
      text: "Site",
      value: chats.filter((chat) => chat.type === "site").length,
      id: "6",
      type: "site",
    },
  ];

  //Відкриття. закриття по кліку на канали
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const [channels, setChannels] = useState(channelsList);

  const totalChannels = channels.reduce((total, channel) => {
    return total + channel.value;
  }, 0);

  const [isActive, setIsActive] = useState(false);

  const handleIsActive = (id) => {
    setIsActive(id);
  };

  //Функціонал, який працює
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.setData("text/plain", index);
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

  return (
    <div className={css.channelsPart}>
      <div
        className={css.channelsSelect}
        onClick={() => {
          setFilteredChats(null);
          setIsActive(false);
        }}
      >
        <div className={css.textAndArrow}>
          <IoIosArrowDown
            onClick={(e) => handleOpen(e)}
            size={18}
            className={`${css.arrowIcon} ${isOpen && css.iconRotated}`}
          />
          <p className={css.text}>Канали</p>
        </div>
        <p className={css.numberBox}>{totalChannels}</p>
      </div>

      {isOpen && (
        <ul className={css.channelsList}>
          {channels.map((channel, index) => (
            <ChannelItem
              key={channel.id}
              index={index}
              id={channel.id}
              channel={channel}
              gmail={gmail}
              facebook={facebook}
              handleFilter={handleFilter}
              handleDragOver={handleDragOver}
              isActive={isActive}
              handleIsActive={handleIsActive}
              onDragStart={handleDragStart}
              flashingBorder={flashingBorder}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
