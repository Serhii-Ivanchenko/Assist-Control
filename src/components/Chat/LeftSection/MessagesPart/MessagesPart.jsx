import SearchByMessages from "./SearchByMessages/SearchByMessages";
import { BsPencilSquare } from "react-icons/bs";
import css from "./MessagesPart.module.css";
import ActionsPart from "./ActionsPart/ActionsPart";
import ChatsPart from "./ChatsPart/ChatsPart";
import { useState } from "react";

export default function MessagesPart({ chats, handleSort, sortOrder }) {
  const [isChecked, setIsChecked] = useState(false);
  // const [allChecked, setAllChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(
    chats.map(() => false) // Динамічне створення стану для кожного елемента
  );

  // const handleAllChecked = () => {
  //   setAllChecked((prev) => !prev);
  // };

  const handleAllChecked = (event) => {
    const isChecked = event.target.checked;
    setAllChecked(chats.map(() => isChecked));
  };

  const handleCheckboxChange = (index) => {
    setAllChecked(allChecked.map((item, i) => (i === index ? !item : item)));
  };

  const handleChecked = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <div className={css.messagesPart}>
      <div className={css.titleBox}>
        <p className={css.title}>Повідомлення</p>
        <button type="button" className={css.btn}>
          <BsPencilSquare />
        </button>
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
      />
      <ChatsPart
        chats={chats}
        isChecked={isChecked}
        allChecked={allChecked}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}
