import { BsTelephone, BsThreeDots } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import defImg from "../../../../assets/images/avatar_default.png";
import socialIcon from "../../../../assets/images/ChannelsImages/WhatsApp_1.png";
import styles from "./ChatHeader.module.css";

function ChatHeader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img className={styles.avatar} src={defImg} alt="Default avatar" />
        <img className={styles.socialIcon} src={socialIcon} alt="Social Icon" />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>Олександр Мельник</p>
        <p className={styles.status}>Був онлайн недавно</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.actionsBtn}>
          <BsTelephone />
        </button>
        <button className={styles.actionsBtn}>
          <IoIosSearch />
        </button>
        <button className={styles.actionsBtn}>
          <BsThreeDots />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
