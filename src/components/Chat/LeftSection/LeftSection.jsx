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
    {
      type: "telegram",
      avatar: avatar,
      icon: telegram,
      name: "Дмитро Поліщук",
      lastMessage: "Доброго ранку! Ви працюєте з автомобілями американськог...",
      managersPhoto: avatar,
      time: "2025-01-11T06:45:33",
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
      time: "2025-01-11T18:45:33",
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
      time: "2025-01-11T19:27:33",
      read: true,
      id: "9",
    },
  ];

  // const [sortedChats, setSortedChats] = useState([]);
  // const [filteredChats, setFilteredChats] = useState([]);
  const [sortedAndFilteredChats, setSortedAndFilteredChats] = useState([]);
  const [sortOrder, setSortOrder] = useState("newFirst");
  const [activeFilter, setActiveFilter] = useState(null);

  const memoizedChats = useMemo(() => chats, []);

  useEffect(() => {
    let updatedChats = [...memoizedChats];

    // Фільтрація
    if (activeFilter) {
      updatedChats = updatedChats.filter((chat) => chat.type === activeFilter);
    }

    // Сортування
    updatedChats.sort((a, b) => {
      return sortOrder === "newFirst"
        ? new Date(b.time).getTime() - new Date(a.time).getTime()
        : new Date(a.time).getTime() - new Date(b.time).getTime();
    });

    setSortedAndFilteredChats(updatedChats);
  }, [memoizedChats, sortOrder, activeFilter]);

  const handleSort = () => {
    setSortOrder((prev) => (prev === "newFirst" ? "oldFirst" : "newFirst"));

    // Сортуємо весь початковий список, не впливаючи на фільтри
    // const sorted = [...memoizedChats].sort((a, b) => {
    //   return newSortOrder === "newFirst"
    //     ? new Date(b.time).getTime() - new Date(a.time).getTime()
    //     : new Date(a.time).getTime() - new Date(b.time).getTime();
    // });

    // setSortedChats(sorted);
    // setSortOrder(newSortOrder);

    // if (filteredChats.length > 0) {
    //   const activeFilterType = filteredChats[0].type; // Зберігаємо поточний фільтр
    //   setFilteredChats(sorted.filter((chat) => chat.type === activeFilterType));
    // } else if (filteredChats.length === 0) {
    //   setFilteredChats([]);
    // }
  };

  const handleFilter = (e, type) => {
    e.stopPropagation();
    setActiveFilter((prev) => (prev === type ? null : type)); // Скидаємо фільтр, якщо той самий
  };

  return (
    <div className={css.leftSectionWrapper}>
      {/* LeftSection */}
      {/* <InboxPart handleFilter={handleFilter} /> */}

      <InboxPart
        handleFilter={handleFilter}
        chats={memoizedChats}
        setFilteredChats={setActiveFilter}
      />
      <MessagesPart
        chats={sortedAndFilteredChats}
        // emptyList={filteredChats.length === 0 && filteredChats !== sortedChats}
        handleSort={handleSort}
      />
      {/*<MessagesPart chats={filteredChats} /> */}
    </div>
  );
}
