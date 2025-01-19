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
      isChosen: true,
      isDelayed: false,
      isClosed: false,
      archive: false,
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
      isChosen: true,
      isDelayed: false,
      isClosed: false,
      archive: false,
      type: "facebook",
      avatar: avatar,
      icon: facebook,
      name: "Анастасія Шевченко",
      lastMessage:
        "Доброго дня! У мене є питання щодо ремонту коробки переда...",
      managersPhoto: avatar,
      time: "2025-01-05T12:45:33",
      read: false,
      id: "2",
    },
    {
      category: "chat",
      isChosen: true,
      isDelayed: false,
      isClosed: false,
      archive: false,
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
      isChosen: false,
      isDelayed: true,
      isClosed: false,
      archive: false,
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
      isChosen: true,
      isDelayed: true,
      isClosed: false,
      archive: false,
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
      isChosen: false,
      isDelayed: false,
      isClosed: false,
      archive: true,
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
      isChosen: true,
      isDelayed: true,
      isClosed: false,
      archive: false,
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
      isChosen: false,
      isDelayed: false,
      isClosed: false,
      archive: true,
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
      isChosen: false,
      isDelayed: true,
      isClosed: false,
      archive: false,
      type: "facebook",
      avatar: avatar,
      icon: facebook,
      name: "Анастасія Шевченко",
      lastMessage:
        "Доброго дня! У мене є питання щодо ремонту коробки переда...",
      managersPhoto: avatar,
      time: "2025-01-18T16:00:33",
      read: true,
      id: "9",
    },
    {
      category: "email",
      isChosen: true,
      isDelayed: false,
      isClosed: false,
      archive: false,
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
  const [activeFilterState, setActiveFilterState] = useState(null);
  const memoizedChats = useMemo(() => chats, []);
  const [initialChats, setInitialChats] = useState(memoizedChats);

  const filteredChats = initialChats.filter(
    (chat) => !chat.archive && !chat.isClosed
  );

  const [favourite, setFavourite] = useState(
    filteredChats.filter((chat) => chat.isChosen === true).length
  );
  const [delayedChats, setDelayedChats] = useState(
    filteredChats.filter((chat) => chat.isDelayed === true).length
  );
  const [closedChats, setClosedChats] = useState(
    initialChats.filter((chat) => chat.isClosed === true).length
  );
  const [archiveChats, setArchiveChats] = useState(
    initialChats.filter((chat) => chat.archive === true).length
  );

  const categoryCounts = useMemo(() => {
    return {
      email: filteredChats.filter((chat) => chat.category === "email").length,
      chat: filteredChats.filter((chat) => chat.category === "chat").length,
      delayed: delayedChats,
      closed: closedChats,
      chosen: favourite,
      archive: archiveChats,
    };
  }, [filteredChats, favourite, delayedChats, closedChats, archiveChats]);

  useEffect(() => {
    let updatedChats = [...initialChats];

    if (
      !activeFilterState ||
      (activeFilterState !== "archive" && activeFilterState !== "closed")
    ) {
      updatedChats = updatedChats.filter(
        (chat) => !chat.archive && !chat.isClosed
      );
    }

    // Фільтрація
    if (activeFilter) {
      updatedChats = updatedChats.filter((chat) => chat.type === activeFilter);
    }

    if (activeFilterCategory) {
      updatedChats = updatedChats.filter(
        (chat) => chat.category === activeFilterCategory
      );
    }

    if (activeFilterState) {
      updatedChats = updatedChats.filter((chat) => {
        switch (activeFilterState) {
          case "chosen":
            return chat.isChosen;
          case "delayed":
            return chat.isDelayed;
          case "archive":
            return chat.archive;
          case "closed":
            return chat.isClosed;
          default:
            return true;
        }
      });
    }

    // Сортування
    updatedChats.sort((a, b) => {
      return sortOrder === "newFirst"
        ? new Date(b.time).getTime() - new Date(a.time).getTime()
        : new Date(a.time).getTime() - new Date(b.time).getTime();
    });

    setSortedAndFilteredChats(updatedChats);
  }, [
    initialChats,
    sortOrder,
    activeFilter,
    activeFilterCategory,
    activeFilterState,
  ]);

  const handleSort = () => {
    setSortOrder((prev) => (prev === "newFirst" ? "oldFirst" : "newFirst"));
  };

  const handleFilter = (e, type, filterType) => {
    e.stopPropagation();

    switch (filterType) {
      case "category":
        setActiveFilterCategory(type);
        setActiveFilterState(null);
        break;
      case "channel":
        setActiveFilter(type);
        break;
      case "state":
        setActiveFilterState(type);
        setActiveFilterCategory(null);
        break;
      default:
        return;
    }
  };

  const handleFavourite = (e, id) => {
    e.stopPropagation();

    const updatedChats = initialChats.map((chat) =>
      chat.id === id ? { ...chat, isChosen: !chat.isChosen } : chat
    );

    setInitialChats(updatedChats);

    // Оновлюємо кількість обраних чатів
    const newChosenCount = updatedChats.filter((chat) => chat.isChosen).length;
    setFavourite(newChosenCount);
  };

  const flashingBorder = (type) => {
    const hasWarning = initialChats.some((chat) => {
      const time = Date.now() - new Date(chat.time).getTime();
      return (
        time >= 300000 && !chat.read && (chat.type === type || type === "all")
      );
    });
    return hasWarning ? css.warningBorder : "";
  };

  return (
    <div className={css.leftSectionWrapper}>
      <InboxPart
        handleFilter={handleFilter}
        chats={initialChats}
        setFilteredChats={setActiveFilter}
        setActiveFilterCategory={setActiveFilterCategory}
        setActiveFilterState={setActiveFilterState}
        categoryCounts={categoryCounts}
        flashingBorder={flashingBorder}
      />
      <MessagesPart
        chats={sortedAndFilteredChats}
        handleSort={handleSort}
        sortOrder={sortOrder}
        handleFavourite={handleFavourite}
        setDelayedChats={setDelayedChats}
        setClosedChats={setClosedChats}
        setArchiveChats={setArchiveChats}
        setFavourite={setFavourite}
        setInitialChats={setInitialChats}
        initialChats={initialChats}
      />
    </div>
  );
}
