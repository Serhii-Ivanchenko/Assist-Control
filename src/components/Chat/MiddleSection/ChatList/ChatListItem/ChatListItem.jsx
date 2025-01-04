import { useState } from "react";
import styles from "./ChatListItem.module.css";

function ChatListItem({ message }) {
  const { sender, avatar, author, time, text, files, audio } = message;
  const isClient = sender === "client";
  const messageClass = isClient ? styles.clientMessage : styles.managerMessage;
  const infoClass = isClient ? styles.userInfo : styles.managerInfo;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleImageClick = (url) => {
    setModalImage(url);
    setIsModalOpen(true);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = files.url;
    link.download = files.name;
    link.click();
    console.log("Download file");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={messageClass}>
        <div className={infoClass}>
          <img className={styles.avatar} src={avatar} alt="Avatar" />
          <p className={styles.name}>{author}</p>
          <p className={styles.time}>{time}</p>
        </div>
        <div className={isClient ? styles.message : styles.messageManager}>
          {files && files.type.startsWith("image/") && (
            <img
              src={files.url}
              alt="Зображення повідомлення"
              className={styles.image}
              onClick={() => handleImageClick(files.url)}
            />
          )}
          {files && !files.type.startsWith("image/") && (
            <button onClick={handleDownload} className={styles.downloadBtn}>
              Завантажити файл
            </button>
          )}
          {audio && (
            <audio src={audio} controls className={styles.audioPlayer} />
          )}
          {<p>{text}</p>}
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <img
              src={modalImage}
              alt="Повне зображення"
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatListItem;
