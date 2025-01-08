import { BsBookmark } from "react-icons/bs";
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
}) {
  const [chosen, setChosen] = useState(false);

  const handleChoose = (id) => {
    // setChosen(chosen === index ? null : index); // По повторному кліку вибір знімається
    setChosen(id);
  };

  return (
    <div>
      <ul className={css.chatsList}>
        {chats.map((chat, index) => (
          <li
            key={index}
            className={`${css.chatsListItem} ${
              chat.warning && css.warningBorder
            } ${chosen === chat.id && css.chosenChat}`}
            onClick={() => handleChoose(chat.id)}
          >
            {isChecked && (
              <label className={css.label} onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  name="chat"
                  id="chat"
                  className={css.checkbox}
                  checked={allChecked[index]}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(index);
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
                  <BsBookmark size={18} />
                </div>
                <p className={css.time}>{chat.time}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
