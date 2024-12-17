import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PopupMenu from "../../../../sharedComponents/PopupMenu/PopupMenu";
import styles from "./ServiceItem.module.css";

function ServiceItem({
  id,
  serviceData,
  onDelete,
  innerAccRef,
  containerRef,
  resetPrice,
  resetService,
  serviceItemEdit,
  setServiceItemEdit,
}) {
  const [serviceName, setServiceName] = useState(serviceData.item);
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

  useEffect(() => {
    if (resetPrice || resetService) {
      setMinPrice("");
      setMaxPrice("");
      setServiceName(serviceData.item);
      setServiceItemEdit(false); // Завжди скидаємо режим редагування
    }
  }, [resetPrice, resetService, serviceData.item]);

  return (
    <>
      {serviceItemEdit === id ? (
        <div className={styles.editInputBox}>
          <input
            className={styles.editInput}
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
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
            value={minPrice ?? ""}
            onChange={(e) => setMinPrice(e.target.value)}
            onFocus={() => setServiceItemEdit(true)}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLabel}>Макс</label>
          <input
            placeholder="400"
            className={styles.input}
            value={maxPrice ?? ""}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <button
        className={styles.btnInput}
        onClick={handlePopupToggle}
        ref={buttonRef}
      >
        <BsThreeDotsVertical className={styles.dotsIcon} />
      </button>

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
