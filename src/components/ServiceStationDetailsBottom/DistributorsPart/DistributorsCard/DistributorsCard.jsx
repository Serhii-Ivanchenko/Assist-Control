import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical, BsInfoCircleFill } from "react-icons/bs";
import defaultImg from "../../../../assets/images/distrImg.png";
import OptionList from "./OptionsList";
import StatusToggle from "./StatusToggle";
import PopupMenu from "./PopupMenu";
import AuthForm from "./AuthForm";
import PopupConnection from "./PopupConnection";
import styles from "./DistributorsCard.module.css";

function DistributorsCard() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isConnectionInfoVisible, setIsConnectionInfoVisible] = useState(false);
  const popupMenuRef = useRef(null);
  const popupConnectionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupMenuRef.current &&
        !popupMenuRef.current.contains(event.target)
      ) {
        setIsPopupActive(false);
      }
      if (
        popupConnectionRef.current &&
        !popupConnectionRef.current.contains(event.target)
      ) {
        setIsConnectionInfoVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoContainer}>
        <div className={styles.nameBox}>
          <h2 className={styles.name}>
            Busmarket
            <BsThreeDotsVertical
              className={styles.popupIcon}
              onClick={() => setIsPopupActive((prev) => !prev)}
            />
          </h2>
          <img className={styles.img} src={defaultImg} alt="DistributionImg" />
        </div>
        <PopupMenu
          isOpen={isPopupActive}
          onClose={() => setIsPopupActive(false)}
          popupRef={popupMenuRef}
        />
        <OptionList />
        <div
          className={styles.connect}
          onClick={() => setIsConnectionInfoVisible((prevState) => !prevState)}
        >
          <BsInfoCircleFill className={styles.connectIcon} />
          <p className={styles.connectText}>Підключення</p>
        </div>
        <PopupConnection
          isOpen={isConnectionInfoVisible}
          onClose={() => setIsConnectionInfoVisible(false)}
          popupRef={popupConnectionRef}
        />
      </div>
      <div className={styles.authBox}>
        <StatusToggle />
        <AuthForm />
      </div>
    </div>
  );
}

export default DistributorsCard;
