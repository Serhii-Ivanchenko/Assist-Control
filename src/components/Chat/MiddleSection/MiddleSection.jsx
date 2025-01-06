import ChatHeader from "./ChatHeader/ChatHeader";
import ChatList from "./ChatList/ChatList";
import MessageInput from "./MessageInput/MessageInput";
import defImg from "../../../assets/images/avatar_default.png";

import css from "./MiddleSection.module.css";
import { useState } from "react";

export default function MiddleSection() {
  const [messages, setMessages] = useState([
    {
      sender: "client",
      author: "Олександр Мельник",
      avatar: defImg,
      text: "Вітаю! Чи можна записатися на діагностику електрики та двигуна?",
      time: "09:00",
      files: null,
    },
    {
      sender: "manager",
      author: "Ліза (менеджер)",
      avatar: defImg,
      text: "Доброго дня, Олександре! Так, ми можемо записати вас на діагностику електрики та двигуна. Скажіть, будь ласка, який день і час вам зручні?",
      time: "09:04",
      files: null,
    },
    {
      sender: "client",
      author: "Олександр Мельник",
      avatar: defImg,
      text: "Мені було б зручно приїхати завтра після обіду, наприклад, о 15:00. Це можливо?",
      time: "09:07",
      files: null,
    },
    {
      sender: "manager",
      author: "Ліза (менеджер)",
      avatar: defImg,
      text: "Завтра о 15:00 підходить. Ми записали вас на діагностику. Адреса нашого автосервісу: вул. Центральна, 45. Якщо виникнуть додаткові питання, звертайтеся!",
      time: "09:08",
      files: null,
    },
    {
      sender: "client",
      author: "Олександр Мельник",
      avatar: defImg,
      text: "Дуже дякую за швидку відповідь! До зустрічі",
      time: "09:10",
      files: null,
    },
  ]);

  const addNewMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };
  return (
    <div className={css.middleSectionWrapper}>
      <ChatHeader />
      <ChatList messages={messages} />
      <MessageInput addNewMessage={addNewMessage} />
    </div>
  );
}
