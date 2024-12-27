import { useState } from "react";
import css from "./ChatBtn.module.css";
import { BsChatTextFill } from "react-icons/bs";
import Chat from "../Chat/Chat.jsx";

export default function ChatBtn() {
  const [chatIsOpen, setChatIsOpen] = useState(false);

  const toggleChatOpen = () => {
    setChatIsOpen((prev) => !prev);
  };

  const handleChatClose = () => {
    setChatIsOpen(false);
  };

  return (
    <>
      <div className={css.tooltip}>
        <button className={css.btn} onClick={toggleChatOpen}>
          <BsChatTextFill className={css.icon} />
        </button>

        <span className={css.tooltipContent}>Чат</span>
      </div>
      <Chat onClose={handleChatClose} chatIsOpen={chatIsOpen} />
    </>
  );
}
