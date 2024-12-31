import { BsBookmark } from "react-icons/bs";
import telegram from "../../../../../assets/images/ChannelsImages/Telegram_1.png";
import whatsApp from "../../../../../assets/images/ChannelsImages/WhatsApp_1.png";
import assist from "../../../../../assets/images/ChannelsImages/logo-rect 1.png";
import facebook from "../../../../../assets/images/ChannelsImages/Facebook_Messenger_1.png";
import avatar from "../../../../../assets/images/avatar_default.png";
import css from "./ChatsPart.module.css";
import { useState } from "react";

export default function ChatsPart() {
  const chats = [
    {
      avatar: avatar,
      icon: whatsApp,
      name: "Олександр Мельник",
      lastMessage:
        "Вітаю! Чи можна записатися на діагностику електрики та двигу...",
      managersPhoto: avatar,
      time: "4m ago",
      read: false,
    },
    {
      avatar: avatar,
      icon: facebook,
      name: "Анастасія Шевченко",
      lastMessage:
        "Доброго дня! У мене є питання щодо ремонту коробки переда...",
      managersPhoto: avatar,
      time: "15m ago",
      warning: true,
      read: false,
    },
    {
      avatar: avatar,
      icon: telegram,
      name: "Максим Гончаренко",
      lastMessage:
        "Привіт! Чи є вільні місця для запису на наступний тиждень у...",
      managersPhoto: avatar,
      time: "15m ago",
      read: true,
    },
    {
      avatar: avatar,
      icon: assist,
      name: "Ірина Коваль",
      lastMessage:
        "Дякую за швидку відповідь! Я хотіла б уточнити вартість зам...",
      managersPhoto: avatar,
      time: "2h ago",
      read: true,
    },
    {
      avatar: avatar,
      icon: telegram,
      name: "Дмитро Поліщук",
      lastMessage: "Доброго ранку! Ви працюєте з автомобілями американськог...",
      managersPhoto: avatar,
      time: "3h ago",
      read: true,
    },
    {
      avatar: avatar,
      icon: facebook,
      name: "Анастасія Шевченко",
      lastMessage:
        "Доброго дня! У мене є питання щодо ремонту коробки переда...",
      managersPhoto: avatar,
      time: "1d ago",
      read: true,
    },
  ];

  const [chosen, setChosen] = useState(false);

  const handleChoose = (index) => {
    // setChosen(chosen === index ? null : index); // По повторному кліку вибір знімається
    setChosen(index);
  };

  return (
    <div>
      <ul className={css.chatsList}>
        {chats.map((chat, index) => (
          <li
            key={index}
            className={`${css.chatsListItem} ${
              chat.warning && css.warningBorder
            } ${chosen === index && css.chosenChat}`}
            onClick={() => handleChoose(index)}
          >
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
