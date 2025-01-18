import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import telegram from "../../../../../assets/images/ChannelsImages/Telegram_1.png";
// import whatsApp from "../../../../../assets/images/ChannelsImages/WhatsApp_1.png";
// import assist from "../../../../../assets/images/ChannelsImages/logo-rect 1.png";
import facebook from "../../../../../assets/images/ChannelsImages/Facebook_Messenger_1.png";
// import avatar from "../../../../../assets/images/avatar_default.png";
import css from "./ChatsPart.module.css";
import { useState } from "react";
import { BsCheck } from "react-icons/bs";

export default function ChatsPart({
  chats,
  isChecked,
  handleCheckboxChange,
  allChecked,
  handleFavourite,
}) {
  const [chosen, setChosen] = useState(false);

  const handleChoose = (id) => {
    // setChosen(chosen === index ? null : index); // По повторному кліку вибір знімається
    setChosen(id);
  };

  const time = (time) => {
    const newTime = Date.now() - new Date(time).getTime();
    const seconds = Math.floor(newTime / 1000);
    const minutes = Math.floor(newTime / (1000 * 60));
    const hours = Math.floor(newTime / (1000 * 60 * 60));
    const days = Math.floor(newTime / (1000 * 60 * 60 * 24));

    if (seconds < 60) return "now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const warningBorder = (time, read) => {
    const difference = Date.now() - new Date(time).getTime();
    if (difference >= 300000 && !read) {
      return css.warningBorder;
    }
  };

  return (
    <div className={css.scroll}>
      <ul className={css.chatsList}>
        {chats.map((chat, index) => (
          <li
            key={index}
            className={`${css.chatsListItem} 
           ${chosen === chat.id && css.chosenChat}
           ${warningBorder(chat.time, chat.read)}`}
            onClick={() => handleChoose(chat.id)}
          >
            {isChecked && (
              <label className={css.label} onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  name="chat"
                  id="chat"
                  className={css.checkbox}
                  checked={
                    allChecked.find((item) => item.id === chat.id)?.checked ||
                    false
                  }
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(chat.id);
                  }}
                />
                <span className={css.cbMark}>
                  {/* ${isChecked && css.cbMarkIsChecked} */}
                  <BsCheck size={16} className={css.cbIcon} />
                </span>
              </label>
            )}

            <div className={css.avatarBox}>
              <img src={chat.avatar} alt="" className={css.avatar} />
              <img
                src={chat.icon}
                alt=""
                className={`${css.channelIcon} ${
                  (chat.icon === telegram || chat.icon === facebook) &&
                  css.channelIconTF
                }`}
              />
            </div>

            <div className={css.commonBox}>
              <div className={css.nameAndMessageBox}>
                <p className={css.name}>{chat.name}</p>
                <p
                  className={`${css.lastMessage} ${
                    !chat.read && css.freshMessage
                  }`}
                >
                  {chat.lastMessage}
                </p>
              </div>
              <div className={css.timeContainer}>
                <div className={css.managersPhotoBox}>
                  <img
                    src={chat.managersPhoto}
                    alt=""
                    className={css.managersPhoto}
                  />
                  {chat.isChosen ? (
                    <BsBookmarkFill
                      size={18}
                      onClick={(e) => handleFavourite(e, chat.id)}
                    />
                  ) : (
                    <BsBookmark
                      size={18}
                      onClick={(e) => handleFavourite(e, chat.id)}
                    />
                  )}
                </div>
                <p className={css.time}>{time(chat.time)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
