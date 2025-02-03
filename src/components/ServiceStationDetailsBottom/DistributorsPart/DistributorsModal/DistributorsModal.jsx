import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import PopupMenu from "../../../sharedComponents/PopupMenu/PopupMenu";
import AuthForm from "./AuthForm/AuthForm";
import StatusToggle from "../../../sharedComponents/StatusToggle/StatusToggle";
import PopupConnection from "./PopupConnection/PopupConnection";
import DistributorsInfoForm from "./DistributorsInfoForm";
import ScheduleAccordion from "./ScheduleAccordion/ScheduleAccordion";
import { RiSave3Fill } from "react-icons/ri";
import { BsFillCloudUploadFill } from "react-icons/bs";
import styles from "./DistributorsModal.module.css";
import {
  updateSupplierData,
  createSupplier,
  getAllSuppliers,
} from "../../../../redux/settings/operations";
import { useDispatch } from "react-redux";
import { fileToBase64 } from "../../../../utils/convertInBase64";
import toast from "react-hot-toast";

function DistributorsModal({ onClose, distributorData, onToggleDisable }) {
  const dispatch = useDispatch();
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [distributor, setDistributor] = useState(distributorData || {});
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(distributor?.name || "");
  const [logoPreview, setLogoPreview] = useState(
    distributor?.logo ? `${distributor.logo}?t=${Date.now()}` : null
  );
  const [logoBase64, setLogoBase64] = useState(null);

  const buttonRef = useRef(null);
  const formRef = useRef(null);
  const authFormRef = useRef(null);

  console.log("distributor", distributor);

  // !Для розкладу start

  // Парсимо розклад для initialValues, якщо він є або передаємо туди порожній масив
  const parsedSchedule = distributor.deliverySchedule
    ? JSON.parse(distributor.deliverySchedule)
    : [];
  // const detailsRef = useRef();
  const scheduleRef = useRef();

  console.log("parsedSchedule", parsedSchedule);

  // !Для розкладу end

  useEffect(() => {
    if (distributorData) {
      setDistributor(distributorData);
      setEditableName(distributorData?.name || "");
      setLogoPreview(distributorData.logo);
    } else {
      setDistributor({});
      setEditableName("");
      setLogoPreview(null);
    }
  }, [distributorData]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    setLogoPreview(URL.createObjectURL(file));
    if (file) {
      const base64 = await fileToBase64(file);
      setLogoBase64(base64);
    }
  };

  const handleSaveName = () => {
    setDistributor((prev) => ({ ...prev, name: editableName }));
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      // Submit both forms
      if (formRef.current && authFormRef.current) {
        await formRef.current.submitForm();
        await authFormRef.current.submitForm();
      }

      // Отримуємо дані з AuthForm та DistributorsInfoForm
      const authData = authFormRef.current?.values || {};
      const distributorsInfoData = formRef.current?.values || {};

      // Перевірка на заповненість обов'язкових полів
      if (
        !distributor.name?.trim() ||
        !distributorsInfoData.address?.trim() ||
        !distributorsInfoData.managerPhone?.trim()
        // ||
        // !authData.distrEmail?.trim() ||
        // !authData.priceEmail?.trim()
      ) {
        toast.error("Будь ласка, заповніть всі обов'язкові поля.", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
        return; // Не відправляти дані, якщо поля не заповнені
      }

      // Генерація масиву розкладу для відправки
      const scheduleToSend = scheduleRef.current.generateBackendData();
      console.log("scheduleToSend during submit", scheduleToSend);

      const dataToUpdate = {
        supplier_id: distributor.id || "",
        status: distributor.status || 1,
        name: distributor.name || editableName,
        ...authData,
        ...distributorsInfoData,
        logo: logoBase64 || distributor.logo,
        deliverySchedule: scheduleToSend,
      };

      console.log("Updated Payload:", dataToUpdate);

      if (distributor.id) {
        await dispatch(updateSupplierData(dataToUpdate))
          .unwrap()
          .then(() => {
            toast.success("Постачальника успішно оновлено :)", {
              position: "top-center",
              duration: 3000,
              style: {
                background: "var(--bg-input)",
                color: "var(--white)FFF",
              },
            });
            dispatch(getAllSuppliers());
          })
          .catch((error) => {
            console.error("Error updating user data:", error);
            toast.error("Щось пішло не так :(", {
              position: "top-center",
              duration: 3000,
              style: {
                background: "var(--bg-input)",
                color: "var(--white)FFF",
              },
            });
          });
      } else {
        await dispatch(createSupplier(dataToUpdate))
          .unwrap()
          .then(() => {
            toast.success("Постачальника успішно створено :)", {
              position: "top-center",
              duration: 3000,
              style: {
                background: "var(--bg-input)",
                color: "var(--white)FFF",
              },
            });
            dispatch(getAllSuppliers());
          })
          .catch((error) => {
            console.error("Error creating supplier:", error);
            toast.error("Щось пішло не так :(", {
              position: "top-center",
              duration: 3000,
              style: {
                background: "var(--bg-input)",
                color: "var(--white)FFF",
              },
            });
          });
      }

      onClose();
      console.log("Base64 Logo:", logoBase64);
    } catch (error) {
      console.error("Error details:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error message:", error.message);
      console.error(
        "Помилка під час збереження:",
        error.response?.data || error.message
      );
    }
  };

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
      setLogoPreview(distributorData.logo || null);
    } else {
      setDistributor({});
      setEditableName("");
      setLogoPreview(null);
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
            {logoPreview ? (
              <div className={styles.uploadLogoContainer}>
                <img
                  className={styles.img}
                  src={logoPreview || distributor?.logo}
                  alt="Логотип"
                />
                <label className={styles.uploadLabel}>
                  <BsFillCloudUploadFill className={styles.downloadIcon} />
                  Завантажити лого
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    hidden
                  />
                </label>
              </div>
            ) : (
              <div className={styles.uploadLogoContainer}>
                <label className={styles.uploadLabel}>
                  <BsFillCloudUploadFill className={styles.downloadIcon} />
                  Завантажити лого
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    hidden
                  />
                </label>
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
          deliveryData={parsedSchedule.days}
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
