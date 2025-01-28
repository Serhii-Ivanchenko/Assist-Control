import SearchByMessages from "./SearchByMessages/SearchByMessages";
import { BsPencilSquare } from "react-icons/bs";
import css from "./MessagesPart.module.css";
import ActionsPart from "./ActionsPart/ActionsPart";
import ChatsPart from "./ChatsPart/ChatsPart";
import { useState } from "react";
import NewChatPopup from "./NewChatPopup/NewChatPopup";
import { useRef, useEffect } from "react";

export default function MessagesPart({
  chats,
  handleSort,
  sortOrder,
  handleFavourite,
  setDelayedChats,
  setClosedChats,
  setArchiveChats,
  setFavourite,
  setInitialChats,
  initialChats,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [allChecked, setAllChecked] = useState([]);
  // const [checkedChats, setCheckedChats] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      setAllChecked(chats.map((chat) => ({ id: chat.id, checked: false })));
    }
  }, [chats]);

  const handleAllChecked = (event) => {
    const isChecked = event.target.checked;
    setAllChecked(chats.map((chat) => ({ id: chat.id, checked: isChecked })));
  };

  const handleCheckboxChange = (id) => {
    setAllChecked(
      allChecked.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleQuickActions = (action) => {
    console.log("initialChats", initialChats);

    const updatedChats = initialChats.map((chat) => {
      const checkedChat = allChecked.find((item) => item.id === chat.id);

      if (checkedChat && checkedChat.checked) {
        return {
          ...chat,
          [action]: true,

          isChosen:
            action === "archive" || action === "isClosed"
              ? false
              : chat.isChosen,
          isDelayed:
            action === "archive" || action === "isClosed"
              ? false
              : chat.isDelayed,
        };
      }
      return chat;
    });

    setInitialChats(updatedChats);
    setFavourite(updatedChats.filter((chat) => chat.isChosen).length);
    setDelayedChats(updatedChats.filter((chat) => chat.isDelayed).length);
    setClosedChats(updatedChats.filter((chat) => chat.isClosed).length);
    setArchiveChats(updatedChats.filter((chat) => chat.archive).length);
  };

  // useEffect(() => {
  //   console.log("allchecked", allChecked);
  // }, [allChecked]);

  const handleChecked = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <div className={css.messagesPart}>
      <div className={css.titleBox}>
        <p className={css.title}>Повідомлення</p>

        <div className={css.popupBox} ref={wrapperRef}>
          <button
            type="button"
            className={css.btn}
            onClick={() => setIsPopupOpen(!isPopupOpen)}
          >
            <BsPencilSquare />
          </button>
          {isPopupOpen && <NewChatPopup />}
        </div>
      </div>

      <SearchByMessages />
      <ActionsPart
        isChecked={isChecked}
        handleChecked={handleChecked}
        allChecked={allChecked}
        handleAllChecked={handleAllChecked}
        chats={chats}
        handleSort={handleSort}
        sortOrder={sortOrder}
        handleQuickActions={handleQuickActions}
      />
      <ChatsPart
        chats={chats}
        isChecked={isChecked}
        allChecked={allChecked}
        handleCheckboxChange={handleCheckboxChange}
        handleFavourite={handleFavourite}
      />
    </div>
  );
}
