import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PopupMenu from "../../../../sharedComponents/PopupMenu/PopupMenu";
import styles from "./ServiceItem.module.css";
import { useDispatch } from "react-redux";
import { deleteService } from "../../../../../redux/settings/operations";
import { setEditedService } from "../../../../../redux/settings/slice";

function ServiceItem({
  serviceData,
  innerAccRef,
  containerRef,
  isLast,
  onServiceEditing,
  editingServiceId,
}) {
  const dispatch = useDispatch();
  // const [isEdit, setIsEdit] = useState(false);
  const [activePopupId, setActivePopupId] = useState(null);
  const [updatedService, setUpdatedService] = useState({
    service_id: serviceData.service_id,
    service_name: serviceData.service_name,
    min_price: serviceData.min_price,
    max_price: serviceData.max_price,
  });

  const [isExpanded, setIsExpanded] = useState(false); // Додаємо стейт для зміни висоти

  const inputRef = useRef();
  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    setUpdatedService((prev) => {
      if (prev.service_id !== serviceData.service_id) {
        return serviceData;
      }
      return prev;
    });
  }, [serviceData]);

  const handlePopupToggle = () => {
    setActivePopupId((prev) =>
      prev === serviceData.service_id ? null : serviceData.service_id
    );

    // Якщо це останній елемент, то збільшуємо висоту
    if (isLast) {
      setIsExpanded((prev) => !prev);
    }
  };

  const handleEdit = () => {
    onServiceEditing(serviceData.service_id);
    setUpdatedService(serviceData);
    setActivePopupId(null);
  };

  useEffect(() => {
    if (updatedService.service_id !== serviceData.service_id) {
      dispatch(setEditedService(updatedService));
    }
  }, [updatedService, dispatch]);

  const handleDelete = () => {
    dispatch(deleteService(serviceData.service_id));
  };

  const handleChange = (e) => {
    const newValue = {
      ...updatedService,
      [e.target.name]: e.target.value,
    };
    setUpdatedService(newValue);
    dispatch(setEditedService(newValue));
  };

  return (
    <div className={`${styles.serviceItem} ${isExpanded && styles.expanded}`}>
      {serviceData.service_id === editingServiceId ? (
        <div className={styles.editInputBox}>
          <input
            className={styles.editInput}
            type="text"
            name="service_name"
            value={updatedService.service_name}
            ref={inputRef}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className={styles.inputBox}>
          <p className={styles.text}>{updatedService.service_name}</p>
        </div>
      )}

      <div className={styles.inputsContainer}>
        <div className={styles.inputBox}>
          <label className={styles.inputLabel}>Мін</label>
          <input
            type="number"
            name="min_price"
            placeholder="250"
            className={styles.input}
            value={updatedService.min_price}
            onChange={handleChange}
            disabled={!editingServiceId}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLabel}>Макс</label>
          <input
            type="number"
            name="max_price"
            placeholder="400"
            className={styles.input}
            value={updatedService.max_price}
            onChange={handleChange}
            disabled={!editingServiceId}
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

      {activePopupId === serviceData.service_id && (
        <div className={styles.popupContainer} ref={popupRef}>
          <PopupMenu
            isOpen={activePopupId}
            onClose={() => setActivePopupId(null)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            buttonRef={buttonRef}
            innerAccRef={innerAccRef}
            containerRef={containerRef}
          />
        </div>
      )}
    </div>
  );
}

export default ServiceItem;
