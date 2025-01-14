import InboxPart from "./InboxPart/InboxPart";
import css from "./LeftSection.module.css";
import MessagesPart from "./MessagesPart/MessagesPart";
import whatsApp from "../../../assets/images/ChannelsImages/WhatsApp_1.png";
import assist from "../../../assets/images/ChannelsImages/logo-rect 1.png";
import facebook from "../../../assets/images/ChannelsImages/Facebook_Messenger_1.png";
import avatar from "../../../assets/images/avatar_default.png";
import telegram from "../../../assets/images/ChannelsImages/Telegram_1.png";
import gmail from "../../../assets/images/ChannelsImages/Gmail_icon_1.png";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

export default function LeftSection() {
  const chats = [
    {
      category: "chat",
      // subcategory: "favourite",
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
      category: "chat",
      // subcategory: "favourite",
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
      category: "chat",
      // subcategory: "archive",
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
      category: "chat",
      // subcategory: "archive",
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
      category: "chat",
      // subcategory: "delayed",
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
      category: "chat",
      // subcategory: "archive",
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
      category: "chat",
      // subcategory: "archive",
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
      category: "chat",
      // subcategory: "closed",
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
      category: "chat",
      // subcategory: "closed",
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
    {
      category: "email",
      // subcategory: "favourite",
      type: "gmail",
      avatar: avatar,
      icon: gmail,
      name: "Анастасія Шевченко",
      lastMessage:
        "Доброго дня! У мене є питання щодо ремонту коробки переда...",
      managersPhoto: avatar,
      time: "2025-01-11T19:27:33",
      read: true,
      id: "10",
    },
  ];

  // const [sortedChats, setSortedChats] = useState([]);
  // const [filteredChats, setFilteredChats] = useState([]);
  const [sortedAndFilteredChats, setSortedAndFilteredChats] = useState([]);
  const [sortOrder, setSortOrder] = useState("newFirst");
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeFilterCategory, setActiveFilterCategory] = useState(null);

  const memoizedChats = useMemo(() => chats, []);

  useEffect(() => {
    let updatedChats = [...memoizedChats];

    // Фільтрація
    if (activeFilter) {
      updatedChats = updatedChats.filter((chat) => chat.type === activeFilter);
    }

    if (activeFilterCategory) {
      updatedChats = updatedChats.filter(
        (chat) => chat.category === activeFilterCategory
      );
    }

    // Сортування
    updatedChats.sort((a, b) => {
      return sortOrder === "newFirst"
        ? new Date(b.time).getTime() - new Date(a.time).getTime()
        : new Date(a.time).getTime() - new Date(b.time).getTime();
    });

    setSortedAndFilteredChats(updatedChats);
  }, [memoizedChats, sortOrder, activeFilter, activeFilterCategory]);

  const handleSort = () => {
    setSortOrder((prev) => (prev === "newFirst" ? "oldFirst" : "newFirst"));
  };

  const handleFilter = (e, type, isCategory = false) => {
    e.stopPropagation();

    if (isCategory) {
      setActiveFilterCategory(type);
    } else {
      setActiveFilter(type);
    }
  };

  return (
    <div className={css.leftSectionWrapper}>
      {/* LeftSection */}
      {/* <InboxPart handleFilter={handleFilter} /> */}

      <InboxPart
        handleFilter={handleFilter}
        chats={memoizedChats}
        setFilteredChats={setActiveFilter}
        // setActiveFilterCategory={setActiveFilterCategory}
      />
      <MessagesPart
        chats={sortedAndFilteredChats}
        // emptyList={filteredChats.length === 0 && filteredChats !== sortedChats}
        handleSort={handleSort}
        sortOrder={sortOrder}
      />
      {/*<MessagesPart chats={filteredChats} /> */}
    </div>
  );
}
