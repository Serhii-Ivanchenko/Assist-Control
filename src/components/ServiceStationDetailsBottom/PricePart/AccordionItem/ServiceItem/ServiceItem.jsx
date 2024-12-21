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
  onUpdate,
}) {
  const [serviceName, setServiceName] = useState(serviceData.item);
  const [activePopupId, setActivePopupId] = useState(null);
  const [minPrice, setMinPrice] = useState(serviceData.price?.min || "");
  const [maxPrice, setMaxPrice] = useState(serviceData.price?.max || "");
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

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      setMaxPrice(value);
    }
  };

  useEffect(() => {
    const updatedService = {
      id: id,
      item: serviceName,
      price: { min: minPrice, max: maxPrice },
    };
    onUpdate(updatedService);
  }, [id, serviceName, minPrice, maxPrice]);

  useEffect(() => {
    if (resetPrice || resetService) {
      setMinPrice(serviceData.price?.min || "");
      setMaxPrice(serviceData.price?.max || "");
      setServiceName(serviceData.item);
      setServiceItemEdit(false);
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
            type="number"
            placeholder="250"
            className={styles.input}
            value={minPrice}
            onChange={handleMinPriceChange}
            onFocus={() => setServiceItemEdit(true)}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLabel}>Макс</label>
          <input
            type="number"
            placeholder="400"
            className={styles.input}
            value={maxPrice}
            onChange={handleMaxPriceChange}
            onFocus={() => setServiceItemEdit(true)}
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
