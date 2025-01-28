import { useState } from "react";
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
}) {
  const [isActive, setIsActive] = useState(null);

  return (
    <div className={css.inboxContainer}>
      <div className={css.topPartContainer}>
        <p className={css.title}>Inbox </p>

        <ManagersSelect />

        <div className={css.totalContainer}>
          <div className={css.totalInbox}>
            <p className={`${css.numberBox} ${flashingBorder("all")}`}>
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
      />
    </div>
  );
}
