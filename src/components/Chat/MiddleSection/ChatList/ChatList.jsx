import { useRef, useEffect } from "react";
import styles from "./ChatList.module.css";
import ChatListItem from "./ChatListItem/ChatListItem";

function ChatList({ messages, inputHeight }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const maxWrapperHeight = 864;
      wrapperRef.current.style.maxHeight = `${
        maxWrapperHeight - inputHeight
      }px`;
    }
  }, [inputHeight]);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.date}>Сьогодні, 24 грудня</div>
      {messages.map((message, index) => (
        <ChatListItem key={index} message={message} />
      ))}
    </div>
  );
}

export default ChatList;
