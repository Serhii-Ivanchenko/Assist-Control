import styles from "./ChatList.module.css";
import ChatListItem from "./ChatListItem/ChatListItem";

function ChatList({ messages }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.date}>Сьогодні, 24 грудня</div>
      {messages.map((message, index) => (
        <ChatListItem key={index} message={message} />
      ))}
    </div>
  );
}

export default ChatList;
