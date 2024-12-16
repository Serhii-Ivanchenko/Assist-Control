import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdDoneAll } from "react-icons/io";
import PopupMenu from "../../../../sharedComponents/PopupMenu/PopupMenu";
import styles from "./ServiceItem.module.css";
import toast from "react-hot-toast";

function ServiceItem({
  id,
  serviceData,
  unsavedServices,
  onDelete,
  innerAccRef,
  containerRef,
  resetPrice,
  onLocalSave,
  isLocalSave, // ?
  resetService,
  serviceItemEdit,
  setServiceItemEdit,
}) {
  const [serviceName, setServiceName] = useState(serviceData.item);
  // const [serviceItemEdit, setServiceItemEdit] = useState(false);
  const [activePopupId, setActivePopupId] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const inputRef = useRef();
  const buttonRef = useRef(null);

  const handlePopupToggle = () => {
    setActivePopupId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id) => {
    setServiceItemEdit(id);
    setActivePopupId(null);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleCurrentSave = () => {
    const updatedService = {
      id,
      item: serviceName,
      minPrice,
      maxPrice,
    };

    localStorage.setItem(id, JSON.stringify(updatedService));
    unsavedServices[id] = false;

    setIsEdit(false);
    onLocalSave(true);
    toast.success("Дані послуг успішно збережено!");
    if (onUnsavedChanges) {
      onUnsavedChanges(false);
    }
  };

  useEffect(() => {
    if (isLocalSave && unsavedServices && unsavedServices[id]) {
      toast.error(`Збережіть зміни для послуги: ${serviceName}`);
    }
    if (onUnsavedChanges) {
      onUnsavedChanges(unsavedServices[id]);
    }
  }, [unsavedServices, id, serviceName, onUnsavedChanges, isLocalSave]);

  useEffect(() => {
    if (resetPrice || resetService) {
      setServiceName(serviceData.item);
      setServiceItemEdit(false); // Завжди скидаємо режим редагування
    }
  }, [resetPrice, resetService, serviceData.item]);

  // useEffect(() => {
  //   if (serviceItemEdit) {
  //     setServiceItemEdit(true);
  //     onUpdate({ id, name: serviceName });
  //   }
  // }, [id, serviceItemEdit, onUpdate, serviceName]);

  console.log("serviceItemEdit in ServiceItem", serviceItemEdit);
  console.log("id in ServiceItem", id);

  return (
    <>
      {serviceItemEdit === id ? (
        <div className={styles.editInputBox}>
          <input
            className={styles.editInput}
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            autoFocus
            ref={inputRef}
          />
        </div>
      ) : (
        <div className={styles.inputBox}>
          <p className={styles.text}>{serviceName}</p>
        </div>
      )}

      <div className={styles.inputsContainer}>
        <div className={styles.inputBox}>
          <label className={styles.inputLabel}>Мін</label>
          <input
            placeholder="250"
            className={styles.input}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onFocus={() => setServiceItemEdit(true)}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLabel}>Макс</label>
          <input
            placeholder="400"
            className={styles.input}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {isEdit ? (
        <div className={styles.tooltip}>
          <button className={styles.btnInput} onClick={handleCurrentSave}>
            <IoMdDoneAll style={{ transform: "scale(1.3)" }} />
            <span className={styles.tooltipContent}>Зберегти зміни</span>
          </button>
        </div>
      ) : (
        <button
          className={styles.btnInput}
          onClick={handlePopupToggle}
          ref={buttonRef}
        >
          <BsThreeDotsVertical className={styles.dotsIcon} />
        </button>
      )}

      {activePopupId === id && (
        <div className={styles.popupContainer}>
          <PopupMenu
            isOpen={true}
            onClose={handlePopupToggle}
            onEdit={() => handleEdit(id)}
            onDelete={handleDelete}
            buttonRef={buttonRef}
            innerAccRef={innerAccRef}
            containerRef={containerRef}
          />
        </div>
      )}
    </>
  );
}

export default ServiceItem;
