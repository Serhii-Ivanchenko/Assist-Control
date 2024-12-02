import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PopupMenu from "../DistributorsCard/PopupMenu";
import AuthForm from "../DistributorsCard/AuthForm";
import StatusToggle from "../DistributorsCard/StatusToggle";
import PopupConnection from "../DistributorsCard/PopupConnection";
import defaultImg from "../../../../assets/images/distrImg.png";
import styles from "./DistributorsModal.module.css";
import DistributorsInfoForm from "./DistributorsInfoForm";
import ServiceStationDetailsAccordion from "../../../ServiceStationDetailsAccordion/ServiceStationDetailsAccordion";

function DistributorsModal({ onClose }) {
  const [isPopupActive, setIsPopupActive] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainInfo}>
        <div className={styles.credentialsContainer}>
          <div className={styles.nameBox}>
            <h2 className={styles.name}>
              Busmarket
              <BsThreeDotsVertical
                className={styles.popupIcon}
                onClick={() => setIsPopupActive((prev) => !prev)}
              />
            </h2>
            <img
              className={styles.img}
              src={defaultImg}
              alt="DistributionImg"
            />
          </div>
          <PopupMenu
            isOpen={isPopupActive}
            onClose={() => setIsPopupActive(false)}
          />
          <DistributorsInfoForm />
        </div>
        <div className={styles.authContainer}>
          <StatusToggle />
          <AuthForm />
          <div>
            <PopupConnection />
          </div>
        </div>
      </div>
      <div className={styles.scheduleContainer}>
        <ServiceStationDetailsAccordion style={{ width: "900px" }} />
      </div>

      <button className={styles.saveBtn} type="submit" onClick={onClose}>
        Зберегти
      </button>
    </div>
  );
}

export default DistributorsModal;
