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
      read: true,
      id: "1",
      messages: [
        {
          messageId: "101",
          text: "Вітаю! Чи можна записатися на діагностику?",
          timestamp: "2024-12-28T10:40:00",
        },
        {
          messageId: "102",
          text: "Так, звісно! Вам зручніше зранку чи після обіду?",
          timestamp: "2024-12-28T10:41:15",
        },
        {
          messageId: "103",
          text: "Після обіду, будь ласка.",
          timestamp: "2024-12-28T10:42:30",
        },
      ],
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
      time: "2025-02-04T00:34:20",
      read: false,
      id: "2",
      messages: [
        {
          messageId: "201",
          text: "Доброго дня! Підкажіть, будь ласка, щодо ремонту КПП.",
          timestamp: "2025-02-04T00:30:00",
        },
        {
          messageId: "202",
          text: "Вітаю! У вас автомат чи механіка?",
          timestamp: "2025-02-04T00:31:10",
        },
        {
          messageId: "203",
          text: "Автомат, 2018 року.",
          timestamp: "2025-02-04T00:32:45",
        },
      ],
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
      messages: [
        {
          messageId: "301",
          text: "Привіт! Чи є вільні місця на наступний тиждень?",
          timestamp: "2025-01-10T01:40:00",
        },
        {
          messageId: "302",
          text: "Так, є вівторок і четвер, який день вам зручний?",
          timestamp: "2025-01-10T01:41:20",
        },
        {
          messageId: "303",
          text: "Вівторок, будь ласка.",
          timestamp: "2025-01-10T01:42:50",
        },
      ],
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
      messages: [
        {
          messageId: "401",
          text: "Дякую за швидку відповідь!",
          timestamp: "2024-12-28T10:40:00",
        },
        {
          messageId: "402",
          text: "Я хотіла б уточнити вартість заміни гальм.",
          timestamp: "2024-12-28T10:41:30",
        },
        {
          messageId: "403",
          text: "Вартість залежить від моделі авто, можете уточнити?",
          timestamp: "2024-12-28T10:42:50",
        },
      ],
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
      messages: [
        {
          messageId: "501",
          text: "Доброго ранку! Ви працюєте з авто з США?",
          timestamp: "2024-12-31T10:40:00",
        },
        {
          messageId: "502",
          text: "Так, можемо зробити діагностику. Яка модель вас цікавить?",
          timestamp: "2024-12-31T10:41:15",
        },
        {
          messageId: "503",
          text: "Ford Escape 2021 року.",
          timestamp: "2024-12-31T10:42:30",
        },
      ],
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
      messages: [
        {
          messageId: "601",
          text: "Доброго ранку! Ви працюєте з авто з США?",
          timestamp: "2024-12-31T10:40:00",
        },
        {
          messageId: "602",
          text: "Так, можемо зробити діагностику. Яка модель вас цікавить?",
          timestamp: "2024-12-31T10:41:16",
        },
        {
          messageId: "603",
          text: "Ford Escape 2021 року.",
          timestamp: "2024-12-31T10:42:30",
        },
      ],
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
      time: "2025-02-04T00:45:00",
      read: false,
      id: "7",
      messages: [
        {
          messageId: "701",
          text: "Доброго ранку! Ви працюєте з авто з США?",
          timestamp: "2024-12-31T10:40:00",
        },
        {
          messageId: "702",
          text: "Так, можемо зробити діагностику. Яка модель вас цікавить?",
          timestamp: "2024-12-31T10:41:17",
        },
        {
          messageId: "703",
          text: "Ford Escape 2021 року.",
          timestamp: "2024-12-31T10:42:30",
        },
      ],
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
      messages: [
        {
          messageId: "801",
          text: "Доброго ранку! Ви працюєте з авто з США?",
          timestamp: "2024-12-31T10:40:00",
        },
        {
          messageId: "802",
          text: "Так, можемо зробити діагностику. Яка модель вас цікавить?",
          timestamp: "2024-12-31T10:41:18",
        },
        {
          messageId: "803",
          text: "Ford Escape 2021 року.",
          timestamp: "2024-12-31T10:42:30",
        },
      ],
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
      messages: [
        {
          messageId: "901",
          text: "Доброго ранку! Ви працюєте з авто з США?",
          timestamp: "2024-12-31T10:40:00",
        },
        {
          messageId: "902",
          text: "Так, можемо зробити діагностику. Яка модель вас цікавить?",
          timestamp: "2024-12-31T10:41:19",
        },
        {
          messageId: "903",
          text: "Ford Escape 2021 року.",
          timestamp: "2024-12-31T10:42:30",
        },
      ],
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
      messages: [
        {
          messageId: "1001",
          text: "Доброго ранку! Ви працюєте з авто з США?",
          timestamp: "2024-12-31T10:40:00",
        },
        {
          messageId: "1002",
          text: "Так, можемо зробити діагностику. Яка модель вас цікавить?",
          timestamp: "2024-12-31T10:41:10",
        },
        {
          messageId: "1003",
          text: "Ford Escape 2021 року.",
          timestamp: "2024-12-31T10:42:30",
        },
      ],
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
  const [filterByWord, setFilterByWord] = useState("");

  useEffect(() => {
    console.log("filterByWord", filterByWord);
  }, [filterByWord]);

  const categoryCounts = useMemo(() => {
    return {
      email: filteredChats.filter((chat) => chat.category === "email").length,
      chat: filteredChats.filter((chat) => chat.category === "chat").length,
      delayed: delayedChats,
      closed: closedChats,
      chosen: favourite,
      archive: archiveChats,
      telegram: filteredChats.filter((chat) => chat.type === "telegram").length,
      facebook: filteredChats.filter((chat) => chat.type === "facebook").length,
      whatsApp: filteredChats.filter((chat) => chat.type === "whatsApp").length,
      site: filteredChats.filter((chat) => chat.type === "site").length,
      gmail: filteredChats.filter((chat) => chat.type === "gmail").length,
      assist: filteredChats.filter((chat) => chat.type === "assist").length,
    };
  }, [filteredChats, favourite, delayedChats, closedChats, archiveChats]);

  // console.log(categoryCounts.telegram);

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

    if (filterByWord && updatedChats.length > 0) {
      updatedChats = updatedChats.map((chat) => ({
        ...chat,
        messages: chat.messages.filter((message) =>
          message.text.toLowerCase().includes(filterByWord.toLowerCase())
        ),
      }));
    }
    console.log("filterByWord", filterByWord);
    console.log(updatedChats);

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
    filterByWord,
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

  return (
    <div className={css.leftSectionWrapper}>
      <InboxPart
        handleFilter={handleFilter}
        chats={initialChats}
        sortedChats={sortedAndFilteredChats}
        setFilteredChats={setActiveFilter}
        setActiveFilterCategory={setActiveFilterCategory}
        setActiveFilterState={setActiveFilterState}
        categoryCounts={categoryCounts}
        // flashingBorder={flashingBorder}
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
        setFilterByWord={setFilterByWord}
      />
    </div>
  );
}
