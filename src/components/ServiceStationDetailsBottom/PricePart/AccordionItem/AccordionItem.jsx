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
import addIdsToData from "../../../../utils/addIdsToData.js";

function AccordionItem({
  isEdit,
  category,
  items,
  index,
  onUpdate,
  onEnableEditing,
  containerRef,
  resetPrice,
  resetCategory,
  resetService,
  serviceItemEdit,
  setServiceItemEdit,
}) {
  const [expanded, setExpanded] = useState(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(category);
  const [currentServices, setCurrentServices] = useState(items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const inputRef = useRef(null);
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

  const handleCategoryEdit = (e) => {
    e.stopPropagation();
    onEnableEditing();
    setIsCategoryPopupOpen(false);
  };

  const handleCategoryChange = (newName) => {
    setCurrentCategory(newName);
    onUpdate({ category: newName, items: currentServices });
  };

  const handleAddService = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
    setIsCategoryPopupOpen(false);
  };

  const handleNewService = (serviceName) => {
    setIsCategoryPopupOpen(false);
    const newService = { item: serviceName };

    const updatedCategory = {
      ...currentCategory,
      items: [...currentCategory.items, newService],
    };

    const updatedServices = addIdsToData([updatedCategory]);
    setCurrentServices(updatedServices);
    onUpdate({
      category: updatedCategory,
      items: updatedCategory.items,
    });

    setIsModalOpen(false);
  };

  const handleServiceUpdate = (updatedService) => {
    const updatedServices = currentServices.map((service) =>
      service.id === updatedService.id ? updatedService : service
    );
    setCurrentServices(updatedServices);
    onUpdate({
      category: currentCategory,
      items: updatedServices,
    });
  };

  const handleDeleteItem = (idx) => {
    const updatedServices = currentServices.filter((_, index) => index !== idx);
    setCurrentServices(updatedServices);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (category !== currentCategory || items !== currentServices) {
      setCurrentCategory(category);
      setCurrentServices(items);
      onUpdate({
        category: category,
        items: items,
      });
    }
  }, [
    resetCategory,
    resetService,
    category,
    items,
    currentCategory,
    currentServices,
    onUpdate,
  ]);

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
            <button
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
            </button>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0 12px 0 12px" }}>
          <ul className={styles.accordionDesc} ref={innerAccRef}>
            {currentServices.map((service, id, idx) => (
              <li key={`${id}-${resetService}`}>
                <ServiceItem
                  id={service.id}
                  serviceData={service}
                  onUpdate={handleServiceUpdate}
                  onDelete={() => handleDeleteItem(idx)}
                  innerAccRef={innerAccRef}
                  containerRef={containerRef}
                  resetPrice={resetPrice}
                  resetService={resetService}
                  serviceItemEdit={serviceItemEdit}
                  setServiceItemEdit={setServiceItemEdit}
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
