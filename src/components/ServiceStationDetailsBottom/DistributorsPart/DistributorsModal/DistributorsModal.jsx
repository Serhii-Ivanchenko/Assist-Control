import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
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
  const buttonRef = useRef(null);

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
    console.log(distributor);
    onClose();
  };

  const formRef = useRef(null);
  const authFormRef = useRef(null);
  const scheduleRef = useRef();

  const handleResetForm = () => {
    if (formRef.current) {
      formRef.current.resetForm();
    }
    if (authFormRef.current) {
      authFormRef.current.resetForm();
    }
  };

  const handleReset = () => {
    if (distributorData) {
      setDistributor(distributorData);
      setEditableName(distributorData.name || "");
      setLogo(distributorData.logo);
    } else {
      setDistributor({});
      setEditableName("");
      setLogo(null);
    }
    setIsEditing(false);
    handleResetForm();
  };

  const handleResetSchedule = () => {
    if (scheduleRef.current) {
      scheduleRef.current.resetGridData();
    }
  };

  const handleToggleDisable = () => {
    if (onToggleDisable) {
      onToggleDisable(!distributor.isDisabled);
    }
    setDistributor((prev) => ({ ...prev, isDisabled: !prev.isDisabled }));
  };

  const handlePopupToggle = (e) => {
    e.stopPropagation();
    setIsPopupActive((prevState) => !prevState);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setIsPopupActive(false);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.exitBtn}>
        <IoIosClose className={styles.icon} onClick={onClose} />
      </button>
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

            <button
              className={styles.btn}
              onClick={handlePopupToggle}
              ref={buttonRef}
            >
              <BsThreeDotsVertical className={styles.popupIcon} />
              <div>
                <PopupMenu
                  isOpen={isPopupActive}
                  onClose={() => setIsPopupActive(false)}
                  buttonRef={buttonRef}
                  onDelete={() => {}}
                  containerRef
                  innerAccRef
                  onEdit={handleEdit}
                />
              </div>
            </button>
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
          <DistributorsInfoForm
            distributor={distributor}
            setDistributor={setDistributor}
            formikRef={formRef}
          />
        </div>
        <div className={styles.authContainer}>
          <StatusToggle
            isDisabled={distributor.isDisabled}
            onToggleDisable={handleToggleDisable}
          />
          <AuthForm formikRef={authFormRef} />
          <div>
            <PopupConnection />
          </div>
        </div>
      </div>
      <div className={styles.scheduleContainer}>
        <ScheduleAccordion
          ref={scheduleRef}
          deliveryData={distributor.deliverySchedule || null}
        />
      </div>
      <div className={styles.btnGroup}>
        <button
          className={styles.resetBtn}
          onClick={() => {
            handleReset();
            handleResetSchedule();
          }}
        >
          Відміна
        </button>
        <button className={styles.saveBtn} onClick={handleSave}>
          <RiSave3Fill style={{ transform: "scale(1.2)" }} />
          Зберегти
        </button>
      </div>
    </div>
  );
}

export default DistributorsModal;
