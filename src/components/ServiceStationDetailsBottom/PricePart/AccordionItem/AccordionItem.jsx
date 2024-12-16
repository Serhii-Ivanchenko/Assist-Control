import { useRef, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import PopupMenu from "../../../sharedComponents/PopupMenu/PopupMenu";
import styles from "./AccordionItem.module.css";
import ServiceItem from "./ServiceItem/ServiceItem";
import Modal from "../../../Modals/Modal/Modal";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal";
// import addIdsToData from "../../../../utils/addIdsToData.js";

function AccordionItem({
  isEdit,
  category,
  items,
  index,
  onEnableEditing,
  containerRef,
  resetPrice,
  resetCategory,
  onLocalSave,
  resetService,
  onUnsavedChanges,
}) {
  const [expanded, setExpanded] = useState(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(() => {
    const savedCategory = localStorage.getItem(`category-${index}`);
    return savedCategory ? savedCategory : category;
  });
  const [currentServices, setCurrentServices] = useState(() => {
    const savedServices = localStorage.getItem(`services-${index}`);
    return savedServices ? JSON.parse(savedServices) : items;
  });
  const [unsavedServices, setUnsavedServices] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonRef = useRef(null);
  const innerAccRef = useRef(null);

  const handleChange = () => {
    if (!isEdit) {
      setExpanded((prev) => !prev);
    }
  };

  const handleCategoryPopupToggle = (e) => {
    e.stopPropagation();
    setIsCategoryPopupOpen((prev) => !prev);
  };

  const handleCategoryPopupClose = () => {
    setIsCategoryPopupOpen(false);
  };

  //ввімкнення редагування назви категорії
  const handleCategoryEdit = (e) => {
    e.stopPropagation();
    onEnableEditing();
    setIsCategoryPopupOpen(false);
  };

  //оновлення назви категорії
  const handleCategoryChange = (newName) => {
    setCurrentCategory(newName);
    // Save to localStorage
    localStorage.setItem(`category-${index}`, newName);
  };

  // відкриття модалки для додавання нової послуги
  const handleAddService = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
    setIsCategoryPopupOpen(false);
  };

  // додавання нової послуги в список
  const handleNewService = (serviceName) => {
    setIsCategoryPopupOpen(false);
    const newService = { id: Date.now(), item: serviceName, isSaved: false };

    const updatedServices = [...currentServices, newService];
    setCurrentServices(updatedServices);
    setUnsavedServices((prev) => ({ ...prev, [newService.id]: true }));

    localStorage.setItem(`services-${index}`, JSON.stringify(updatedServices));

    setIsModalOpen(false);
  };

  // оновлення послуги в списку
  const handleServiceUpdate = ({ id, updatedService }) => {
    const updatedServices = currentServices.map((service) =>
      service.id === id ? updatedService : service
    );
    setCurrentServices(updatedServices);

    // Save to localStorage
    localStorage.setItem(`services-${index}`, JSON.stringify(updatedServices));
  };

  // видалення послуги зі списку
  const handleDeleteItem = (id) => {
    const updatedServices = currentServices.filter(
      (service) => service.id !== id
    );
    setCurrentServices(updatedServices);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (category !== currentCategory || items !== currentServices) {
      setCurrentCategory(category);
      setCurrentServices(items);
    }
  }, [resetCategory, resetService, category, items]);

  useEffect(() => {
    // Update localStorage whenever currentServices changes
    localStorage.setItem(`services-${index}`, JSON.stringify(currentServices));
  }, [currentServices, index]);

  useEffect(() => {
    const hasUnsaved = Object.values(unsavedServices).some((value) => value);
    onUnsavedChanges(hasUnsaved);
  }, [unsavedServices, onUnsavedChanges]);

  // Прокрутка до ост. елементу при додаванні
  const prevDataLengthRef = useRef(currentServices.length); // Зберігаємо попередню довжину даних

  useEffect(() => {
    if (
      currentServices.length > prevDataLengthRef.current && // Перевіряємо, чи додано новий елемент
      innerAccRef.current
    ) {
      innerAccRef.current.scrollTo({
        top: innerAccRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    // Оновлюємо попередню довжину після виконання ефекту
    prevDataLengthRef.current = currentServices.length;
  }, [currentServices]);

  return (
    <div className={styles.wrapper}>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        disableGutters={true}
        sx={{
          background: "none",
          color: "var(--white)",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          sx={{ background: "#2D3138" }}
          className={styles.accordionTitle}
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
        >
          <div className={styles.titleContent}>
            {isEdit ? (
              <input
                type="text"
                value={currentCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                autoFocus
                className={styles.editInput}
              />
            ) : (
              <p>{currentCategory}</p>
            )}
            {expanded ? (
              <TiArrowSortedUp className={styles.icon} />
            ) : (
              <TiArrowSortedDown className={styles.icon} />
            )}
            <div
              ref={buttonRef}
              className={styles.btn}
              onClick={handleCategoryPopupToggle}
            >
              <BsThreeDotsVertical className={styles.dotsIcon} />
              <div className={styles.popupContainer}>
                <PopupMenu
                  isOpen={isCategoryPopupOpen}
                  onClose={handleCategoryPopupClose}
                  onEdit={handleCategoryEdit}
                  onAdd={handleAddService}
                  buttonRef={buttonRef}
                  containerRef={containerRef}
                  innerAccRef={innerAccRef}
                />
                {isModalOpen && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Modal
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      shouldCloseOnOverlayClick={false}
                    >
                      <AddCategoryModal
                        onClose={closeModal}
                        title="Введіть назву послуги"
                        name="newService"
                        addNewCategory={handleNewService}
                      />
                    </Modal>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0 12px 0 12px" }}>
          <ul className={styles.accordionDesc} ref={innerAccRef}>
            {currentServices.map((service) => (
              <li key={service.id}>
                <ServiceItem
                  id={service.id}
                  isEdit={isEdit} // ?
                  serviceData={service}
                  unsavedServices={unsavedServices}
                  onUpdate={handleServiceUpdate} // ?
                  onDelete={() => handleDeleteItem(service.id)}
                  innerAccRef={innerAccRef}
                  containerRef={containerRef}
                  resetPrice={resetPrice}
                  onLocalSave={onLocalSave}
                  resetService={resetService}
                  onUnsavedChanges={onUnsavedChanges}
                />
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordionItem;
