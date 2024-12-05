import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PopupMenu from "../../../sharedComponents/PopupMenu/PopupMenu";
import AuthForm from "./AuthForm/AuthForm";
import StatusToggle from "../../../sharedComponents/StatusToggle/StatusToggle";
import PopupConnection from "./PopupConnection/PopupConnection";
import DistributorsInfoForm from "./DistributorsInfoForm";
import ScheduleAccordion from "./ScheduleAccordion/ScheduleAccordion";
import UploadComponent from "../../../sharedComponents/UploadComponent/UploadComponent";
import { RiSave3Fill } from "react-icons/ri";
import styles from "./DistributorsModal.module.css";

function DistributorsModal({ onClose, distributorData }) {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [distributor, setDistributor] = useState(distributorData || {});
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(distributor.name || "");

  useEffect(() => {
    if (distributorData) {
      setDistributor(distributorData);
      setEditableName(distributorData.name || "");
    }
  }, [distributorData]);

  const handleSaveName = () => {
    setDistributor((prev) => ({ ...prev, name: editableName }));
    setIsEditing(false);
  };

  const handleSave = () => {
    //тут буде логіка пердачі даних на бек
    console.log(distributor);
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainInfo}>
        <div className={styles.credentialsContainer}>
          <div className={styles.nameBox}>
            {isEditing ? (
              <input
                type="text"
                value={editableName}
                onChange={(e) => setEditableName(e.target.value)}
                onBlur={handleSaveName}
                className={styles.input}
                autoFocus
              />
            ) : (
              <h2 className={styles.name}>{distributor.name || "Назва"}</h2>
            )}
            <BsThreeDotsVertical
              className={styles.popupIcon}
              onClick={() => setIsPopupActive((prev) => !prev)}
            />
          </div>
          <div className={styles.imgWrapper}>
            {distributor.logo && (
              <img
                className={styles.img}
                src={distributor.logo}
                alt={distributor.name || "Distribution Img"}
              />
            )}

            {!distributor.logo && (
              <div className={styles.uploadLogoText}>Завантажити лого</div>
            )}
            <UploadComponent />
          </div>

          <PopupMenu
            isOpen={isPopupActive}
            onClose={() => setIsPopupActive(false)}
            onEdit={() => {
              setIsEditing(true);
              setIsPopupActive(false);
            }}
          />
          <DistributorsInfoForm
            distributor={distributor}
            setDistributor={setDistributor}
          />
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
        <ScheduleAccordion />
      </div>

      <button className={styles.saveBtn} type="submit" onClick={handleSave}>
        <RiSave3Fill style={{ transform: "scale(1.2)" }} />
        Зберегти
      </button>
    </div>
  );
}

export default DistributorsModal;
