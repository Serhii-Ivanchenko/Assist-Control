import InboxPart from "./InboxPart/InboxPart";
import css from "./LeftSection.module.css";
import MessagesPart from "./MessagesPart/MessagesPart";
import whatsApp from "../../../assets/images/ChannelsImages/WhatsApp_1.png";
import assist from "../../../assets/images/ChannelsImages/logo-rect 1.png";
import facebook from "../../../assets/images/ChannelsImages/Facebook_Messenger_1.png";
import avatar from "../../../assets/images/avatar_default.png";
import telegram from "../../../assets/images/ChannelsImages/Telegram_1.png";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

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
      time: "2024-12-28T10:45:33",
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
      time: "2025-01-05T12:45:33",
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
      time: "2025-01-10T01:45:33",
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
      time: "2024-12-28T10:45:33",
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
      time: "2024-12-31T10:45:33",
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
      time: "2025-01-09T06:45:33",
      read: true,
      id: "6",
    },
  ];

  const [sortedChats, setSortedChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [sortOrder, setSortOrder] = useState("newFirst");

  const memoizedChats = useMemo(() => chats, []);

  useEffect(() => {
    const initialSortedChats = [...memoizedChats].sort((a, b) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime(); // Новіші перші
    });

    setSortedChats(initialSortedChats);
    setFilteredChats(initialSortedChats); // Встановлюємо відсортований список як початковий
  }, [memoizedChats]);

  const handleFilter = (e, type) => {
    e.stopPropagation();
    const filtered = sortedChats.filter((chat) => chat.type === type);
    setFilteredChats(filtered);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "newFirst" ? "oldFirst" : "newFirst";

    // Сортуємо весь початковий список, не впливаючи на фільтри
    const sorted = [...memoizedChats].sort((a, b) => {
      return newSortOrder === "newFirst"
        ? new Date(b.time).getTime() - new Date(a.time).getTime()
        : new Date(a.time).getTime() - new Date(b.time).getTime();
    });

    setSortedChats(sorted);
    setSortOrder(newSortOrder);

    const filtered =
      filteredChats.length > 0
        ? sorted.filter((chat) => chat.type === filteredChats[0].type)
        : sorted;

    setFilteredChats(filtered);
  };

  return (
    <div className={css.leftSectionWrapper}>
      {/* LeftSection */}
      <InboxPart handleFilter={handleFilter} />
      <MessagesPart chats={filteredChats} handleSort={handleSort} />
    </div>
  );
}
