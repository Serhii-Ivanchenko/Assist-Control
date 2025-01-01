import SearchByMessages from "./SearchByMessages/SearchByMessages";
import { BsPencilSquare } from "react-icons/bs";
import css from "./MessagesPart.module.css";
import ActionsPart from "./ActionsPart/ActionsPart";
import ChatsPart from "./ChatsPart/ChatsPart";

export default function MessagesPart() {
  return (
    <div className={css.messagesPart}>
      <div className={css.titleBox}>
        <p className={css.title}>Повідомлення</p>
        <button type="button" className={css.btn}>
          <BsPencilSquare />
        </button>
      </div>

      <SearchByMessages />
      <ActionsPart />
      <ChatsPart />
    </div>
  );
}
