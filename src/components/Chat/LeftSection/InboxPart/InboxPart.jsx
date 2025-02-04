import { useEffect, useState } from "react";
import ChannelsPart from "./ChannelsPart/ChannelsPart";
import EmailType from "./EmailType/EmailType";
import css from "./InboxPart.module.css";
// import { IoIosArrowDown } from "react-icons/io";
import ManagersSelect from "./ManagersSelect/ManagersSelect";

export default function InboxPart({
  handleFilter,
  chats,
  setFilteredChats,
  setActiveFilterCategory,
  setActiveFilterState,
  categoryCounts,
  flashingBorder,
  sortedChats,
}) {
  const [isActive, setIsActive] = useState(null);
  const [hasExpiredChats, setHasExpiredChats] = useState(false);

  useEffect(() => {
    const checkExpiredChats = () => {
      const now = Date.now();

      const hasExpired = sortedChats.some(
        (chat) => !chat.read && now - new Date(chat.time).getTime() >= 30000
      );

      setHasExpiredChats(hasExpired);
    };

    checkExpiredChats();

    const interval = setInterval(checkExpiredChats, 1000);

    return () => clearInterval(interval);
  }, [sortedChats]);

  return (
    <div className={css.inboxContainer}>
      <div className={css.topPartContainer}>
        <p className={css.title}>Inbox </p>

        <ManagersSelect />

        <div className={css.totalContainer}>
          <div className={css.totalInbox}>
            <p
              className={`${css.numberBox} ${
                hasExpiredChats ? css.warningBorder : ""
              }`}
            >
              {chats.length}
            </p>
            <button
              type="button"
              className={`${css.text} ${css.textIsActive}`}
              onClick={() => {
                setActiveFilterCategory(null);
                setActiveFilterState(null);
                setIsActive(false);
              }}
            >
              Клієнти
            </button>
          </div>

          <div className={css.totalInbox}>
            <p className={css.numberBox}>1</p>
            <button type="button" className={css.text}>
              Колеги
            </button>
          </div>
        </div>
      </div>

      <EmailType
        handleFilter={handleFilter}
        chats={chats}
        isActive={isActive}
        setIsActive={setIsActive}
        categoryCounts={categoryCounts}

        // setActiveFilterCategory={setActiveFilterCategory}
      />
      <ChannelsPart
        handleFilter={handleFilter}
        chats={chats}
        setFilteredChats={setFilteredChats}
        flashingBorder={flashingBorder}
        categoryCounts={categoryCounts}
        sortedChats={sortedChats}
      />
    </div>
  );
}
