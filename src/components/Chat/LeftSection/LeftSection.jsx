import InboxPart from "./InboxPart/InboxPart";
import css from "./LeftSection.module.css";
import MessagesPart from "./MessagesPart/MessagesPart";
import whatsApp from "../../../assets/images/ChannelsImages/WhatsApp_1.png";
import assist from "../../../assets/images/ChannelsImages/logo-rect 1.png";
import facebook from "../../../assets/images/ChannelsImages/Facebook_Messenger_1.png";
import avatar from "../../../assets/images/avatar_default.png";
import telegram from "../../../assets/images/ChannelsImages/Telegram_1.png";
import { useState } from "react";

export default function LeftSection() {
  const chats = [
    {
      type: "whatsApp",
      avatar: avatar,
      icon: whatsApp,
      name: "Олександр Мельник",
      lastMessage:
        "Вітаю! Чи можна записатися на діагностику електрики та двигу...",
      managersPhoto: avatar,
      time: "4m ago",
      read: false,
      id: "1",
    },
    {
      type: "facebook",
      avatar: avatar,
      icon: facebook,
      name: "Анастасія Шевченко",
      lastMessage:
        "Доброго дня! У мене є питання щодо ремонту коробки переда...",
      managersPhoto: avatar,
      time: "15m ago",
      warning: true,
      read: false,
      id: "2",
    },
    {
      type: "telegram",
      avatar: avatar,
      icon: telegram,
      name: "Максим Гончаренко",
      lastMessage:
        "Привіт! Чи є вільні місця для запису на наступний тиждень у...",
      managersPhoto: avatar,
      time: "15m ago",
      read: true,
      id: "3",
    },
    {
      type: "assist",
      avatar: avatar,
      icon: assist,
      name: "Ірина Коваль",
      lastMessage:
        "Дякую за швидку відповідь! Я хотіла б уточнити вартість зам...",
      managersPhoto: avatar,
      time: "2h ago",
      read: true,
      id: "4",
    },
    {
      type: "telegram",
      avatar: avatar,
      icon: telegram,
      name: "Дмитро Поліщук",
      lastMessage: "Доброго ранку! Ви працюєте з автомобілями американськог...",
      managersPhoto: avatar,
      time: "3h ago",
      read: true,
      id: "5",
    },
    {
      type: "facebook",
      avatar: avatar,
      icon: facebook,
      name: "Анастасія Шевченко",
      lastMessage:
        "Доброго дня! У мене є питання щодо ремонту коробки переда...",
      managersPhoto: avatar,
      time: "1d ago",
      read: true,
      id: "6",
    },
    {
      type: "telegram",
      avatar: avatar,
      icon: telegram,
      name: "Дмитро Поліщук",
      lastMessage: "Доброго ранку! Ви працюєте з автомобілями американськог...",
      managersPhoto: avatar,
      time: "3h ago",
      read: true,
      id: "7",
    },
    {
      type: "facebook",
      avatar: avatar,
      icon: facebook,
      name: "Анастасія Шевченко",
      lastMessage:
        "Доброго дня! У мене є питання щодо ремонту коробки переда...",
      managersPhoto: avatar,
      time: "1d ago",
      read: true,
      id: "8",
    },
    {
      type: "facebook",
      avatar: avatar,
      icon: facebook,
      name: "Анастасія Шевченко",
      lastMessage:
        "Доброго дня! У мене є питання щодо ремонту коробки переда...",
      managersPhoto: avatar,
      time: "1d ago",
      read: true,
      id: "9",
    },
  ];

  const [filteredChats, setFilteredChats] = useState(chats);

  const handleFilter = (e, type) => {
    e.stopPropagation();
    setFilteredChats(chats.filter((chat) => chat.type === type));
  };

  return (
    <div className={css.leftSectionWrapper}>
      {/* LeftSection */}
      <InboxPart
        handleFilter={handleFilter}
        chats={chats}
        setFilteredChats={setFilteredChats}
      />
      <MessagesPart chats={filteredChats} />
    </div>
  );
}
