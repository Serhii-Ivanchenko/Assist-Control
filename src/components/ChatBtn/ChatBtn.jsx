import css from "./ChatBtn.module.css";
import { BsChatTextFill } from "react-icons/bs";
import Chat from "../Chat/Chat.jsx";
import { useDispatch } from "react-redux";
import { closeChat, toggleChat } from "../../redux/chat/slice.js";
import { useSelector } from "react-redux";
import { selectIsChatOpen } from "../../redux/chat/selectors.js";

export default function ChatBtn() {
  const dispatch = useDispatch();
  const chatIsOpen = useSelector(selectIsChatOpen);

  const handleToggleChat = () => {
    dispatch(toggleChat());
  };

  const handleChatClose = () => {
    dispatch(closeChat());
  };

  return (
    <>
      <div className={css.tooltip}>
        <button className={css.btn} onClick={handleToggleChat}>
          <BsChatTextFill className={css.icon} />
        </button>

        <span className={css.tooltipContent}>Чат</span>
      </div>
      <Chat onClose={handleChatClose} chatIsOpen={chatIsOpen} />
    </>
  );
}
