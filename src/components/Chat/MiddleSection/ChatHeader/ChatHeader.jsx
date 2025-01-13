import { useState, useRef, useEffect, useCallback } from "react";
import { BsTelephone, BsThreeDots } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import defImg from "../../../../assets/images/avatar_default.png";
import socialIcon from "../../../../assets/images/ChannelsImages/WhatsApp_1.png";
import TelephonePopup from "./ChatPopups/TelephonePopup";
import SearchPopup from "./ChatPopups/SearchPopup";
import styles from "./ChatHeader.module.css";
import SettingsPopup from "./ChatPopups/SettingsPopup";

function ChatHeader({ searchData, handleFilter, handleReset }) {
  const [activePopup, setActivePopup] = useState(null);
  const popupRef = useRef(null);

  const handlePopupToggle = (popupName) => {
    setActivePopup((prev) => (prev === popupName ? null : popupName));
  };

  const onClose = useCallback(() => {
    setActivePopup(null);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

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
      <div className={styles.actions} ref={popupRef}>
        <button
          className={styles.actionsBtn}
          onClick={() => handlePopupToggle("call")}
        >
          <BsTelephone className={styles.actionIcon} />
        </button>
        {activePopup === "call" && <TelephonePopup onClose={onClose} />}
        <button
          className={styles.actionsBtn}
          onClick={() => handlePopupToggle("search")}
        >
          <IoIosSearch className={styles.actionIcon} />
        </button>
        {activePopup === "search" && (
          <SearchPopup
            searchData={searchData}
            handleFilter={handleFilter}
            handleReset={handleReset}
            onClose={onClose}
          />
        )}
        <button
          className={styles.actionsBtn}
          onClick={() => handlePopupToggle("settings")}
        >
          <BsThreeDots className={styles.actionIcon} />
        </button>
        {activePopup === "settings" && <SettingsPopup onClose={onClose} />}
      </div>
    </div>
  );
}

export default ChatHeader;
