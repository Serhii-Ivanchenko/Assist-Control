import { useState } from "react";
import { BsThreeDotsVertical, BsInfoCircleFill } from "react-icons/bs";
import defaultImg from "../../../../assets/images/distrImg.png";
import OptionList from "./OptionsList";
import StatusToggle from "./StatusToggle";
import PopupMenu from "./PopupMenu";
import AuthForm from "./AuthForm";
import Popup from "../Popup/Popup";
import styles from "./DistributorsCard.module.css";

function DistributorsCard() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isConnectionInfoVisible, setIsConnectionInfoVisible] = useState(false);

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
        />
        <OptionList />
        <div
          className={styles.connect}
          onClick={() => setIsConnectionInfoVisible((prev) => !prev)}
        >
          <BsInfoCircleFill className={styles.connectIcon} />
          <p className={styles.connectText}>Підключення</p>
        </div>
        <Popup isOpen={isConnectionInfoVisible}>
          <p className={styles.connectDesc}>
            Для активації доступу введіть логін і пароль від сайту...
          </p>
        </Popup>
      </div>
      <div className={styles.authBox}>
        <StatusToggle />
        <AuthForm />
      </div>
    </div>
  );
}

export default DistributorsCard;
