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

function DistributorsModal({ onClose, distributorData, onToggleDisable }) {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [distributor, setDistributor] = useState(distributorData || {});
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(distributor.name || "");
  const [logo, setLogo] = useState(distributor.logo);

  useEffect(() => {
    if (distributorData) {
      setDistributor(distributorData);
      setEditableName(distributorData.name || "");
      setLogo(distributorData.logo);
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

  const handleToggleDisable = () => {
    if (onToggleDisable) {
      onToggleDisable(!distributor.isDisabled);
    }
    setDistributor((prev) => ({ ...prev, isDisabled: !prev.isDisabled }));
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
                className={styles.inputName}
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
            {logo ? (
              <div>
                <img
                  className={styles.img}
                  src={logo}
                  alt={distributor.name || "Distribution Img"}
                />
                <UploadComponent
                  title="Завантажити лого"
                  name="logo"
                  setLogo={setLogo}
                />
              </div>
            ) : (
              <div className={styles.uploadLogoContainer}>
                <UploadComponent
                  title="Завантажити лого"
                  name="logo"
                  setLogo={setLogo}
                />
              </div>
            )}
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
          <StatusToggle
            isDisabled={distributor.isDisabled}
            onToggleDisable={handleToggleDisable}
          />
          <AuthForm />
          <div>
            <PopupConnection />
          </div>
        </div>
      </div>
      <div className={styles.scheduleContainer}>
        <ScheduleAccordion
          deliveryData={distributor.deliverySchedule || null}
        />
      </div>

      <button className={styles.saveBtn} onClick={handleSave}>
        <RiSave3Fill style={{ transform: "scale(1.2)" }} />
        Зберегти
      </button>
    </div>
  );
}

export default DistributorsModal;
